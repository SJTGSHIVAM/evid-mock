import { useState } from 'react';

import {
  BsFillMoonStarsFill,
  BsSunFill,
} from 'react-icons/bs';
import {
  Link,
  useLocation,
} from 'react-router-dom';
import { toastError } from 'utils';

export const Navbar = () => {
  const [theme, setTheme] = useState("dark");
  const [searchVideo, setSearchVideo] = useState("");
  const { pathname } = useLocation();
  return (
    <nav className="bg-gacol p-4 text-wcol flex">
      <div className="mr-auto">
        {" "}
        <Link to="profile">
          <div className="rounded-full bg-lcol cursor-pointer text-dcol w-[2.7ex] text-center font-bold ">
            S
          </div>
        </Link>
      </div>
      <div className="mx-auto flex justify-center">
        <input
          type="text"
          className=" w-3/4 bg-lcol border-2 border-gacol rounded-md outline-none px-1"
          value={searchVideo}
          onChange={(e) => {
            setSearchVideo(e.currentTarget.value);
          }}
          placeholder="Search"
        />{" "}
      </div>
      <div className="flex gap-1 ml-auto">
        <button
          onClick={() => {
            document.body.classList.toggle("theme_light");
            setTheme((p) => (p === "light" ? "dark" : "light"));
          }}
        >
          {theme === "dark" ? <BsSunFill /> : <BsFillMoonStarsFill />}
        </button>

        {pathname !== "/login" && (
          <Link to="login">
            {" "}
            <button
              onClick={() => {
                toastError();
              }}
            >
              Login
            </button>
          </Link>
        )}
        {/* <FcLikePlaceholder /> */}
      </div>
    </nav>
  );
};
