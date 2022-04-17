import {
  useCallback,
  useEffect,
} from 'react';

import { VideoContainer } from 'components';
import { VideoCard } from 'components/VideoCard';
import { useLogin } from 'hooks/context/user/userContext';
import {
  addHistoryModule,
  delAllHistoryModule,
  delHistoryModule,
  tokenUserLoginModule,
} from 'hooks/context/user/userContextModule';
import {
  UserLoginData,
  Video,
} from 'interfaces';
import throttle from 'lodash.throttle';
import { IoMdTrash } from 'react-icons/io';
import { UseUserReducerDispatch } from 'types';

export const History = () => {
  const { loginUser, userDispatch } = useLogin();
  const isinHistory = (loginUser: UserLoginData, videoId: string) =>
    loginUser.history.some((video: Video) => video.id === videoId);

  function handleHistoryRaw(
    watchLater: boolean,
    userDispatch: UseUserReducerDispatch,
    encodedToken: string,
    video: Video
  ) {
    if (watchLater) delHistoryModule(userDispatch, encodedToken, video);
    else addHistoryModule(userDispatch, encodedToken, video);
  }
  const handleHistory = useCallback(throttle(handleHistoryRaw, 1000), []);

  useEffect(() => {
    // this useEffect is being used for cache invalidation on arrival or refresh
    tokenUserLoginModule(userDispatch, loginUser.encodedToken);
  }, []);
  return (
    <div>
      <h1 className=" text-xl px-3 font-bold">History</h1>
      <button
        className="w-max m-3 border-2 border-gacol px-2 rounded-xl hover:scale-105 ease-in-out duration-75 hover:bg-rcol"
        onClick={(e) => {
          e.stopPropagation();
          delAllHistoryModule(userDispatch, loginUser.encodedToken);
        }}
      >
        {" "}
        Clear All History
      </button>
      <VideoContainer>
        {loginUser.history &&
          loginUser.history.length > 0 &&
          loginUser.history.map((video) => (
            <VideoCard video={video} key={video.id}>
              <span
                className="flex flex-row items-center gap-0.5 "
                onClick={(e) => {
                  e.stopPropagation();

                  handleHistory(
                    isinHistory(loginUser, video.id),
                    userDispatch,
                    loginUser.encodedToken,
                    video
                  );
                }}
              >
                {isinHistory(loginUser, video.id) && <IoMdTrash />}
              </span>
            </VideoCard>
          ))}
      </VideoContainer>
    </div>
  );
};
