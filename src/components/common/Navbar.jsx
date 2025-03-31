import React, { useEffect, useState } from 'react'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { NavbarLinks } from '../../data/navbar-links'
import { Link, matchPath } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileDropDown from '../core/HomePage/Auth/ProfileDropDown';
import { apiConnector } from '../../services/apiconnector';
import { categories } from '../../services/apis';

const subLinks = [
    {
        title: "python",
        link: "/category/python"
    },
    {
        title: "web dev",
        link: "/category/web-dev"
    }
]

function Navbar() {

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItmes } = useSelector((state) => state.cart);
    const location = useLocation();
    const [subLnks, setSubLnk] = useState([]);

    const fetchSubLnks = async () => {
            try {
                const result = await  apiConnector("GET", categories.CATEGORIES_API);
                setSubLnk(result?.data?.data);
                console.log("Printing SubLinks result: ", result);
            }catch(error){
                console.log(error);
                console.log("Could not fetch the category list");
            }
     }

    useEffect(() => {
        fetchSubLnks();
    }, []);

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    return (
        <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
            <div className=' flex w-11/12 max-w-maxContent items-center justify-between'>
                <Link to="/">
                    <img src={logo} alt="logo Image" width="150px" height="50px" />
                </Link>

                <nav>
                    <ul className="flex gap-x-6 text-richblack-25">
                        {


                            NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    {
                                        link.title === "Catalog" ? (
                                            <div className='relative flex items-center gap-2 group'>
                                                <p>{link.title}</p>
                                                <IoIosArrowDown fontSize={"20px"} className='mt-1' />
                                                <div className='invisible absolute left-[50%] top-[50%] 
                                                            translate-x-[-44%] translate-y-[35%]
                                                            flex flex-col rounded-md bg-richblack-5 p-4 text-pure-greys-900
                                                            opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]'>
                                                    <div className='absolute bg-richblack-5 left-[50%] top-0 h-5 w-10 rotate-45'></div>
                                                    {
                                                        subLinks.length ? (
                                                            subLinks.map((subLink, index) => (
                                                                <Link to={`${subLink.link}`} key={index}>
                                                                    <p>{subLink.title}</p>
                                                                </Link>
                                                            ))
                                                        ) : (<div></div>)
                                                    }
                                                </div>
                                            </div>
                                        )
                                            : (
                                                <Link to={link?.path}>
                                                    <p className={`${matchRoute(link?.path) ? 'text-yellow-25' : 'text-richblack-25'}`}>
                                                        {link.title}
                                                    </p>
                                                </Link>
                                            )
                                    }
                                </li>
                            ))}

                    </ul>
                </nav>

                {/*login/signup/dashboard/logout */}
                <div className='flex gap-x-4 items-center'>
                    {
                        user && user?.role === "Instructor" && (
                            <Link to="/cart" className='relative'>
                                <AiOutlineShoppingCart className='text-richblack-25' size={25} />
                                {
                                    totalItmes > 0 && (
                                        <span className='absolute top-2 -right-2 bg-yellow-25 text-richblack-900 rounded-full w-5 h-5 flex items-center justify-center text-sm font-medium'>
                                            {totalItmes}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }

                    {
                        token === null && (
                            <Link to="/login">
                                <button className='bg-richblack-800 text-richblack-5 py-2 px-4 rounded-md transition-all duration-200 hover:scale-95 w-fit'>
                                    Login
                                </button>
                            </Link>
                        )
                    }

                    {token === null && (
                        <Link to="/signup">
                            <button className='bg-richblack-800 text-richblack-5 py-2 px-4 rounded-md transition-all duration-200 hover:scale-95 w-fit'>
                                Sign Up
                            </button>
                        </Link>
                    )}
                </div>

                <div>
                    {
                    token !== null && <ProfileDropDown token={token} />
                    }
                </div>
           
            </div>
        </div>
    )
}

export default Navbar;