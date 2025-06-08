import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";

import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from "../core/HomePage/Auth/ProfileDropDown";


function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hamburger, Sethamburger] = useState(false);


  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(res.data.data);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    })();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >

      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
        <div className="max-sm:pl-[30px]">
         <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </div>
          
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div
                    className={`group relative flex cursor-pointer items-center gap-1 ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                  >
                    <p>{link.title}</p>
                    <BsChevronDown />
                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                      <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                      {loading ? (
                        <p className="text-center">Loading...</p>
                      ) : subLinks && subLinks.length ? (
                        subLinks
                          .filter((subLink) => subLink?.courses?.length > 0)
                          .map((subLink, i) => (
                            <Link
                              to={`/catalog/${subLink.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                              key={i}
                            >
                              <p>{subLink.name}</p>
                            </Link>
                          ))
                      ) : (
                        <p className="text-center">No Courses Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Hamburger Menu */}
        <div
  className={` flex flex-row justify-center items-center gap-2 px-2 py-4 absolute top-[55px] shadow-md shadow-caribbeangreen-25 border-yt-1 border-yb-2 mx-auto ${
        location.pathname !== "/" ? "bg-richblack-800" : "bg-richblack-900"
      } text-white right-0 z-50 w-full transition-all duration-500 ease-out ${hamburger ? "opacity-100 visible" : "opacity-0 invisible"}`}
>
  <ul className="flex flex-row gap-4 max-sm:gap-2 justify-center items-center">
    {NavbarLinks.map((link, index) => (
      <li key={index}>
        {link.title === "Catalog" ? (
          <div
            className={`group relative flex cursor-pointer items-center gap-1 ${
              matchRoute("/catalog/:catalogName")
                ? "text-yellow-25"
                : "text-richblack-25"
            }`}
          >
            <p className="max-sm:text-[12px]" >{link.title}</p>
            <BsChevronDown fontSize="12px"/>
            <div className="invisible absolute max-sm:w-[100px] left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 max-sm:p-2 gap-4 max-sm:gap-2 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
              <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[45%] translate-y-[-35%] rotate-45 select-none rounded bg-richblack-5"></div>
              {loading ? (
                <p className="text-center">Loading...</p>
              ) : subLinks && subLinks.length ? (
                subLinks
                  .filter((subLink) => subLink?.courses?.length > 0)
                  .map((subLink, i) => (
                    <Link
                      to={`/catalog/${subLink.name
                        .split(" ")
                        .join("-")
                        .toLowerCase()}`}
                      className="rounded-lg bg-transparent max-sm:text-sm text-center hover:bg-richblack-50"
                      key={i}
                    >
                      <p>{subLink.name}</p>
                    </Link>
                  ))
              ) : (
                <p className="text-center">No Courses Found</p>
              )}
            </div>
          </div>
        ) :( link.title !== "Home" &&
          <Link to={link?.path}>
            <p
              className={`${
                matchRoute(link?.path)
                  ? "text-yellow-25"
                  : "text-richblack-25"
              } max-sm:text-[12px]`}
            >
              {link.title}
            </p>
          </Link>
        )}
      </li>
    ))}
  </ul>
          {/* Profile and Auth */}
        <div className=" flex flex-row items-center gap-x-2  ">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart fontSize="20px" className=" text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-1 -right-1 grid h-3 w-3 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-[8px] font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            
            <Link to="/login">
            <div className="flex flex-col justify-center items-center">
            <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] max-sm:text-[8px] max-sm:px-1 max-sm:py-1 text-richblack-100">
                Log in
              </button>
            </div>

            </Link>
          )}
          {token === null && (
            <Link to="/signup">
            <div className="flex flex-col justify-center items-center">
            <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] max-sm:text-[8px] max-sm:px-1 max-sm:py-1 text-richblack-100">
                Sign Up
              </button>
            </div>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
</div>


        {/* Profile and Auth */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>

        <button
          className="mr-4 md:hidden"
          onClick={() => Sethamburger(!hamburger)}
        >
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
