import {
  useEffect,
  useState,
} from 'react';

import { useVideoList } from 'hooks/context/videoContext';
import { Video } from 'interfaces';
import { CgPlayList } from 'react-icons/cg';
import { FcLikePlaceholder } from 'react-icons/fc';
import { IoIosEye } from 'react-icons/io';
import { MdOutlineWatchLater } from 'react-icons/md';
import { useParams } from 'react-router-dom';

export const SingleVideo = () => {
  const { videoList } = useVideoList();
  const [currentVideo, setCurrentVideo] = useState<Video>();
  const { videoId } = useParams();
  useEffect(() => {
    const foundVideo = videoList.find((video) => video.id === videoId);
    if (foundVideo) setCurrentVideo({ ...foundVideo });
  }, [videoList]);
  return (
    <>
      {videoList.length > 0 ? (
        currentVideo && (
          <div className="w-full h-full grid">
            <div className="flex flex-col w-[95%] mx-auto p-2">
              <iframe
                className="w-full sm:h-3/5 md:h-4/5"
                src={`https://www.youtube.com/embed/${currentVideo.id}`}
                title="YouTube video player"
                // frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                // allowfullscreen
              ></iframe>
              <p className="text-xl font-medium">{currentVideo.title}</p>

              <div className="flex flex-col md:flex-row">
                <div className="flex flex-row items-center text-sm ">
                  <span className="flex flex-row items-center gap-0.5">
                    <IoIosEye />
                    {currentVideo.views}
                  </span>
                  , {currentVideo.uploadedOn}
                </div>
                <div className="flex flex-row gap-4 ml-auto mt-2">
                  <button className="flex flex-row gap-2 border-2 border-gacol p-1 sm:px-2 rounded-xl hover:scale-105 ease-in-out hover:bg-pcol">
                    <div className="self-center">
                      <FcLikePlaceholder />
                    </div>
                    <p className="hidden sm:inline  self-center">
                      {" "}
                      {currentVideo.likes}
                    </p>
                  </button>
                  <button className="flex flex-row gap-2 border-2 border-gacol sm:px-2 rounded-xl hover:scale-105 ease-in-out hover:bg-pcol">
                    <div className="self-center">
                      <MdOutlineWatchLater />
                    </div>
                    <p className="hidden sm:inline  self-center">
                      {" "}
                      Watch Later
                    </p>
                  </button>
                  <button className="flex flex-row gap-2 border-2 border-gacol sm:px-2 rounded-xl hover:scale-105 ease-in-out hover:bg-pcol">
                    <div className="self-center text-xl">
                      <CgPlayList />
                    </div>
                    <p className="hidden sm:inline self-center">
                      {" "}
                      Add to Playlist
                    </p>{" "}
                  </button>
                </div>
              </div>

              <div className="flex flex-row items-center gap-2 mt-4 mb-2">
                <img
                  src={currentVideo.avatar}
                  alt="creator avatar"
                  className="rounded-3xl h-9 sm:h-12"
                />
                <p>{currentVideo.creator}</p>
              </div>
              <p className="text-sm xs:text-base">{currentVideo.about}</p>
            </div>
          </div>
        )
      ) : (
        <> Loading</>
      )}
    </>
  );
};
