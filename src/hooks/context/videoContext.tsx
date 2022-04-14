import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { getVideos } from 'apis';
import { Video } from 'interfaces';
import { toastError } from 'utils';

const VideoContext = createContext<{
  videoList: Array<Video>;
  searchVideoList: (searchTerm: string) => void;
  setVideoList: React.Dispatch<React.SetStateAction<Video[]>> | (() => null);
}>({
  videoList: [],
  setVideoList: () => {},
  searchVideoList: (searchTerm: string) => {},
});

export function VideoProvider({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) {
  const [videoList, setVideoList] = useState<Array<Video>>([]);

  const getInitialVideoList = async () => {
    try {
      const response = await getVideos();
      return response.data;
    } catch (err) {
      toastError("Some error in fetching videos");
      return [];
    }
  };
  const searchVideoList = (searchTerm: string) => {
    searchTerm = searchTerm.trim();
    const searchedVideos = videoList.filter(
      (video) =>
        video.about.includes(searchTerm) ||
        video.creator.includes(searchTerm) ||
        video.tags.includes(searchTerm) ||
        video.title.includes(searchTerm)
    );
    setVideoList(searchedVideos);
  };

  useEffect(() => {
    (async () => {
      const initialVideoList = await getInitialVideoList();
      setVideoList(initialVideoList);
    })();
  }, []);

  return (
    <VideoContext.Provider value={{ videoList, setVideoList, searchVideoList }}>
      {children}
    </VideoContext.Provider>
  );
}

export const useVideoList = () => useContext(VideoContext);
