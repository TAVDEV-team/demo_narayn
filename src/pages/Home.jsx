
import schoolImg from '/sir.jpg';

export default function Home() {
  return (
    <div className="px-6 py-10 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Left: Text content */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Viqarunnisa Noon School & College
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Viqarunnisa Noon School & College is an all-girls educational institute in Baily Road, Dhaka, Bangladesh. It has 4 campuses and around 25,000 students. Viqarunnisa Noon School & College is one of the renowned educational institutes in Bangladesh. We consider every child as unique and so we maintain inclusive learning-teaching environment at every step in our great set-up. It is a fact now that our results are getting better in the public examinations every time. It has been made possible through our extensive and effective care stretched out to every individual student. Our students conglomerate here from multifarious backgrounds; various strata of the society. They enter the threshold of our strong and fortified home of learning and come out bearing an all-round personality.
          </p>
          <p className="text-lg font-bold text-gray-800">
            — Md Ismail Zabihullah<br />
            Chairman, Viqarunnisa Noon School & College
          </p>
        </div>

        {/* Right: Image */}
        <div>
          <img
            src={schoolImg}
            alt="Viqarunnisa Noon School & College"
            className="rounded-lg shadow-lg w-50 h-30 "
          />
        </div>
      </div>
    </div>
  );
}
