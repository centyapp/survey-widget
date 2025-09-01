import { surveyRepository, SurveyRepository } from "./survey.repository";
import type { SurveyDto } from "./types";

type Survey = SurveyDto;

class SurveyService {
  private repository: SurveyRepository = surveyRepository;
  private subscribers = new Set<(survey: Survey | null) => void>();
  private currentSurvey: Survey | null = null;
  private isInitialized = false;

  async init(clientId: string) {
    await this.repository.getSurveysByClientId(clientId);
    console.log("SurveyService initialized");
    this.isInitialized = true;
  }

  show(surveyId: string) {
    if (!this.isInitialized) {
      console.warn("SurveyService not initialized yet");
      return;
    }

    const currentSurveys = this.repository.getAllSurveys();
    if (!currentSurveys) {
      console.warn("???");
      return;
    }

    const found = currentSurveys.find((s) => s.id === surveyId);
    if (!found) {
      console.warn(`Survey with id ${surveyId} not found`);
      return;
    }

    this.currentSurvey = found;
    this.notify();
  }

  dismiss() {
    setTimeout(() => {
      this.currentSurvey = null;
      this.notify();
    }, 600);
  }

  subscribe(fn: (survey: SurveyDto | null) => void) {
    this.subscribers.add(fn);

    return () => {
      this.subscribers.delete(fn);
    };
  }

  private notify() {
    this.subscribers.forEach((fn) => fn(this.currentSurvey));
  }
}

const surverService = new SurveyService();

export default surverService;
