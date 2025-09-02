import PersonalInfoText from "./PersolanInfoText";
import ProfessionalInfo from "./ProfessionalInfor";


import {
  MapPin, Landmark, Mail, Phone, Calendar, GraduationCap,
  BookOpen, UserPlus, Wallet, FileClock, X, LogOut
} from "lucide-react";


export default function PersonalInfo ({ account }) {

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center gap-6 border-b pb-6 mb-8">
        <img
          src={account.image || "/default.png"}
          alt="Teacher"
          className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-indigo-200 shadow-md"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {account.full_name}
          </h2>
          <div className="mt-2 flex flex-col gap-1 text-gray-700">
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-700" />
              {account.user.email}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-700" />
              {account.mobile || "-"}
            </p>
          </div>

        </div>
      </div>

      <div>
        {/* Profile info */}
        <h3 className="text-xl font-semibold text-gray-800 mb-5">
          Profile Information
        </h3>
        <PersonalInfoText
        account={account}
        />
      </div>
      
      <div>
        <h3 className="text-xl font-semibold text-gray-800 my-5">
          Extra Information
        </h3>

          <ProfessionalInfo
            id={account.id}
          />
      </div>
    </div>
  );
};