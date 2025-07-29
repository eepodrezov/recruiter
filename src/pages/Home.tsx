import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Главная страница</h1>
      <p><Link to="/123">Перейти к странице с ID 123</Link></p>
    </div>
  );
}