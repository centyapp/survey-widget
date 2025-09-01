import SurveyField from "@/survey-field";
import { surveyService, type SurveyDto } from "@repo/core";
import { useEffect, useRef } from "react";
import styles from "./survey.module.css";

export default function Survey({ survey }: { survey: SurveyDto }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element) return;

    // Force initial state (hidden)
    element.classList.remove(styles.visible);

    // Use requestAnimationFrame to ensure the DOM has updated
    // before applying the visible class
    const animationId = requestAnimationFrame(() => {
      element.classList.add(styles.visible);
    });

    // Cleanup function to cancel the animation frame if component unmounts
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleClose = () => {
    const element = wrapperRef.current;
    if (!element) {
      surveyService.dismiss();
      return;
    }

    // Remove visible class to trigger slide-out animation
    element.classList.remove(styles.visible);

    // Wait for animation to complete before dismissing
    // Adjust timeout to match your CSS transition duration
    surveyService.dismiss();
  };

  return (
    <div ref={wrapperRef} className={styles.surveyWrapper}>
      <div className={`${styles.surveyCard} ${styles.card}`}>
        {survey.fields.map((field) => (
          <SurveyField
            onSubmit={handleClose}
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            metadata={field.metadata}
          />
        ))}
      </div>
    </div>
  );
}
