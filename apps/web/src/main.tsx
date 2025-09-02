import { createRoot } from "react-dom/client";
import "./style.css";
import { surveyService, SurveyWidget } from "@centyapp/survey-widget";
import { useState } from "react";

const App = () => {
  const [id, setId] = useState("");

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
      }}
    >
      <button
        onClick={() => {
          surveyService.show(id);
        }}
      >
        Show
      </button>

      <input type="text" value={id} onChange={(e) => setId(e.target.value)} />

      <SurveyWidget />
    </div>
  );
};

createRoot(document.getElementById("app")!).render(<App />);
