export default function  ProfileItem({ icon, label, value }){
 return ( <p className="flex items-center gap-2">
    {icon}
    <span className="font-medium">{label}:</span>
    <span className="ml-1 text-gray-800">{value}</span>
  </p>
);
}