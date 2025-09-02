import SurveyWidget from "@/survey-widget";
import { surveyService } from "@repo/core";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div>
      <h1>My App</h1>
      <button onClick={() => surveyService.show("1")}>Show 1</button>
      <button onClick={() => surveyService.show("2")}>Show 2</button>
      <button onClick={() => surveyService.show("3")}>Show 3</button>

      <SurveyWidget />
    </div>
  </StrictMode>
);
