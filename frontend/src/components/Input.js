export default function Input({ label, type, value, onChange, error }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`block w-full px-3 py-2 mt-1 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'}`}
        required
      />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}
