import type { RatingFieldMetadata, SurveyField } from "@repo/core";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import RatingField from "./rating-field";

export default function SurveyWidget({ clientId }: { clientId: string }) {
  if (!clientId) throw new Error("clientId is required");

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div className={`${styles.surveyWrapper} ${isVisible && styles.visible}`}>
      <Survey
        onSubmit={handleClose}
        fields={[
          {
            name: "number",
            label: "How satisfied are you with our service?",
            type: "rating",
            metadata: {
              ratingType: "number",
            },
          },
          {
            name: "emoji",
            label: "How likely are you to recommend our product?",
            type: "rating",
            metadata: {
              ratingType: "emoji",
            },
          },
          {
            name: "star",
            label: "How likely are you to recommend our product?",
            type: "rating",
            metadata: {
              ratingType: "star",
              maxDesc: "Extremely likely",
            },
          },
        ]}
      />
    </div>
  );
}

export function Survey({
  fields,
  onSubmit,
}: {
  fields: SurveyField[];
  onSubmit?: () => void;
}) {
  return (
    <div className={`${styles.surveyCard} ${styles.card}`}>
      {fields.map((field) => (
        <Survey.Field
          onSubmit={onSubmit}
          key={field.name}
          label={field.label}
          name={field.name}
          type={field.type}
          metadata={field.metadata}
        />
      ))}
    </div>
  );
}

Survey.Field = function SurveyField({
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
};
