import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { getVideos } from 'apis';
import { Video } from 'interfaces';
import debounce from 'lodash.debounce';
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
  const [globalVideoList, setGlobalVideoList] = useState<Array<Video>>([]);
  const [videoList, setVideoList] = useState<Array<Video>>([]);

  const getInitialVideoList = async (): Promise<Array<Video>> => {
    try {
      const response = await getVideos();
      return response.data.videos;
    } catch (err) {
      toastError("Some error in fetching videos");
      return [];
    }
  };
  const searchVideoListRaw = (videoList: Array<Video>, searchTerm: string) => {
    searchTerm = searchTerm.toLowerCase().trim();

    const searchedVideos = videoList.filter(
      (video) =>
        video.about.toLowerCase().includes(searchTerm) ||
        video.creator.toLowerCase().includes(searchTerm) ||
        video.tags.includes(searchTerm) ||
        video.title.toLowerCase().includes(searchTerm) ||
        searchTerm === ""
    );
    setVideoList(searchedVideos);
  };
  const searchVideoListNoCurry = useCallback(
    debounce(searchVideoListRaw, 350),
    []
  );

  const searchVideoList = (searchTerm: string) =>
    searchVideoListNoCurry(globalVideoList, searchTerm);

  useEffect(() => {
    (async () => {
      const initialVideoList = await getInitialVideoList();
      setGlobalVideoList(initialVideoList);
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
