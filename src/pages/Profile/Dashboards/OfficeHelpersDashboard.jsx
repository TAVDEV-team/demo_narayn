
import { FileClock} from "lucide-react";
import SidebarButton from "../Buttons/SidebarButtons"


export default function OfficeHelperDashboard ( {navigate} ) {
return (  <SidebarButton
    icon={<FileClock className="w-5 h-5" />}
    label="Add Notice"
    onClick={() => navigate("/notices-create")}
  />)
;
}