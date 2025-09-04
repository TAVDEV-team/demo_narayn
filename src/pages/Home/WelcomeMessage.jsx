
export default function WelcomeMessage() {
  return (
    <section className="bg-sky-100 py-12 sm:py-16">
            <h2 className="text-3xl text-center sm:text-4xl md:text-5xl font-extrabold text-blue-950 leading-tight mb-8">
              Welcome to <span className="text-gray-700">Narayanpur High School</span>
            </h2>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Row 1: Image Left, Text Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div>
            <img
              src="/buildin2.jpg"
              alt="Narayanpur High School"
              className="w-full h-[320px] sm:h-[380px] md:h-[300px] rounded-xl object-cover shadow-md"
            />
          </div>

          {/* Right: Text */}
          <div>


            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-600">
              Narayanpur High School is one of the most prestigious and important
              educational institutions in Chauddagram, Cumilla. It was established
              in 1980 with only five classes and has since grown into a respected
              institution with modern facilities and a reputation for discipline,
              education, and character.
            </p>
          </div>
        </div>

        {/* Row 2: Text Left, Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-600">
              Today, it accommodates thousands of students in Bangla 
              versions, housed in multiple multi-storied buildings. The school was
              founded with the vision of providing quality education and has grown
              from a small setup into a fully established institution, now educating
              over <span className="font-semibold text-blue-950">500 students</span>.
            </p>
          </div>

          {/* Right: Image */}
          <div>
            <img
              src="/building3.jpg"
              alt="Classroom"
              className="w-full h-[200px] sm:h-[380px] md:h-[300px] rounded-xl object-cover shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
