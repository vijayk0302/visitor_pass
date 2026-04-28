import { useState } from "react";
import Sidebarmenu from "./Sidebarmenu";
import { CiMenuBurger } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";

export default function Sidebar() {

  const [isopen, setIsopen] = useState(false)

  const togglesidebar = () => {
    if (isopen) {
      setIsopen(false)
    }else{
      setIsopen(true)
    }
  }

  return (
    <>
      <button
        onClick={togglesidebar}
        className="absolute top-3 mt-1.5 left-4 z-40 p-2 text-lg text-white rounded-md md:hidden"
      >
        {isopen ? <RxCross1 /> : <CiMenuBurger />}
      </button>
      <aside
        className={`
        bg-slate-800 text-white min-h-screen p-4
        fixed top-0 left-0 z-20
        w-64 md:w-1/5
        ${isopen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static
        `}
      >
        <Sidebarmenu setIsopen={setIsopen} />
      </aside>

    </>
  );
}