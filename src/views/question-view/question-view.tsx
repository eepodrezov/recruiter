import { useState } from 'react';
import type { FC } from 'react';
import type { Question } from '../../db';
import { Plug } from './plug';

export interface QuestionViewProps {
    question?: Question
}

export const QuestionView: FC<QuestionViewProps> = ({ question }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  if (!question) {
    return (
      <Plug />
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-6 max-w-xl w-full text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          {question.question}
        </h1>

        {!showAnswer ? (
          <button
            onClick={() => setShowAnswer(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Показать ответ
          </button>
        ) : (
          <div className="space-y-6">
            <p className="text-lg text-gray-700">{question.answer}</p>
            <div className="flex justify-center gap-4">
              <button className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition">
                Верно
              </button>
              <button className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition">
                Неверно
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
