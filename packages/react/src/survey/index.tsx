import SurveyQuestion from "@/survey-question";
import { cn } from "@/utils";
import { surveyService, type SurveyDto } from "@repo/core";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./index.module.css";

type Props = {
  survey: SurveyDto;
  onClose?: VoidFunction;
  className?: string;
};

export function Survey({ survey, onClose, className }: Props) {
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
    <div className={cn(styles.surveyCard, className)}>
      <SurveyQuestion {...currentQuestion} onNext={onNext} />
    </div>
  );
}

export function SurveyWithWrapper({ survey, className }: Props) {
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
    <div ref={wrapperRef} className={cn(styles.surveyWrapper, className)}>
      <Survey survey={survey} onClose={handleClose} />
    </div>
  );
}
