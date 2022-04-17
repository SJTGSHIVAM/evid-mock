import { useCallback } from 'react';

import { useLogin } from 'hooks/context/user/userContext';
import {
  addLikedVideoModule,
  addWatchLaterModule,
  delLikedVideoModule,
  delWatchLaterModule,
} from 'hooks/context/user/userContextModule';
import {
  UserLoginData,
  Video,
} from 'interfaces';
import throttle from 'lodash.throttle';
import {
  FcLike,
  FcLikePlaceholder,
} from 'react-icons/fc';
import { IoIosEye } from 'react-icons/io';
import {
  MdOutlineWatchLater,
  MdWatchLater,
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { UseUserReducerDispatch } from 'types';
import { toastError } from 'utils';

export const VideoCard = ({
  video,
  children,
}: {
  video: Video;
  children?: React.ReactNode;
}) => {
  const { id, img, title, avatar, creator, views, likes } = video;
  const { loginUser, isAuth, userDispatch } = useLogin();
  const navigate = useNavigate();
  const isVideoLiked = (loginUser: UserLoginData, videoId: string) =>
    loginUser.likes.some((video: Video) => video.id === videoId);
  const isinWatchLater = (loginUser: UserLoginData, videoId: string) =>
    loginUser.watchLater.some((video: Video) => video.id === videoId);
  function handleLikeRaw(
    liked: boolean,
    userDispatch: UseUserReducerDispatch,
    encodedToken: string,
    video: Video
  ) {
    if (liked) delLikedVideoModule(userDispatch, encodedToken, video);
    else addLikedVideoModule(userDispatch, encodedToken, video);
  }
  const handleLike = useCallback(throttle(handleLikeRaw, 1000), []);

  function handleWatchLaterRaw(
    watchLater: boolean,
    userDispatch: UseUserReducerDispatch,
    encodedToken: string,
    video: Video
  ) {
    if (watchLater) delWatchLaterModule(userDispatch, encodedToken, video);
    else addWatchLaterModule(userDispatch, encodedToken, video);
  }
  const handleWatchLater = useCallback(throttle(handleWatchLaterRaw, 1000), []);

  return (
    <div
      className="border-2 border-gacol p-1 xs:p-2 m-2 xs:m-4 w-max rounded-md cursor-pointer"
      onClick={() => navigate(`/video/${id}`)}
    >
      <div className="w-44 h-44 flex flex-col justify-between xs:h-52 xs:w-56 md:h-56 md:w-80 ">
        <img
          src={img}
          alt="video image"
          className=" h-20 xs:h-28 md:h-36 w-full "
        />
        <div className="flex flex-col m-1">
          <p className=" text-sm self-start">
            {title.length > 30 ? `${title.slice(0, 30)}...` : title}
          </p>
          <div className="flex gap-2 md:gap-3 self-end">
            <span className="flex flex-row items-center gap-0.5 text-sm ml-auto">
              <IoIosEye />
              {views}
            </span>
            <span
              className="flex flex-row items-center gap-0.5 text-sm"
              onClick={(e) => {
                e.stopPropagation();

                if (isAuth()) {
                  handleLike(
                    isVideoLiked(loginUser, video.id),
                    userDispatch,
                    loginUser.encodedToken,
                    video
                  );
                } else {
                  navigate("/user/login");
                  toastError("Please login first");
                }
              }}
            >
              {isVideoLiked(loginUser, video.id) ? (
                <FcLike />
              ) : (
                <FcLikePlaceholder />
              )}
              {likes}
            </span>
            <span
              className="flex flex-row items-center gap-0.5 text-sm"
              onClick={(e) => {
                e.stopPropagation();
                if (isAuth()) {
                  handleWatchLater(
                    isinWatchLater(loginUser, video.id),
                    userDispatch,
                    loginUser.encodedToken,
                    video
                  );
                } else {
                  navigate("/user/login");
                  toastError("Please login first");
                }
              }}
            >
              {isinWatchLater(loginUser, video.id) ? (
                <MdWatchLater />
              ) : (
                <MdOutlineWatchLater />
              )}
            </span>
            {children}
          </div>
          <span className="flex flex-row items-center gap-1 ">
            <img src={avatar} alt="" className="h-5 xs:h-6 rounded-2xl" />
            <p className="text-xs">
              {creator.length > 20 ? `${creator.slice(0, 20)}...` : creator}
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};
