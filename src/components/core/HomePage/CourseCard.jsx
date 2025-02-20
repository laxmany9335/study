

function CourseCard({ cardKey, cardData }) {
    return (
      <div
        className={`relative max-w-[300px] flex flex-col px-5 pt-7 pb-2 gap-7 justify-between flex-auto
        ${cardKey === 0 ? "bg-white text-richblack-700" : "bg-richblack-700 text-white "}`}
      >
        {/* Background div */}
        {cardKey === 0 && <div className="absolute -z-10 inset-0 translate-x-2 translate-y-2 bg-yellow-5"></div>}
        
        {/* Content */}
        <div>
        <div className="relative font-bold text-lg mb-1">{cardData.heading}</div>
        <div className="relative text-sm">{cardData.description}</div>
        </div>

        <div className="flex flex-row justify-between w-full relative">
          <div>{cardData.level}</div>
          <div>{cardData.lessionNumber}</div>
        </div>
      </div>
    );
  }
  
  export default CourseCard;
  