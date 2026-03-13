import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">

        <section className="flex-1 flex flex-col justify-center items-center text-center px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Digital Visitor Pass Management
          </h2>
          <p className="text-gray-600 max-w-xl mb-6">
            Secure, fast and paperless visitor management system for modern offices.
          </p>
          <NavLink
            to="/register"
            className="bg-[#F59E0B] text-white px-6 py-3 rounded text-lg"
          >
            Get Started
          </NavLink>
        </section>

        
        <section className="bg-gray-100 py-12 px-6">
          <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3">

            <div className="bg-[#1F2933] p-6 rounded shadow text-center">
              <h3 className="font-semibold text-[#F9FAFB] text-lg mb-2">QR Based Entry</h3>
              <p className="text-[#F9FAFB] text-sm ">
                Generate secure QR passes for visitors.
              </p>
            </div>

            <div className="bg-[#1F2933] p-6 rounded shadow text-center">
              <h3 className="font-semibold text-[#F9FAFB] text-lg mb-2">Pre-Registration</h3>
              <p className="text-[#F9FAFB] text-sm ">
                Invite visitors before arrival.
              </p>
            </div>

            <div className="bg-[#1F2933] p-6 rounded shadow text-center">
              <h3 className="font-semibold text-[#F9FAFB] text-lg mb-2">Secure Check-In</h3>
              <p className="text-[#F9FAFB] text-sm ">
                Track entry and exit digitally.
              </p>
            </div>

          </div>
        </section>

        <footer className="text-center bg-[#111827] py-4 text-[#F9FAFB] text-sm">
          © 2026 Visi.co  All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default HomePage;