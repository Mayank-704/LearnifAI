
import { useEffect } from 'react';
import { useHistoryStore } from '../../store/useHistoryStore';

const QuestionCard = () => {
  const { history, loading, error, getHistory } = useHistoryStore();

  useEffect(() => {
    getHistory();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {history.map((item, index) => (
        <div key={index}>
          <p><strong>Q:</strong> {item.ques}</p>
          <p><strong>A:</strong> {item.ans}</p>
          <p><em>User: {item.userId} | Time: {new Date(item.timestamp).toLocaleString()}</em></p>
        </div>
      ))}
    </div>
  );
};

export default QuestionCard;


