import { Printer } from "lucide-react";

export default function GalleryPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <button
        onClick={handlePrint}
        className="flex items-center gap-2 bg-blue-950 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-900 transition"
      >
        <Printer className="w-5 h-5" />
        Save Pdf
      </button>
    </div>
  );
}
