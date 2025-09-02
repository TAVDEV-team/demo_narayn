
import { FileClock,UserPlus,Wallet,BookOpen} from "lucide-react";
import SidebarButton from "../Buttons/SidebarButtons"


export default function HeadmasterDashboard ({ navigate }){
  return( <div>
    <SidebarButton
      icon={<UserPlus className="w-5 h-5" />}
      label="Add Staffs"
      onClick={() => navigate("/add-staffs")}
    />
    <SidebarButton
      icon={<UserPlus className="w-5 h-5" />}
      label="Teacher addteacher"
      onClick={() => navigate("/addteacher")}
    />
    <SidebarButton
      icon={<Wallet className="w-5 h-5" />}
      label="Fund"
      onClick={() => navigate("/fund")}
    />
    <SidebarButton
      icon={<FileClock className="w-5 h-5" />}
      label="Pending Notice"
      onClick={() => navigate("/notice-pending")}
    />
    <SidebarButton
      icon={<BookOpen className="w-5 h-5" />}
      label="Routine"
      onClick={() => navigate("/update-routine")}
    />
  </div>);
}