
export default function SidebarButton ({ icon, label, onClick }) {
  return (<button
    onClick={onClick}
    className="flex items-center gap-3 w-full py-2 px-3 rounded-lg 
      hover:bg-white hover:text-indigo-900 transition-colors border border-transparent hover:border-indigo-200 shadow-md"
  >
    {icon}
    <span>{label}</span>
  </button>)
}