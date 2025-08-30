import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SurveyWidget from ".";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div>
      <SurveyWidget clientId="asd" />
    </div>
  </StrictMode>
);
