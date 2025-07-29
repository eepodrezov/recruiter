import { useParams } from 'react-router-dom';
import questions from '../db/questions.json';
import { QuestionView } from '../views';

export default function Detail() {
  const { id } = useParams();
  const questionId = parseInt(id || '', 10);
 
  const question = questions.find(q => q.id === questionId);

  return (
    <QuestionView question={question}/>
  );
}
