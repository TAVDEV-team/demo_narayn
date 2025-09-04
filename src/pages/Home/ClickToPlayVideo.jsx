import { useState } from "react";
import CardHeader from "../../components/Titles/CardHeads";



export default function ClickToPlayVideo() {
  const [play, setPlay] = useState(false);

  const handleClick = () => {
    setPlay(true);
    // Optional: open in new tab instead
    // window.open("/video.mp4", "_blank");
  };

  return (
    <section className="w-full mt-16 flex justify-center">
      <div
        className="relative w-[1200px] h-[300px] overflow-hidden cursor-pointer"
        onClick={handleClick}
      >
        <video
          src="/video.mp4"
          className="w-full h-full object-cover"
          loop
          playsInline
          controls={play}
          autoPlay={play}
        />
        {!play && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <button className="text-white text-5xl font-bold">▶</button>
          </div>
        )}
      </div>
    </section>
  );
}
