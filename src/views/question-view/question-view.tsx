import { useMemo, useState } from 'react';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Question } from '../../db';
import { Plug } from './plug';
import { getQuestion, tryAgainQuestion, resetProgress } from '../../features/get-question';

export interface QuestionViewProps {
    question?: Question
}

const QuestionViewSteps = {
  QUESTION: 'QUESTION',
  ANSWER: 'ANSWER',
} as const;
export type QuestionViewSteps = typeof QuestionViewSteps[keyof typeof QuestionViewSteps];

export const QuestionView: FC<QuestionViewProps> = ({ question }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<QuestionViewSteps>(QuestionViewSteps.QUESTION);

  const next = () => {
    const nextQuestionId = getQuestion();
    navigate(`/${nextQuestionId}`);
    setStep(QuestionViewSteps.QUESTION);
  };

  const handleRight = () => {
    next()
  };

  const handleWrong = (questionId: number) => {
    tryAgainQuestion(questionId);
    next();
  };

  const handleReset = () => {
    setStep(QuestionViewSteps.QUESTION);
    navigate(`/`);
    resetProgress()
  };

  const action = useMemo(() => {
    switch (step) {
      case QuestionViewSteps.QUESTION:
        return (
          <button
            onClick={() => setStep(QuestionViewSteps.ANSWER)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Показать ответ
          </button>
        );
      case QuestionViewSteps.ANSWER:
        return (
          <div className="space-y-6">
            <p className="text-lg text-gray-700">{question!.answer}</p>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleRight}
                className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Верно
              </button>
              <button
                onClick={() => handleWrong(question!.id)}
                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Неверно
              </button>
            </div>
          </div>
        );
    }
  }, [step]);

  if (!question) {
    return <Plug />;
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <button
        onClick={handleReset}
        className="absolute top-4 right-4 bg-gray-300 hover:bg-gray-400 font-semibold py-1 px-4 rounded text-white"
      >
        Сброс
      </button>

      <div className="bg-white shadow-xl rounded-2xl p-6 max-w-xl w-full text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          {question.question}
        </h1>
        {action}
      </div>
    </div>
  );
};
