import TeacherDashboard from "./TeacherDashboard";
import StudentDashboard from "./StudentDashboard";
import OfficeHelperDashboard from "./OfficeHelpersDashboard";
import HeadmasterDashboard from "./HeadmastersDashboard"
import SidebarButton from "../Buttons/SidebarButtons";
import {

LogOut,

} from "lucide-react";


  export default function DashboardItems({ account, role, navigate, handleLogout, isLoggingOut }){
    return (
      <div>
        {/* Conditional rendering for Headmaster */}
        {account.is_headmaster && <HeadmasterDashboard navigate={navigate} />}

        {/* Role-based dashboards */}
        {role === "Teacher" && <TeacherDashboard navigate={navigate} />}
        {role === "Office_Helper" && <OfficeHelperDashboard navigate={navigate} />}
        {role === "Student" && <StudentDashboard navigate={navigate}/>}

        {/* Always visible */}
        <SidebarButton
          label={isLoggingOut ? "Logging out..." : "Logout"}
          icon={<LogOut className="w-5 h-5"/>}
          onClick={handleLogout}
        />
      </div>
    );
};
