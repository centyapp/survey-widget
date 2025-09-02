import Survey from "@/survey";
import { surveyService, type SurveyDto } from "@repo/core";
import { useEffect, useState } from "react";

export default function SurveyWidget() {
  const [survey, setSurvey] = useState<SurveyDto | null>(null);

  useEffect(() => surveyService.subscribe(setSurvey), []);

  if (!survey) return null;

  return <Survey survey={survey} />;
}
