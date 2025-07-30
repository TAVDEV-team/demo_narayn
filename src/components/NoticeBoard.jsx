import React from 'react';

export default function NoticeBoard() {
  return (
    <section className="bg-white py-10 px-6 md:px-20">
      <h2 className="text-2xl font-bold text-blue-900 mb-6 border-b-2 border-blue-900 pb-2">
        Notice Board
      </h2>

      {/* Notice Items */}
      <div className="space-y-4">
        <div className="border p-4 rounded-md shadow-sm hover:shadow-md transition flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              ২০২৫‑২০২৬ শিক্ষাবর্ষে একাদশ শ্রেণির ভর্তি বিজ্ঞপ্তি
            </h3>
            <p className="text-sm text-gray-600">Date: 28 Jul 2025</p>
          </div>
          <a href="#"
             className="text-blue-600 font-medium hover:underline">
            See More →
          </a>
        </div>

        <div className="border p-4 rounded-md shadow-sm hover:shadow-md transition flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              প্রতিষ্ঠানে বার্ষিকী নূন প্রবাহ মুদ্রণ ও সরবরাহ কাজের দরপত্র বিজ্ঞপ্তি
            </h3>
            <p className="text-sm text-gray-600">Date: 12 Jul 2025</p>
          </div>
          <a href="#"
             className="text-blue-600 font-medium hover:underline">
            See More →
          </a>
        </div>

        {/* Add more manually */}
      </div>
    </section>
  );
}
