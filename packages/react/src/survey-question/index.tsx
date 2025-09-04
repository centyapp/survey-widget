import RatingQuestion from "@/survey-question/rating-question";
import {
  type RatingQuestionMetadata,
  type SurveyQuestion,
  type TextQuestionMetadata,
} from "@repo/core";
import styles from "./index.module.css";
import TextQuestion from "./text-question";

export default function SurveyQuestion({
  label,
  name,
  type,
  metadata,
  onNext,
}: SurveyQuestion & {
  onNext: VoidFunction;
}) {
  // TODO: Add more field types and metadata handling

  return (
    <div key={name} className={styles.fieldContainer}>
      <h2 className={styles.fieldLabel}>{label}</h2>
      {(() => {
        switch (type) {
          case "rating":
            return (
              <RatingQuestion
                {...(metadata as RatingQuestionMetadata)}
                questionId={name}
                onNext={onNext}
              />
            );
          case "text":
            return (
              <TextQuestion
                {...(metadata as TextQuestionMetadata)}
                questionId={name}
                onNext={onNext}
              />
            );
          default:
            return <div>Unknown field type</div>;
        }
      })()}
    </div>
  );
}
