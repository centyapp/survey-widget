/* eslint-disable @typescript-eslint/no-explicit-any */
export interface RatingFieldMetadata {
  ratingType: "star" | "number" | "emoji";
  minDesc?: string;
  maxDesc?: string;
}

export interface TextFieldMetadata {
  placeholder?: string;
  maxLength?: number;
}

export type SurveyFieldType = "rating" | "text";

export interface SurveyField<M = Record<string, any>> {
  name: string;
  label: string;
  onSubmit?: () => void;
  type: SurveyFieldType;
  metadata: M;
}

export interface SurveyDto<M = Record<string, any>> {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  fields: SurveyField[];
  metadata: M;
}
