import { useCallback } from 'react';

import { VideoTile } from 'components/VideoTile';
import { useLogin } from 'hooks/context/user/userContext';
import {
  delPlaylistModule,
  delPlaylistVideoModule,
} from 'hooks/context/user/userContextModule';
import {
  Playlist,
  Video,
} from 'interfaces';
import throttle from 'lodash.throttle';
import {
  IoMdLink,
  IoMdTrash,
} from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { UseUserReducerDispatch } from 'types';

export const Playlists = () => {
  const { loginUser, userDispatch } = useLogin();
  const navigate = useNavigate();
  function handleDelPlayVidRaw(
    userDispatch: UseUserReducerDispatch,
    encodedToken: string,
    payload: { video: Video; playlistId: string }
  ) {
    delPlaylistVideoModule(userDispatch, encodedToken, payload);
  }

  function handleDelPlayRaw(
    userDispatch: UseUserReducerDispatch,
    encodedToken: string,
    payload: Playlist
  ) {
    delPlaylistModule(userDispatch, encodedToken, payload);
  }

  const handleDelPlaylistVideo = useCallback(
    throttle(handleDelPlayVidRaw, 1000),
    []
  );

  const handleDelPlaylist = useCallback(throttle(handleDelPlayRaw, 1000), []);
  return (
    <div className="flex flex-col w-full h-full">
      {loginUser.playlists.map((playlist) => (
        <div
          className="border-y-2 rounded-md p-1 xs:px-4 xs:pb-4 xs:pt-2 xs:w-[95%] xs:m-5 m-auto"
          key={playlist.id}
        >
          <p className="text-lg font-mmedium pb-2"># {playlist.name}</p>

          <div className="flex flex-row flex-wrap gap-4">
            {playlist.videoList.map((video) => (
              <VideoTile video={video}>
                <button
                  className="place-self-end pb-1 pr-1 hover:scale-105 mr-0 ml-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelPlaylistVideo(
                      userDispatch,
                      loginUser.encodedToken,
                      { video, playlistId: playlist.id }
                    );
                  }}
                >
                  <IoMdTrash />
                </button>
              </VideoTile>
            ))}
          </div>
          <div className="flex justify-between gap-1">
            <button
              className="flex flex-row items-center gap-1 border-2 border-gacol px-2 rounded-xl hover:scale-105 ease-in-out duration-75 hover:bg-pcol  mt-4"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/user/playlist/${playlist.id}`);
              }}
            >
              <IoMdLink /> Go To Playlist
            </button>
            <button
              className="flex flex-row items-center gap-1 border-2 border-gacol px-2 rounded-xl hover:scale-105 ease-in-out duration-75 hover:bg-rcol mt-4"
              onClick={(e) => {
                e.stopPropagation();
                handleDelPlaylist(
                  userDispatch,
                  loginUser.encodedToken,
                  playlist
                );
              }}
            >
              <IoMdTrash /> Delete Playlist
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
