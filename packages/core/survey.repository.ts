import type { SurveyDto } from "./types";

const mockSurveys: SurveyDto[] = [
  {
    id: "1",
    name: "Survey 1",
    description: "This is the first survey",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    fields: [
      {
        name: "number",
        label: "How satisfied are you with our service?",
        type: "rating",
        metadata: {
          ratingType: "number",
        },
      },
    ],
  },
  {
    id: "2",
    name: "Survey 2",
    description: "This is the second survey",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    fields: [
      {
        name: "emoji",
        label: "How likely are you to recommend our product?",
        type: "rating",
        metadata: {
          ratingType: "emoji",
        },
      },
    ],
  },
];

class SurveyRepository {
  private surveys: SurveyDto[] | null = null;

  async getSurveysByClientId(clientId: string): Promise<SurveyDto[]> {
    console.log("[INFO] Fetching surveys for clientId:", clientId);
    if (this.surveys) return this.surveys;

    // TODO: Fetch surveys from backend by clientId
    this.surveys = mockSurveys;

    return this.surveys;
  }

  getAllSurveys(): SurveyDto[] | null {
    if (this.surveys) return this.surveys;

    console.warn(
      "[WARN] There is no surveys fetched yet. Please use getSurveysByClientId first"
    );

    return null;
  }
}

const surveyRepository = new SurveyRepository();

export { surveyRepository, SurveyRepository };
