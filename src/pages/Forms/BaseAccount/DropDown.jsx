export default function Dropdown({ label, name, value, onChange, options }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-sm font-semibold mb-2">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 rounded-md w-full text-base sm:text-lg"
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
