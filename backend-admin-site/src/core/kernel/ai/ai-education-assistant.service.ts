import {
  type AiEducationInsight,
  type AiEducationLearnerLevel,
  type AiEducationNormalizedTopic,
  type AiEducationPlanActivityType,
  type AiEducationPlanDay,
  type AiEducationPracticeTask,
  type AiEducationQuizQuestion,
  type AiEducationRequest,
  type AiEducationResponse,
  type AiEducationTaskType,
  type AiEducationTopicInput,
} from "./ai.types"

function createId(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function normalizeText(value: string) {
  return value.trim().replace(/\s+/g, " ")
}

function normalizeTopic(topic: AiEducationTopicInput): AiEducationNormalizedTopic {
  if (typeof topic === "string") {
    return {
      title: normalizeText(topic),
      difficulty: 3,
      tags: [],
    }
  }

  return {
    title: normalizeText(topic.title),
    difficulty: clamp(topic.difficulty ?? 3, 1, 5),
    tags: Array.from(new Set((topic.tags ?? []).map((tag) => normalizeText(tag).toLowerCase()).filter(Boolean))),
  }
}

function getAudienceLabel(level: AiEducationLearnerLevel) {
  switch (level) {
    case "child":
      return "younger learner"
    case "school":
      return "school learner"
    case "abiturient":
      return "exam applicant"
    case "student":
      return "university student"
    case "teacher":
      return "teacher"
    default:
      return "learner"
  }
}

function getDefaultDailyMinutes(level: AiEducationLearnerLevel) {
  switch (level) {
    case "child":
      return 25
    case "school":
      return 45
    case "abiturient":
      return 75
    case "student":
      return 90
    case "teacher":
      return 60
    default:
      return 45
  }
}

function rotate<T>(items: T[], index: number): T {
  return items[index % items.length]
}

export class AiEducationAssistantService {
  assist(request: AiEducationRequest): AiEducationResponse {
    if (!request.userId?.trim()) {
      throw new Error("AI education assistant requires userId")
    }

    const subject = normalizeText(request.subject)
    if (!subject) {
      throw new Error("AI education assistant requires a subject")
    }

    const normalizedTopics = request.topics.map(normalizeTopic).filter((topic) => topic.title.length > 0)
    if (normalizedTopics.length === 0) {
      throw new Error("AI education assistant requires at least one study topic")
    }

    const weakTopics = Array.from(new Set((request.weakTopics ?? []).map(normalizeText).filter(Boolean)))
    const timeframeDays = clamp(request.timeframeDays ?? this.deriveTimeframeDays(request.taskType, normalizedTopics.length), 1, 21)
    const dailyMinutes = this.deriveDailyMinutes(request)

    const planDays = this.buildPlanDays({
      subject,
      taskType: request.taskType,
      topics: normalizedTopics,
      weakTopics,
      timeframeDays,
      dailyMinutes,
    })

    const practiceTasks = this.buildPracticeTasks(subject, request.taskType, normalizedTopics, weakTopics)
    const quizQuestions = this.buildQuizQuestions(subject, normalizedTopics, request.learnerLevel)
    const insights = this.buildInsights({
      learnerLevel: request.learnerLevel,
      taskType: request.taskType,
      weakTopics,
      timeframeDays,
      examDate: request.examDate,
      dailyMinutes,
      topicCount: normalizedTopics.length,
    })
    const recommendedActions = this.buildRecommendedActions({
      taskType: request.taskType,
      weakTopics,
      timeframeDays,
      dailyMinutes,
      goal: request.goal,
      preferredLanguage: request.preferredLanguage,
    })
    const narrative = this.buildNarrative({
      subject,
      learnerLevel: request.learnerLevel,
      taskType: request.taskType,
      topicCount: normalizedTopics.length,
      weakTopics,
      timeframeDays,
      dailyMinutes,
      goal: request.goal,
    })

    return {
      subject,
      learnerLevel: request.learnerLevel,
      taskType: request.taskType,
      preferredLanguage: request.preferredLanguage,
      topicCount: normalizedTopics.length,
      normalizedTopics,
      planDays,
      practiceTasks,
      quizQuestions,
      insights,
      recommendedActions,
      narrative,
    }
  }

  private deriveTimeframeDays(taskType: AiEducationTaskType, topicCount: number) {
    switch (taskType) {
      case "quiz":
        return Math.max(3, Math.min(7, topicCount))
      case "exam_prep":
        return Math.max(7, Math.min(21, topicCount * 2))
      case "lesson_plan":
        return 5
      case "homework_help":
        return 3
      case "explain":
        return 4
      case "study_plan":
      default:
        return Math.max(5, Math.min(14, topicCount + 2))
    }
  }

  private deriveDailyMinutes(request: AiEducationRequest) {
    if (typeof request.weeklyHours === "number" && Number.isFinite(request.weeklyHours) && request.weeklyHours > 0) {
      const perDay = Math.round((request.weeklyHours * 60) / 7)
      return clamp(perDay, 20, 180)
    }

    return getDefaultDailyMinutes(request.learnerLevel)
  }

  private buildPlanDays(input: {
    subject: string
    taskType: AiEducationTaskType
    topics: AiEducationNormalizedTopic[]
    weakTopics: string[]
    timeframeDays: number
    dailyMinutes: number
  }): AiEducationPlanDay[] {
    const primaryTopics = input.topics.slice().sort((a, b) => {
      const aWeak = input.weakTopics.includes(a.title) ? 1 : 0
      const bWeak = input.weakTopics.includes(b.title) ? 1 : 0
      if (aWeak !== bWeak) {
        return bWeak - aWeak
      }
      return b.difficulty - a.difficulty
    })

    const activities = this.resolveActivityPattern(input.taskType)
    const days: AiEducationPlanDay[] = []

    for (let index = 0; index < input.timeframeDays; index += 1) {
      const focusTopic = rotate(primaryTopics, index)
      const secondaryTopic = primaryTopics.length > 1 ? rotate(primaryTopics, index + 1) : null
      const dayActivities = activities.map((activity) => this.describeActivity(activity, input.subject, focusTopic.title, secondaryTopic?.title))
      days.push({
        dayIndex: index + 1,
        title: `Day ${index + 1}: ${focusTopic.title}`,
        focusTopics: secondaryTopic ? [focusTopic.title, secondaryTopic.title] : [focusTopic.title],
        estimatedMinutes: input.dailyMinutes,
        activities: dayActivities,
        checkpoint: this.buildCheckpoint(input.taskType, focusTopic.title),
      })
    }

    return days
  }

  private resolveActivityPattern(taskType: AiEducationTaskType): AiEducationPlanActivityType[] {
    switch (taskType) {
      case "quiz":
        return ["reading", "quiz", "revision"]
      case "exam_prep":
        return ["reading", "practice", "quiz", "revision"]
      case "lesson_plan":
        return ["reading", "project", "revision"]
      case "homework_help":
        return ["reading", "practice", "revision"]
      case "explain":
        return ["reading", "revision"]
      case "study_plan":
      default:
        return ["reading", "practice", "revision"]
    }
  }

  private describeActivity(
    type: AiEducationPlanActivityType,
    subject: string,
    focusTopic: string,
    secondaryTopic?: string,
  ) {
    switch (type) {
      case "reading":
        return `Review the core explanation for ${focusTopic} in ${subject}${secondaryTopic ? ` and connect it with ${secondaryTopic}` : ""}.`
      case "practice":
        return `Solve guided practice items on ${focusTopic}${secondaryTopic ? ` and a comparison task with ${secondaryTopic}` : ""}.`
      case "revision":
        return `Summarize ${focusTopic} in your own words and record three key mistakes to avoid next time.`
      case "quiz":
        return `Complete a short timed quiz on ${focusTopic} and check each answer with a short explanation.`
      case "project":
        return `Prepare a mini lesson or presentation about ${focusTopic}${secondaryTopic ? ` using ${secondaryTopic} as a supporting example` : ""}.`
      default:
        return `Work on ${focusTopic}.`
    }
  }

  private buildCheckpoint(taskType: AiEducationTaskType, focusTopic: string) {
    switch (taskType) {
      case "quiz":
        return `You should be able to answer a short quiz on ${focusTopic} without notes.`
      case "lesson_plan":
        return `You should be able to explain ${focusTopic} clearly to another person.`
      case "exam_prep":
        return `You should be able to solve an exam-style problem on ${focusTopic} under time pressure.`
      case "homework_help":
        return `You should be able to finish one homework-style task on ${focusTopic} independently.`
      case "explain":
        return `You should be able to explain ${focusTopic} in simple words from memory.`
      case "study_plan":
      default:
        return `You should be able to recall the main ideas of ${focusTopic} and complete one practice task.`
    }
  }

  private buildPracticeTasks(
    subject: string,
    taskType: AiEducationTaskType,
    topics: AiEducationNormalizedTopic[],
    weakTopics: string[],
  ): AiEducationPracticeTask[] {
    return topics.slice(0, 5).map((topic, index) => {
      const weak = weakTopics.includes(topic.title)
      return {
        id: createId("ai_education_task"),
        type: taskType === "lesson_plan" ? "project" : weak ? "practice" : "revision",
        title: `${topic.title} ${weak ? "rebuild" : "practice"} task`,
        description:
          taskType === "lesson_plan"
            ? `Create a short teaching outline for ${topic.title} in ${subject} with examples and one checkpoint question.`
            : weak
              ? `Rework ${topic.title} step by step, solve one easier example first, then one standard difficulty example.`
              : `Review ${topic.title}, then answer one open-ended question and one short problem from ${subject}.`,
        estimatedMinutes: clamp(20 + topic.difficulty * 5 + (weak ? 10 : 0), 20, 60),
      }
    })
  }

  private buildQuizQuestions(
    subject: string,
    topics: AiEducationNormalizedTopic[],
    learnerLevel: AiEducationLearnerLevel,
  ): AiEducationQuizQuestion[] {
    return topics.slice(0, 5).map((topic) => {
      const options = [
        `Definition or rule of ${topic.title}`,
        `Unrelated fact from another unit`,
        `Example that partly fits`,
        `Common mistake about ${topic.title}`,
      ]
      return {
        id: createId("ai_education_quiz"),
        question: `Which option best matches the main idea of ${topic.title} in ${subject}?`,
        options,
        answer: options[0],
        explanation: `${getAudienceLabel(learnerLevel)} mode: start by naming the correct rule or concept, then contrast it with the common mistake.`,
      }
    })
  }

  private buildInsights(input: {
    learnerLevel: AiEducationLearnerLevel
    taskType: AiEducationTaskType
    weakTopics: string[]
    timeframeDays: number
    examDate?: string
    dailyMinutes: number
    topicCount: number
  }): AiEducationInsight[] {
    const insights: AiEducationInsight[] = []

    if (input.weakTopics.length >= 2) {
      insights.push({
        severity: "medium",
        code: "multiple_weak_topics",
        title: "Several weak topics need focused recovery",
        description: "Group the weak topics into dedicated recovery sessions before moving to timed practice.",
      })
    }

    if (input.taskType === "exam_prep" && input.timeframeDays <= 5) {
      insights.push({
        severity: "high",
        code: "compressed_exam_window",
        title: "Exam preparation window is too compressed",
        description: "Prioritize the most frequent or highest-scoring topics and reduce passive reading time.",
      })
    }

    if (input.dailyMinutes < 30 && input.topicCount > 4) {
      insights.push({
        severity: "medium",
        code: "low_daily_load",
        title: "Daily study load may be too small",
        description: "Increase active practice or reduce the number of simultaneous topics.",
      })
    }

    if (input.learnerLevel === "teacher" && input.taskType === "lesson_plan") {
      insights.push({
        severity: "low",
        code: "teacher_delivery_mode",
        title: "Teacher mode activated",
        description: "Use checkpoints and example progression from simple to complex while preparing the lesson.",
      })
    }

    if (input.examDate) {
      insights.push({
        severity: "low",
        code: "exam_deadline_present",
        title: "Exam date provided",
        description: `Use the exam date ${input.examDate} to schedule revision, recall, and timed practice blocks.`,
      })
    }

    return insights
  }

  private buildRecommendedActions(input: {
    taskType: AiEducationTaskType
    weakTopics: string[]
    timeframeDays: number
    dailyMinutes: number
    goal?: string
    preferredLanguage?: string
  }) {
    const actions = [
      "Keep each study block focused on one main topic and one short checkpoint.",
      "Use active recall before re-reading notes.",
    ]

    if (input.weakTopics.length > 0) {
      actions.push(`Start with the weakest topic: ${input.weakTopics[0]}.`)
    }

    if (input.taskType === "exam_prep") {
      actions.push("Reserve the last study block for timed exam-style practice.")
    }

    if (input.taskType === "lesson_plan") {
      actions.push("Add one demonstration example and one checkpoint question to each lesson segment.")
    }

    if (input.timeframeDays >= 10) {
      actions.push("Insert a full revision day after every 3–4 focused study days.")
    }

    if (input.dailyMinutes >= 90) {
      actions.push("Split long study time into two blocks with a short break between them.")
    }

    if (input.goal) {
      actions.push(`Keep the goal visible in each session: ${input.goal}.`)
    }

    if (input.preferredLanguage) {
      actions.push(`Use ${input.preferredLanguage} as the main explanation language for consistency.`)
    }

    return actions
  }

  private buildNarrative(input: {
    subject: string
    learnerLevel: AiEducationLearnerLevel
    taskType: AiEducationTaskType
    topicCount: number
    weakTopics: string[]
    timeframeDays: number
    dailyMinutes: number
    goal?: string
  }) {
    const audience = getAudienceLabel(input.learnerLevel)
    return `${input.subject} support prepared for a ${audience}. The plan covers ${input.topicCount} topic(s) over ${input.timeframeDays} day(s) with about ${input.dailyMinutes} minute(s) per day. ${
      input.weakTopics.length > 0
        ? `Weak topics are prioritized first: ${input.weakTopics.join(", ")}. `
        : ""
    }${
      input.goal ? `Primary goal: ${input.goal}. ` : ""
    }Task mode: ${input.taskType.replace(/_/g, " ")}.`
  }
}
