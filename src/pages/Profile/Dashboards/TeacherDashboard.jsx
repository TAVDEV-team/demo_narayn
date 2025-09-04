
import {UserPlus, GraduationCap, MessageCircle} from "lucide-react";
import SidebarButton from "../Buttons/SidebarButtons"
import OfficeHelperDashboard from "./OfficeHelpersDashboard";
import AddMessage from "../../Forms/MessagesForm";
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
    {/* <SidebarButton
      icon={<MessageCircle className="w-5 h-5" />}
      label="Add Message"
      onClick={() => navigate("/add-message ")}
    /> */}
    <OfficeHelperDashboard navigate={navigate} />
  </div>)
;
}