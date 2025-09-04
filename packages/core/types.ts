/* eslint-disable @typescript-eslint/no-explicit-any */
export interface RatingQuestionMetadata {
  ratingType: "star" | "number" | "emoji";
  minDesc?: string;
  maxDesc?: string;
}

export interface TextQuestionMetadata {
  placeholder?: string;
  maxLength?: number;
}

export interface SurveyQuestion<M = Record<string, any>> {
  name: string;
  label: string;
  type: "rating" | "text";
  metadata: M;
}

export interface SurveyDto<M = Record<string, any>> {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  questions: SurveyQuestion[];
  metadata?: M;
}
