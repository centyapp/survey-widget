import Button from "@/button";
import { surveyService, type RatingQuestionMetadata } from "@repo/core";
import { useState } from "react";
import styles from "./index.module.css";

type Props = RatingQuestionMetadata & {
  questionId: string;
  onNext: VoidFunction;
};

export default function RatingQuestion({
  minDesc,
  maxDesc,
  ratingType,
  questionId,
  onNext,
}: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const onChange = async (value: number) => {
    setSelected(value);
    await surveyService.response(questionId, value);
    onNext();
  };

  return (
    <div className={styles.container}>
      <div className={styles.ratingContainer}>
        {(() => {
          switch (ratingType) {
            case "star":
              return [1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  className={`${styles.starButton} ${styles.starButtonHover}`}
                  onClick={() => onChange(rating)}
                >
                  <svg
                    aria-hidden="true"
                    className={`${styles.star} ${
                      rating <= (selected || 0)
                        ? styles.starSelected
                        : styles.starDefault
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                  </svg>
                </button>
              ));

            case "number":
              return [1, 2, 3, 4, 5].map((rating) => (
                <Button
                  key={rating}
                  variant={selected === rating ? "default" : "secondary"}
                  className={`${styles.numberButton} ${
                    selected === rating ? styles.numberButtonSelected : ""
                  }`}
                  size="sm"
                  onClick={() => onChange(rating)}
                >
                  {rating}
                </Button>
              ));

            case "emoji":
              return ["😡", "😞", "😐", "😊", "🥳"].map((emoji, index) => (
                <button
                  key={index}
                  className={`${styles.emojiButton} ${
                    selected === index ? styles.emojiButtonSelected : ""
                  } ${styles.emojiButtonHover}`}
                  onClick={() => onChange(index)}
                >
                  {emoji}
                </button>
              ));

            default:
              console.warn("Unknown rating type:", ratingType);
              return <div>-</div>;
          }
        })()}
      </div>

      {minDesc && maxDesc && (
        <div className={styles.description}>
          <span>{minDesc}</span>
          <span>{maxDesc}</span>
        </div>
      )}
    </div>
  );
}
