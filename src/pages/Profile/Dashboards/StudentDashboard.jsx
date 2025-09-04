
import { GraduationCap } from "lucide-react";
import SidebarButton from "../Buttons/SidebarButtons"

export default function StudentDashboard  ({ navigate }){
  return (<SidebarButton
    icon={<GraduationCap className="w-5 h-5" />}
    label="View Results"
    onClick={() => navigate("/results")}
  />)
;
}
