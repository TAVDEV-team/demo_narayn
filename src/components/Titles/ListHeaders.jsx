export default function ListHeaders({ text }) {
  return (
    <div className="text-center mt-6 px-4">
      <h1
        className="
        text-lg sm:text-xl rounded-xl mt-8 p-6  bg-blue-950 text-stone-50 font-bold"
      >
        {text}
      </h1>
    </div>
  );
}
