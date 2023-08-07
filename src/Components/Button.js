export default function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button font-subtitle text-blue-600">
      {children}
    </button>
  );
}
