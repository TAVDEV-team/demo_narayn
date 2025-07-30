import React from 'react';

const members = [
  {
    name: "Shapon Chakraborty",
    role: "Headteacher",
    image: "/sir.jpg",
  },
  {
    name: "Rahim Uddin",
    role: "Vice Principal",
    image: "/default.jpg",
  },
  {
    name: "Sultana Begum",
    role: "Chairperson",
    image: "/default.jpg",
  },
];

export default function GoverningBody() {
  return (
    <section className="bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Governing Body</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {members.map((member, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
              <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
              <h3 className="text-center font-semibold text-lg">{member.name}</h3>
              <p className="text-center text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
