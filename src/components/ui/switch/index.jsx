export default function Switch({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
        checked ? "bg-green-500" : "bg-gray-600"
      }`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  );
}
