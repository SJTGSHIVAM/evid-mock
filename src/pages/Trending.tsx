import { VideoContainer } from 'components';
import { VideoCard } from 'components/VideoCard';
import { useVideoList } from 'hooks/context/videoContext';

export const Trending = () => {
  const { videoList } = useVideoList();
  return (
    <div>
      <h1 className=" text-xl px-3 font-bold">Trending</h1>
      <VideoContainer>
        {videoList &&
          videoList.length > 0 &&
          videoList
            .filter((video) => video.tags.includes("trending"))
            .map((video) => <VideoCard video={video} key={video.id} />)}
      </VideoContainer>
    </div>
  );
};
