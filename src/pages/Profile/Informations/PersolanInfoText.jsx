import ProfileItem from "../Buttons/ProfileItems"
import {
  MapPin, Landmark, Mail, Phone, Calendar, GraduationCap,
  BookOpen, UserPlus, Wallet, FileClock, X, LogOut
} from "lucide-react";



export default function PersonalInfoText ({account}){
  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-gray-700">
          <ProfileItem
            icon={<Landmark className="w-5 h-5 text-blue-700" />}
            label="Religion"
            value={account.display_religion || "-"}
          />
          <ProfileItem
            icon={<Calendar className="w-5 h-5 text-blue-700" />}
            label="Date of Birth"
            value={account.date_of_birth || "-"}
          />
          <ProfileItem
            icon={<Calendar className="w-5 h-5 text-blue-700" />}
            label="Joining Date"
            value={account.joining_date || "-"}
          />
          <ProfileItem
            icon={<GraduationCap className="w-5 h-5 text-blue-700" />}
            label="Last Institute"
            value={account.last_educational_institute || "-"}
          />
          <ProfileItem
            icon={<MapPin className="w-5 h-5 text-blue-700" />}
            label="Address"
            value={account.address || "-"}
          />
          <ProfileItem
            icon={<MapPin className="w-5 h-5 text-blue-700" />}
            label="Gender"
            value={account.display_gender || "-"}
          />
        </div>
  )
}
