import { useState } from 'react';

import { useLogin } from 'hooks/context/user/userContext';
import { userLogoutModule } from 'hooks/context/user/userContextModule';
import { useVideoList } from 'hooks/context/videoContext';
import {
  BsFillMoonStarsFill,
  BsSunFill,
} from 'react-icons/bs';
import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';

export const Navbar = () => {
  const { searchVideoList } = useVideoList();
  const [theme, setTheme] = useState("dark");
  const [searchVideo, setSearchVideo] = useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  function handleSearchVideo(searchVideo: string) {
    if (pathname !== "/") navigate("/");
    searchVideoList(searchVideo);
  }
  const { loginUser, userDispatch, isAuth } = useLogin();
  return (
    <nav className="bg-gacol p-4 text-wcol flex">
      <div className="mr-auto">
        {" "}
        {isAuth() && (
          <Link to="profile">
            <div className="rounded-full bg-lcol cursor-pointer text-dcol w-[2.7ex] text-center font-bold ">
              {loginUser.fname[0].toUpperCase()}
            </div>
          </Link>
        )}
      </div>
      <div className="mx-auto flex justify-center">
        <input
          type="text"
          className=" w-3/4 bg-lcol border-2 border-gacol rounded-md outline-none px-1"
          value={searchVideo}
          onChange={(e) => {
            setSearchVideo(e.currentTarget.value);
            handleSearchVideo(searchVideo);
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

        {pathname !== "/login" && isAuth() ? (
          <button
            onClick={() => {
              userLogoutModule(userDispatch);
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="login"> Login</Link>
        )}
        {/* <FcLikePlaceholder /> */}
      </div>
    </nav>
  );
};
