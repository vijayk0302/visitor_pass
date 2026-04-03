import React from 'react'

const Pagination = ({ currentpage, totalPages, setCurrentpage }) => {
    console.log( )
  return (
    <div className="flex left-25 sm:left-[50%] flex-col justify-center items-center gap-2 py-6">

      <p className="text-gray-400">
        Page {currentpage} of {totalPages}
      </p>

      <div className="flex gap-2">
        <button
          onClick={() => setCurrentpage((prev) => prev - 1)}
          disabled={currentpage === 1}
          className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setCurrentpage(num)}
            className={`px-3 py-1 rounded ${
              currentpage === num
                ? "bg-[#F59E0B] text-black"
                : "bg-gray-700"
            }`}
          >
            {num}
          </button>
        ))}

        <button
          onClick={() => setCurrentpage((prev) => prev + 1)}
          disabled={currentpage === totalPages}
          className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Pagination