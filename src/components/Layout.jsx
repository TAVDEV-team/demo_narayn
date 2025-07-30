import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Carousel from './Carousel';


export default function Layout() {
  return (
    <>
    <Carousel />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
