import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main content grows to push footer down */}
      <main className="flex-grow">
        <Outlet/>
      </main>

      {/* Footer stays pinned bottom */}
      <Footer />
    </div>
  );
}
