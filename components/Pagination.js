import { IconOnly } from './ui/Form';

export default function Pagination({
  messagesPerPage,
  totalMessages,
  paginate,
}) {
  const pageNumbers = [];

  for (let i = 1; i < Math.ceil(totalMessages / messagesPerPage); i += 1) {
    pageNumbers.push(i);
  }
  return (
    <ul className="flex-center-center">
      {pageNumbers.map((n) => (
        <li key={n}>
          <IconOnly className={`${n}`} primary onClick={() => paginate(n)}>
            {n}
          </IconOnly>
        </li>
      ))}
    </ul>
  );
}
