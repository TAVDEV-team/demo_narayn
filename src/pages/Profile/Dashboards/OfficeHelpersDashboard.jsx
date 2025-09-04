
import { FileClock,KeyRound } from "lucide-react";
import SidebarButton from "../Buttons/SidebarButtons"


export default function OfficeHelperDashboard({ navigate }) {
  return (
    <>
      <SidebarButton
        label={"Change Password"}
        icon={<KeyRound className="w-5 h-5" />}
        onClick={() => navigate("/change-pass")}
      />
      <SidebarButton
        icon={<FileClock className="w-5 h-5" />}
        label="Add Notice"
        onClick={() => navigate("/notices-create")}
      /></>)
    ;
}