import { FaStar } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import ReactStars from "react-rating-stars-component"
import { useDispatch, useSelector } from "react-redux"

import { removeFromCart } from "../../../../slices/cartSlice"

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  return (
    <div className="flex flex-1 flex-col">
      {cart.map((course, indx) => (
        <div
          key={course._id}
          className={`flex w-full flex-wrap items-start justify-between gap-6 $ {
            indx !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
          } ${indx !== 0 && "mt-6"} `}
        >
          <div className="flex flex-1 flex-col gap-4 ">
            <img
              src={course?.thumbnail}
              alt={course?.courseName}
              className=" w-full rounded-lg object-cover max-sm:w-[220px] max-sm:h-[100px]"
            />
            <div className="flex flex-col space-y-1">
              <p className="max-sm:text-sm text-lg font-medium text-richblack-5">
                {course?.courseName}
              </p>
              <p className="max-sm:text-[11px] text-sm text-richblack-300">
                {course?.category?.name}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-yellow-5 max-sm:text-sm">4.5</span>
                <ReactStars
                  count={5}
                  value={course?.ratingAndReviews?.length}
                  size={10}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />
                <span className="text-richblack-400 max-sm:text-sm">
                  {course?.ratingAndReviews?.length} Ratings
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-2 px-[10px] text-pink-200"
            >
              <RiDeleteBin6Line />
              <span className="max-sm:text-sm">Remove</span>
            </button>
            <p className="mb-6 text-3xl max-sm:text-lg font-medium text-yellow-100">
              ₹ {course?.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
