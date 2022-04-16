import { useEffect } from 'react';

import { VideoContainer } from 'components';
import { VideoCard } from 'components/VideoCard';
import { useLogin } from 'hooks/context/user/userContext';
import { tokenUserLoginModule } from 'hooks/context/user/userContextModule';

export const History = () => {
  const { loginUser, userDispatch } = useLogin();

  useEffect(() => {
    // this useEffect is being used for cache invalidation on arrival or refresh
    tokenUserLoginModule(userDispatch, loginUser.encodedToken);
  }, []);
  return (
    <div>
      <VideoContainer>
        {loginUser.history &&
          loginUser.history.length > 0 &&
          loginUser.history.map((video) => (
            <VideoCard video={video} key={video.id} />
          ))}
      </VideoContainer>
    </div>
  );
};
