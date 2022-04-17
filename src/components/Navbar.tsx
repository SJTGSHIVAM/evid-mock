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
    <nav className="bg-gacol p-4 px-1 xs:px-4 text-wcol flex items-baseline">
      <div className=" cursor-pointer text-wcol mx-2 flex text-center font-bold xs:text-2xl text-xl ">
        Evid
      </div>
      <div className="mr-auto">
        {" "}
        {isAuth() && (
          <Link to="user/profile">
            <div className="rounded-full bg-lcol cursor-pointer text-dcol w-[3ex] text-center font-bold xs:text-lg">
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

        {pathname !== "/user/login" &&
          (isAuth() ? (
            <button
              className="flex flex-row gap-2 border-2 ml-2 text-sm xs:text-base border-pcol px-2 xs:px-4 rounded-xl hover:scale-105 ease-in-out hover:bg-bcol"
              onClick={() => {
                userLogoutModule(userDispatch);
              }}
            >
              Logout
            </button>
          ) : (
            <button
              className="flex flex-row gap-2 border-2 ml-2 text-sm xs:text-base border-pcol px-2 xs:px-4 rounded-xl hover:scale-105 ease-in-out hover:bg-bcol"
              onClick={() => {
                navigate("user/login");
              }}
            >
              Login
            </button>
          ))}
      </div>
    </nav>
  );
};
