import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar} from "../../../slices/videoDetailsSidebarSlice"; // Update import path
import { useNavigate, useParams } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { ImCross } from "react-icons/im";
import { MdNavigateNext } from "react-icons/md";

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const { sectionId, subSectionId } = useParams();
  const dispatch = useDispatch();

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  const isSidebarOpen = useSelector((state) => state.videoDetailsSidebar.isOpen);

  useEffect(() => {
    if (!courseSectionData.length) return;

    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndx = courseSectionData?.[currentSectionIndx]?.subSection.findIndex(
      (data) => data._id === subSectionId
    );

    const activeSubSectionId =
      courseSectionData[currentSectionIndx]?.subSection?.[currentSubSectionIndx]
        ?._id;

    setActiveStatus(courseSectionData?.[currentSectionIndx]?._id);
    setVideoBarActive(activeSubSectionId);
  }, [courseSectionData, courseEntireData]);

  return (
    <div
      className={`absolute  top-0 left-0 bottom-0 z-50 flex flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 transition-transform duration-300 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Show Toggle Button only when Sidebar is Closed */}
      <div
        onClick={() => dispatch(toggleSidebar())}
        className={`absolute -top-12 -right-10 p-2 transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-0" : "opacity-100"
        } z-60`} // Ensure toggle button is visible above the sidebar
      >
        <MdNavigateNext color="white" fontSize="25px" />
      </div>

      <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
        <div className="flex w-full items-center justify-between gap-2 pr-6">
          <div
            onClick={() => navigate(`/dashboard/enrolled-courses`)}
            className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
            title="back"
          >
            <IoIosArrowBack size={20} />
          </div>

          {/* Close Sidebar Button */}
          <div
            onClick={() => dispatch(toggleSidebar())}
            className={`absolute top-0 right-0  p-2 bg-richblack-800 ${isSidebarOpen ? "" : "hidden"} z-50`} // Sidebar close button z-index
          >
            <ImCross color="white" fontSize="15px" />
          </div>

          <IconBtn
            text="Add Review"
            customClasses="ml-auto"
            onclick={() => setReviewModal(true)}
          />
        </div>

        <div className="flex flex-col">
          <p>{courseEntireData?.courseName}</p>
          <p className="text-sm font-semibold text-richblack-500">
            {completedLectures?.length} / {totalNoOfLectures}
          </p>
        </div>
      </div>

      <div className="h-[calc(100vh-5rem)] overflow-y-auto">
        {courseSectionData.map((course, index) => (
          <div
            className="mt-2 cursor-pointer text-sm text-richblack-5"
            onClick={() => setActiveStatus(course?._id)}
            key={index}
          >
            <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
              <div className="w-[70%] font-semibold">{course?.sectionName}</div>
              <div className="flex items-center gap-3">
                <span
                  className={`${
                    activeStatus === course?.sectionName
                      ? "rotate-0"
                      : "rotate-180"
                  } transition-all duration-500`}
                >
                  <BsChevronDown />
                </span>
              </div>
            </div>

            {activeStatus === course?._id && (
              <div className="transition-[height] duration-500 ease-in-out">
                {course.subSection.map((topic, i) => (
                  <div
                    className={`flex gap-3  px-5 py-2 ${
                      videoBarActive === topic._id
                        ? "bg-yellow-200 font-semibold text-richblack-800"
                        : "hover:bg-richblack-900"
                    } `}
                    key={i}
                    onClick={() => {
                      navigate(
                        `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                      );
                      setVideoBarActive(topic._id);
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures.includes(topic?._id)}
                      onChange={() => {}}
                    />
                    {topic.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
