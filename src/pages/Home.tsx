import { useNavigate } from "react-router-dom";
import { getQuestion } from "../features/get-question";

export default function Home() {
  const navigate = useNavigate();

  const handleStart = () => {
    const questionId = getQuestion();
    navigate(`/${questionId}`);
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-6 max-w-xl w-full text-center mx-4">
        <h1 className="text-xl font-semibold text-gray-800 mb-6">
          Тренируемся?
        </h1>
        <button
          onClick={handleStart}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Поехали
        </button>
      </div>
    </div>
  );
}
