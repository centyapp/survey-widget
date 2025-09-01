import { createRoot } from "react-dom/client";
import "./style.css";
import { surveyService, SurveyWidget } from "@centyapp/survey-widget";

const App = () => {
  return (
    <div>
      {[1, 2, 3, 4].map((id, i) => (
        <button
          key={id}
          onClick={() => {
            surveyService.show(id.toString());
          }}
        >
          Show {i + 1}
        </button>
      ))}

      <SurveyWidget />
    </div>
  );
};

createRoot(document.getElementById("app")!).render(<App />);
