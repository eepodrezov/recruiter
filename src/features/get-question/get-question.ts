// src/feature/get-question.ts
import { questions } from "../../db";

// Ключи sessionStorage
const ASKED_KEY = 'askedQuestions';
const TRY_AGAIN_KEY = 'tryAgainQuestions';
const COUNTER_KEY = 'questionCounter';

const loadFromSession = (key: string): number[] =>
  JSON.parse(sessionStorage.getItem(key) || '[]');

const saveToSession = (key: string, value: number[]) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

const getCounter = (): number => Number(sessionStorage.getItem(COUNTER_KEY) || '0');
const setCounter = (value: number) => sessionStorage.setItem(COUNTER_KEY, String(value));

export const getQuestion = (): number => {
  const allQuestions = questions as { id: number }[];
  const asked = loadFromSession(ASKED_KEY);
  const tryAgain = loadFromSession(TRY_AGAIN_KEY);
  let counter = getCounter();

  const allIds = allQuestions.map(q => q.id);
  const unanswered = allIds.filter(id => !asked.includes(id));

  // Каждые 20 — вернуть tryAgain вопрос (если есть)
  if (counter > 0 && counter % 20 === 0 && tryAgain.length > 0) {
    const id = tryAgain.shift()!;
    saveToSession(TRY_AGAIN_KEY, tryAgain);
    counter++;
    setCounter(counter);
    return id;
  }

  // Если есть еще неотвеченные обычные вопросы — вернуть их
  if (unanswered.length > 0) {
    const nextId = unanswered[0];
    asked.push(nextId);
    saveToSession(ASKED_KEY, asked);
    counter++;
    setCounter(counter);
    return nextId;
  }

  // Если обычные вопросы закончились — выдать tryAgain (в любом случае)
  if (tryAgain.length > 0) {
    const id = tryAgain.shift()!;
    saveToSession(TRY_AGAIN_KEY, tryAgain);
    counter++;
    setCounter(counter);
    return id;
  }

  // Всё закончилось
  throw new Error('Вопросы закончились');
};


export const tryAgainQuestion = (id: number): void => {
  const tryAgain = new Set(loadFromSession(TRY_AGAIN_KEY));
  tryAgain.add(id);
  saveToSession(TRY_AGAIN_KEY, Array.from(tryAgain));
};

export const resetProgress = (): void => {
  sessionStorage.removeItem(ASKED_KEY);
  sessionStorage.removeItem(TRY_AGAIN_KEY);
  sessionStorage.removeItem(COUNTER_KEY);
};