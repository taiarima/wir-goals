export default function SuccessMessage({ children }) {
  return (
    <div className="overlay">
      <div className="success-message font-subtitle">{children}</div>
    </div>
  );
}
