import SurveyWidget from "@/survey-widget";
import { surveyService } from "@repo/core";
import { useState } from "react";

export default function Demo() {
  const [id, setId] = useState("3a3376a7-8fda-423a-8243-3927f98d6d16");

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: 8,
        }}
      >
        <input
          width={500}
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button onClick={() => surveyService.show(id)}>Show</button>
        <SurveyWidget />
      </div>

      {/* <Survey
        survey={{
          id: "mock-survey",
          name: "mock survey",
          description: "",
          createdAt: "",
          updatedAt: "",
          questions: [
            {
              name: "1",
              label: "Label",
              type: "rating",
              metadata: {
                ratingType: "star",
                minDesc: "min",
                maxDesc: "max",
              } as RatingQuestionMetadata,
            },
            {
              name: "2",
              label: "Label",
              type: "text",
              metadata: {
                placeholder: "placeholder ne",
                maxLength: 20,
              } as TextQuestionMetadata,
            },
          ],
        }}
      /> */}
    </>
  );
}
