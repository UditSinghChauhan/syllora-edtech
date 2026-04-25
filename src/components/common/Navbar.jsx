import { useEffect, useRef, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { AiOutlineClose } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiconnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropDown"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false)

  const drawerRef = useRef(null)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
      } catch (error) {
        console.error("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  // Close drawer on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setMobileOpen(false)
      }
    }
    if (mobileOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [mobileOpen])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>

        {/* Desktop Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
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
                          <>
                            {subLinks
                              ?.filter(
                                (subLink) => subLink?.courses?.length > 0
                              )
                              ?.map((subLink, i) => (
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
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
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

        {/* Desktop Login / Signup / Dashboard */}
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

        {/* Hamburger button — mobile only */}
        <button
          className="mr-4 md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>

      {/* ── Mobile Drawer ── */}
      {/* Backdrop */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[998] bg-black/50 md:hidden" />
      )}

      {/* Slide-in panel */}
      <div
        ref={drawerRef}
        className={`fixed right-0 top-0 z-[999] h-full w-72 bg-richblack-800 shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-richblack-700 px-5 py-4">
          <Link to="/" onClick={() => setMobileOpen(false)}>
            <img src={logo} alt="Logo" width={120} height={28} loading="lazy" />
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="text-richblack-25"
          >
            <AiOutlineClose fontSize={22} />
          </button>
        </div>

        {/* Drawer nav links */}
        <ul className="mt-4 flex flex-col gap-1 px-4 text-richblack-25">
          {NavbarLinks.map((link, index) => (
            <li key={index}>
              {link.title === "Catalog" ? (
                <div>
                  <button
                    className={`flex w-full items-center justify-between rounded-md px-4 py-3 text-left font-medium transition-colors hover:bg-richblack-700 ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                    onClick={() => setMobileCatalogOpen((prev) => !prev)}
                  >
                    <span>{link.title}</span>
                    <BsChevronDown
                      className={`transition-transform duration-200 ${
                        mobileCatalogOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Catalog sub-links */}
                  {mobileCatalogOpen && (
                    <ul className="ml-4 mt-1 flex flex-col gap-1 border-l border-richblack-600 pl-3">
                      {loading ? (
                        <li className="py-2 text-sm text-richblack-300">
                          Loading...
                        </li>
                      ) : subLinks && subLinks.length ? (
                        subLinks
                          .filter((s) => s?.courses?.length > 0)
                          .map((subLink, i) => (
                            <li key={i}>
                              <Link
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="block rounded-md px-3 py-2 text-sm text-richblack-100 hover:bg-richblack-700"
                                onClick={() => setMobileOpen(false)}
                              >
                                {subLink.name}
                              </Link>
                            </li>
                          ))
                      ) : (
                        <li className="py-2 text-sm text-richblack-300">
                          No Courses Found
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  to={link?.path}
                  className={`block rounded-md px-4 py-3 font-medium transition-colors hover:bg-richblack-700 ${
                    matchRoute(link?.path)
                      ? "text-yellow-25"
                      : "text-richblack-25"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.title}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Drawer auth section */}
        <div className="absolute bottom-0 left-0 w-full border-t border-richblack-700 px-5 py-5">
          {token === null ? (
            <div className="flex flex-col gap-3">
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                <button className="w-full rounded-[8px] border border-richblack-700 bg-richblack-900 py-[10px] text-richblack-100">
                  Log in
                </button>
              </Link>
              <Link to="/signup" onClick={() => setMobileOpen(false)}>
                <button className="w-full rounded-[8px] border border-richblack-700 bg-yellow-50 py-[10px] font-semibold text-richblack-900">
                  Sign up
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                <Link
                  to="/dashboard/cart"
                  className="relative"
                  onClick={() => setMobileOpen(false)}
                >
                  <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                  {totalItems > 0 && (
                    <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                      {totalItems}
                    </span>
                  )}
                </Link>
              )}
              <ProfileDropdown />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar