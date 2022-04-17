import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import { VideoContainer } from 'components';
import { VideoCard } from 'components/VideoCard';
import { useLogin } from 'hooks/context/user/userContext';
import { delPlaylistVideoModule } from 'hooks/context/user/userContextModule';
import {
  Playlist,
  Video,
} from 'interfaces';
import throttle from 'lodash.throttle';
import { IoMdTrash } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import { UseUserReducerDispatch } from 'types';

export const PlaylistPage = () => {
  const { playlistId } = useParams();
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist>();

  const { loginUser, userDispatch } = useLogin();
  useEffect(() => {
    const foundPlaylist = loginUser.playlists.find(
      (playlist) => playlist.id === playlistId
    );
    if (foundPlaylist) {
      setCurrentPlaylist({ ...foundPlaylist });
    }
  }, [playlistId, loginUser]);

  function handleDelPlayVidRaw(
    userDispatch: UseUserReducerDispatch,
    encodedToken: string,
    payload: { video: Video; playlistId: string }
  ) {
    delPlaylistVideoModule(userDispatch, encodedToken, payload);
  }

  const handleDelPlaylistVideo = useCallback(
    throttle(handleDelPlayVidRaw, 1000),
    []
  );
  return (
    <div>
      <h1 className=" text-xl px-3 font-bold">
        Playlist: {currentPlaylist?.name}
      </h1>
      <VideoContainer>
        {playlistId && currentPlaylist
          ? currentPlaylist.videoList.length > 0
            ? currentPlaylist.videoList.map((video) => (
                <VideoCard video={video} key={video.id}>
                  <span
                    className="flex flex-row items-center gap-0.5 "
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelPlaylistVideo(
                        userDispatch,
                        loginUser.encodedToken,
                        { video, playlistId: currentPlaylist.id }
                      );
                    }}
                  >
                    <IoMdTrash />
                  </span>
                </VideoCard>
              ))
            : "No Video in this Play list"
          : "This playlist do not exist"}
      </VideoContainer>
    </div>
  );
};
