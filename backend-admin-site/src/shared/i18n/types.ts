export type RuntimeTranslationValue =
  | string
  | number
  | boolean
  | null
  | RuntimeTranslationDictionary
  | RuntimeTranslationValue[];

export type RuntimeTranslationDictionary = {
  [key: string]: RuntimeTranslationValue;
};
