import { useEffect } from 'react';

import { VideoContainer } from 'components';
import { VideoCard } from 'components/VideoCard';
import { useLogin } from 'hooks/context/user/userContext';
import { tokenUserLoginModule } from 'hooks/context/user/userContextModule';

export const Liked = () => {
  const { loginUser, userDispatch } = useLogin();

  useEffect(() => {
    // this useEffect is being used for cache invalidation on arrival or refresh
    tokenUserLoginModule(userDispatch, loginUser.encodedToken);
  }, []);
  return (
    <div>
      <h1 className=" text-xl px-3 font-bold">Liked Videos</h1>
      <VideoContainer>
        {loginUser.likes && loginUser.likes.length > 0 ? (
          loginUser.likes.map((video) => (
            <VideoCard video={video} key={video.id} />
          ))
        ) : (
          <div className="mx-auto"> "You have not liked any video yet."</div>
        )}
      </VideoContainer>
    </div>
  );
};
