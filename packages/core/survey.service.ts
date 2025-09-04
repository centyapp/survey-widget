import type { SurveyDto } from "./types";

type Survey = SurveyDto | null;
type Subscriber = (survey: Survey) => void;

class SurveyService {
  private currentSurvey: Survey = null;
  private subscribers = new Set<Subscriber>();
  private surveyDtoCache = new Map<string, SurveyDto>();

  async show(surveyId: string): Promise<void> {
    const found = await this.getSurveyById(surveyId);
    if (!found) {
      console.warn(`Survey with id ${surveyId} not found`);
      return;
    }

    this.currentSurvey = found;
    this.notify();
  }

  async response(questionId: string, value: any): Promise<void> {
    if (!this.currentSurvey) {
      console.warn("There is no survey showing at the moment");
      return;
    }

    console.log(
      `Send response to survey ${this.currentSurvey!.id}, question: ${questionId} with value: ${value}`
    );
  }

  dismiss(): void {
    setTimeout(() => {
      this.currentSurvey = null;
      this.notify();
    }, 600);
  }

  subscribe(fn: Subscriber): VoidFunction {
    this.subscribers.add(fn);

    return () => {
      this.subscribers.delete(fn);
    };
  }

  private async getSurveyById(id: string): Promise<SurveyDto> {
    const cached = this.surveyDtoCache.get(id);
    if (cached) return cached;

    const survey = (await (
      await fetch(`http://localhost:8080/api/v1/surveys/${id}`)
    ).json()) as SurveyDto;

    this.surveyDtoCache.set(id, survey);
    return survey;
  }

  private notify(): void {
    this.subscribers.forEach((fn) => fn(this.currentSurvey));
  }
}

const surverService = new SurveyService();

export default surverService;
