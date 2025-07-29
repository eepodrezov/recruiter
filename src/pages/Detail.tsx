import { useParams } from 'react-router-dom';
import questions from '../db/questions.json';

export default function Detail() {
  const { id } = useParams();
  const questionId = parseInt(id || '', 10);
 
  const questionItem = questions.find(q => q.id === questionId);

  if (!questionItem) {
    return <div>Вопрос с ID {id} не найден.</div>;
  }

  return (
    <div>
      <h2>Вопрос: {questionItem.question}</h2>
      <p>Ответ: {questionItem.answer}</p>
    </div>
  );
}
