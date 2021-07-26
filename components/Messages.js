import { formatDate } from '../utils';
import Spinner from './ui/Spinner';

export default function Messages({ messages, loading }) {
  const mapMessages = () => {
    return messages.map((x, i) => (
      <div className="message message-info" key={x.id}>
        <p>{x.content}</p>
        <small>{formatDate(x.created_at)}</small>
      </div>
    ));
  };

  if (loading) return <Spinner />;

  return <section>{messages && mapMessages()}</section>;
}
