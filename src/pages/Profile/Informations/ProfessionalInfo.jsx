import { UserPlus, BookOpen, } from "lucide-react";
import { FetchProfessionalAccount } from "../FetchAccount";
import { useState, useEffect } from "react";
import ProfileItem from "../Buttons/ProfileItems";


export default function ProfessionalInfo ({id})  {
  const [data, setData] = useState(null);

  useEffect(() => {
    let mounted = true;
    FetchProfessionalAccount(id).then((res) => {
      if (mounted) setData(res);
    });
    return () => {
      mounted = false;
    };
  }, [id]);

  if (!data) {
    return <p className="text-gray-500">Loading professional info...</p>;
  }

  const { account, role } = data;

  if (role === "Student") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-gray-700">
        <ProfileItem
          icon={<BookOpen className="w-5 h-5 text-blue-700" />}
          label="Class"
          value={account.aclass || ""}
        />
        <ProfileItem
          icon={<UserPlus className="w-5 h-5 text-blue-700" />}
          label="Roll No"
          value={account.roll_number || "-"}
        />
        <ProfileItem
          icon={<UserPlus className="w-5 h-5 text-blue-700" />}
          label="Batch"
          value={account.batch_label || "-"}
        />
      </div>
    );
  }

  if (role === "Governing") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-gray-700">
        <ProfileItem
          icon={<UserPlus className="w-5 h-5 text-blue-700" />}
          label="Position"
          value={account.position || "-"}
        />
      </div>
    );
  }
  if (role === "Teacher") {
     return (
     <div className="grid grid-cols-1 sm:grid-cols-2  gap-5 text-gray-700"> 
     <ProfileItem icon={<BookOpen className="w-5 h-5 text-blue-700" />} 
     label="Subject" 
     value={account.base_subject_detail?.name || "-"} 
     /> 
     <ProfileItem icon={<BookOpen className="w-5 h-5 text-blue-700" />} label="Class Teacher" value={account.class_teacher_of || "-"} /> 
     <ProfileItem icon={<UserPlus className="w-5 h-5 text-blue-700" />} label="Designation" value={account.designation || "Teacher"} />
      </div>); }
  if (role === "Office_Helper") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-gray-700">
        <ProfileItem
          icon={<UserPlus className="w-5 h-5 text-blue-700" />}
          label="Duty"
          value={account.duty || "-"}
        />
      </div>
    );
  }

  return <p className="text-gray-500">No professional info available.</p>;
}