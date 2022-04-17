import { useEffect } from 'react';

import { VideoContainer } from 'components';
import { VideoCard } from 'components/VideoCard';
import { useLogin } from 'hooks/context/user/userContext';
import { tokenUserLoginModule } from 'hooks/context/user/userContextModule';

export const WatchLater = () => {
  const { loginUser, userDispatch } = useLogin();

  useEffect(() => {
    // this useEffect is being used for cache invalidation on arrival or refresh
    tokenUserLoginModule(userDispatch, loginUser.encodedToken);
  }, []);
  return (
    <div>
      <h1 className=" text-xl px-3 font-bold">Watch Later</h1>
      <VideoContainer>
        {loginUser.watchLater &&
          loginUser.watchLater.length > 0 &&
          loginUser.watchLater.map((video) => (
            <VideoCard video={video} key={video.id} />
          ))}
      </VideoContainer>
    </div>
  );
};
