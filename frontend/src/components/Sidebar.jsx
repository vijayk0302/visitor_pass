import { useState } from "react";
import Sidebarmenu from "./Sidebarmenu";

export default function Sidebar() {

  const [isopen, setIsopen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsopen(!isopen)}
        className="absolute top-3 left-4 z-50 p-2 text-lg text-white rounded-md md:hidden"
      >
        {isopen ? '✕' : '☰'}
      </button>

      {isopen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setIsopen(false)}
        />
      )}


      <aside
        className={`
        bg-slate-800 text-white min-h-screen p-4
        fixed top-0 left-0 z-40
        w-64 md:w-1/5
        transform transition-transform duration-300
        ${isopen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static
        `}
      >
        <Sidebarmenu setIsopen={setIsopen}  />
      </aside>

    </>
  );
}