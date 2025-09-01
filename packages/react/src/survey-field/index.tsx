import RatingField from "@/survey-field/rating-field";
import styles from "./survey-field.module.css";
import { type RatingFieldMetadata, type SurveyField } from "@repo/core";

export default function SurveyField({
  label,
  name,
  type,
  metadata,
  onSubmit,
}: SurveyField) {
  // TODO: Add more field types and metadata handling

  return (
    <div key={name} className={styles.fieldContainer}>
      <h2 className={styles.fieldLabel}>{label}</h2>
      {(() => {
        switch (type) {
          case "rating":
            return (
              <RatingField
                onSubmit={onSubmit}
                {...(metadata as RatingFieldMetadata)}
              />
            );
          case "text":
            return <div>text</div>;
          default:
            return <div>Unknown field type</div>;
        }
      })()}
    </div>
  );
}
