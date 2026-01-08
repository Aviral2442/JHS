import { Outlet } from "react-router";
import Header from "../components/website/Header";
import Footer from "../components/website/Footer";

/**
 * WebsiteLayout Component
 * Layout for public website pages (no sidebar, no admin features)
 */
const WebsiteLayout: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Add your public website header here if needed */}
      {/* <PublicHeader /> */}
    <Header />
      <main className="">
        <Outlet />
      </main>
      <Footer/>
      {/* Add your public website footer here if needed */}
      {/* <PublicFooter /> */}
    </div>
  );
};

export default WebsiteLayout;
