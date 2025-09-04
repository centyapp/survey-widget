import SurveyQuestion from "@/survey-question";
import { surveyService, type SurveyDto } from "@repo/core";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./index.module.css";

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
export function Survey({
  survey,
  onClose,
}: {
  survey: SurveyDto;
  onClose?: VoidFunction;
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = survey.questions[currentQuestionIndex];

  const onNext = useCallback(() => {
    const isEnd = currentQuestionIndex + 1 === survey.questions.length;

    if (isEnd) {
      onClose?.();
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  }, [currentQuestionIndex, survey.questions.length, onClose]);

  if (!currentQuestion) {
    console.warn("Something went wrong with Survey component");
    return null;
  }

  return (
    <div className={styles.surveyCard}>
      <SurveyQuestion {...currentQuestion} onNext={onNext} />
    </div>
  );
}

export function SurveyWithWrapper({ survey }: { survey: SurveyDto }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element) return;

    element.classList.remove(styles.visible);

    setTimeout(() => {
      element.classList.add(styles.visible);
    }, 100);
  }, []);

  const handleClose = () => {
    const element = wrapperRef.current;
    if (!element) return;

    element.classList.remove(styles.visible);
    surveyService.dismiss();
  };

  return (
    <div ref={wrapperRef} className={styles.surveyWrapper}>
      <Survey survey={survey} onClose={handleClose} />
    </div>
  );
}
