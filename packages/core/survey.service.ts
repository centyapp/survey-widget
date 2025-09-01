import type { SurveyDto } from "./types";

type Survey = SurveyDto | null;
type Subscriber = (survey: Survey) => void;

class SurveyService {
  private subscribers = new Set<Subscriber>();
  private currentSurvey: Survey = null;
  private surveys: SurveyDto[] | null = null;
  private clientId: string | null = null;

  async init(clientId: string): Promise<void> {
    console.log(`Fetching using ${clientId}`);
    // TODO: Fetch real data using clientId
    this.surveys = mockSurveys;
    this.clientId = clientId;
  }

  isInitialized(): boolean {
    return this.surveys !== null;
  }

  show(surveyId: string): void {
    if (!this.isInitialized()) {
      console.warn("SurveyService not initialized yet");
      return;
    }

    const found = this.surveys!.find((s) => s.id === surveyId);
    if (!found) {
      console.warn(`Survey with id ${surveyId} not found`);
      return;
    }

    this.currentSurvey = found;
    this.notify();
  }

  response(surveyId: string) {
    console.log(
      `Send response to survey ${surveyId} of client ${this.clientId}`
    );

    this.dismiss();
  }

  subscribe(fn: Subscriber): VoidFunction {
    this.subscribers.add(fn);

    return () => {
      this.subscribers.delete(fn);
    };
  }

  private dismiss(): void {
    setTimeout(() => {
      this.currentSurvey = null;
      this.notify();
    }, 600);
  }

  private notify(): void {
    this.subscribers.forEach((fn) => fn(this.currentSurvey));
  }
}

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

const surverService = new SurveyService();

export default surverService;
