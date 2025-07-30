import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import React from "react";
const ContactCards = () => {
  const data = [
    { icon: <MdEmail size={30} />, label: 'Email', value: 'school@example.com' },
    { icon: <MdPhone size={30} />, label: 'Phone', value: '+880123456789' },
    { icon: <MdLocationOn size={30} />, label: 'Address', value: 'Baily Road, Dhaka' }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-4 text-white py-8 px-4 ">
      {data.map((item, index) => (
        <div key={index} className="bg-gray-600 hover:shadow-slate-500 p-6 rounded-xl text-center shadow-lg">
          <div className="flex justify-center mb-2 text-blue-400">{item.icon}</div>
          <h4 className="text-xl font-semibold mb-1">{item.label}</h4>
          <p>{item.value}</p>
        </div>
      ))}
    </div>
  );
};
export default ContactCards
