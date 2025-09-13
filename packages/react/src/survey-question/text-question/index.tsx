import { surveyService, type TextQuestionMetadata } from "@repo/core";
import styles from "./index.module.css";
import Button from "@/button";
import { useState } from "react";

type Props = TextQuestionMetadata & {
  questionId: string;
  onNext: VoidFunction;
};

export default function TextQuestion({
  placeholder,
  maxLength,
  questionId,
  onNext,
}: Props) {
  const [input, setInput] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) {
      console.warn(`Something went wrong with TextQuestion`);
      return;
    }

    await surveyService.response(questionId, input);
    onNext();
  };

  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <textarea
        name="text-question"
        className={styles.textarea}
        rows={3}
        placeholder={placeholder}
        maxLength={maxLength}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <Button disabled={!input} className={styles.sendButton} size="icon">
        <SendIcon />
      </Button>
    </form>
  );
}

function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
      <path d="m21.854 2.147-10.94 10.939" />
    </svg>
  );
}
