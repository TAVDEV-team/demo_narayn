
import LatestNotices from "./LatestNotices";
import ClickToPlayVideo from "./ClickToPlayVideo";
import Hero from "./Hero";
import Message from "./Message";
import PhotoGallery from "./PhotoGallery";
import WelcomeMessage from "./WelcomeMessage";
import ExploreCards from "./explore_cards";

export default function Home() {
  return (
    <div className="bg-sky-100 min-h-screen">
      <Hero />
      <WelcomeMessage />
      <ExploreCards/> 
      <LatestNotices />
      <Message />
      <PhotoGallery />
      <ClickToPlayVideo />
    </div>
    
  );
}

