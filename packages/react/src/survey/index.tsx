import SurveyField from "@/survey-field";
import { surveyService, type SurveyDto } from "@repo/core";
import { useEffect, useRef } from "react";
import styles from "./survey.module.css";

/**
 * Renders the survey UI and handles survey field rendering and animation.
 *
 * **Note:** This component is intended for internal use only.
 * Consumer applications should not use this component directly.
 * Instead, use the `SurveyWidget` component for survey integration.
 *
 * @param {SurveyDto} survey The survey data to render.
 *
 * @returns The rendered survey component.
 */
export default function Survey({ survey }: { survey: SurveyDto }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element) return;

    element.classList.remove(styles.visible);

    const animationId = requestAnimationFrame(() => {
      element.classList.add(styles.visible);
    });

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleClose = () => {
    const element = wrapperRef.current;
    if (!element) return;

    element.classList.remove(styles.visible);

    surveyService.response("survey-id");
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
