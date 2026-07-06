import type { SabiCallMediaState, SabiCallParticipant, SabiCallParticipantRole, SabiCallParticipantStatus, SabiUserId } from "../contracts";
import { canTransitionSabiCallParticipant } from "./sabi-call-state-machine";
import { SabiCallPolicyError } from "./sabi-call-errors";
function iso(date: Date): string { return date.toISOString(); }
export function defaultSabiCallMediaState(now: Date, videoEnabled = false): SabiCallMediaState {
  return { audioEnabled: true, videoEnabled, speakerEnabled: videoEnabled, screenShareEnabled: false, cameraFacing: "front", updatedAt: iso(now) };
}
export class SabiCallParticipantEntity {
  private props: SabiCallParticipant;
  constructor(props: SabiCallParticipant) { this.props = { ...props, media: { ...props.media } }; }
  static create(params: { id: string; callId: string; userId: SabiUserId; role: SabiCallParticipantRole; status: SabiCallParticipantStatus; now: Date; videoEnabled?: boolean }): SabiCallParticipantEntity {
    const createdAt = iso(params.now);
    return new SabiCallParticipantEntity({ id: params.id, callId: params.callId, userId: params.userId, role: params.role, status: params.status, media: defaultSabiCallMediaState(params.now, params.videoEnabled), joinedAt: params.status === "joined" ? createdAt : null, leftAt: null, createdAt, updatedAt: createdAt });
  }
  get userId(): SabiUserId { return this.props.userId; }
  get status(): SabiCallParticipantStatus { return this.props.status; }
  transition(to: SabiCallParticipantStatus, now: Date): void {
    if (!canTransitionSabiCallParticipant(this.props.status, to)) throw new SabiCallPolicyError("sabi_call_participant_invalid_state");
    this.props.status = to;
    this.props.updatedAt = iso(now);
    if (to === "joined" && !this.props.joinedAt) this.props.joinedAt = iso(now);
    if ((to === "left" || to === "declined" || to === "missed" || to === "removed" || to === "failed") && !this.props.leftAt) this.props.leftAt = iso(now);
  }
  updateMedia(params: Partial<Omit<SabiCallMediaState, "updatedAt">> & { now: Date }): void {
    this.props.media = {
      audioEnabled: params.audioEnabled ?? this.props.media.audioEnabled,
      videoEnabled: params.videoEnabled ?? this.props.media.videoEnabled,
      speakerEnabled: params.speakerEnabled ?? this.props.media.speakerEnabled,
      screenShareEnabled: params.screenShareEnabled ?? this.props.media.screenShareEnabled,
      cameraFacing: params.cameraFacing ?? this.props.media.cameraFacing,
      updatedAt: iso(params.now),
    };
    this.props.updatedAt = iso(params.now);
  }
  toDto(): SabiCallParticipant { return { ...this.props, media: { ...this.props.media } }; }
}
