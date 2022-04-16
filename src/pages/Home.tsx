import { VideoContainer } from 'components';
import { VideoCard } from 'components/VideoCard';
import { useVideoList } from 'hooks/context/videoContext';

export const Home = () => {
  const { videoList } = useVideoList();
  return (
    <div>
      <VideoContainer>
        {videoList &&
          videoList.length > 0 &&
          videoList.map((video) => <VideoCard video={video} key={video.id} />)}
      </VideoContainer>
    </div>
  );
};
