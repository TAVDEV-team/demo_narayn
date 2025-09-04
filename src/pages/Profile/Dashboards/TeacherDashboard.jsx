
import {UserPlus, GraduationCap} from "lucide-react";
import SidebarButton from "../Buttons/SidebarButtons"
import OfficeHelperDashboard from "./OfficeHelpersDashboard";

export default function TeacherDashboard ( {navigate} ) {
  return (<div>
    <SidebarButton
      icon={<UserPlus className="w-5 h-5" />}
      label="Add Student"
      onClick={() => navigate("/student")}
    />
    <SidebarButton
      icon={<GraduationCap className="w-5 h-5" />}
      label="Add Result"
      onClick={() => navigate("/add-result")}
    />
    <OfficeHelperDashboard navigate={navigate} />
  </div>)
;
}