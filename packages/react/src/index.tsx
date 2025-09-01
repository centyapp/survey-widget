import { surveyService, type SurveyDto } from "@repo/core";
import { useEffect, useState } from "react";
import Survey from "./survey";
import "./index.module.css";

export default function SurveyWidget() {
  const [survey, setSurvey] = useState<SurveyDto | null>(null);

  useEffect(() => {
    (async () => {
      await surveyService.init("mock");
      surveyService.subscribe(setSurvey);
    })();
  }, []);

  if (!survey) return null;

  return <Survey survey={survey} />;
}
