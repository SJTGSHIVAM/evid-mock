import {
  useCallback,
  useState,
} from 'react';

import {
  AddPlaylistPopup,
  VideoContainer,
} from 'components';
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
  const [isAddPlaylistPopupVisible, setIsAddPlaylistPopupVisible] =
    useState(false);
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
    <div className="flex flex-col w-full h-full ">
      <h1 className=" text-xl px-3 font-bold">Playlists</h1>
      {isAddPlaylistPopupVisible && (
        <AddPlaylistPopup
          setIsAddPlaylistPopupVisible={setIsAddPlaylistPopupVisible}
          isUlNeeded={false}
        />
      )}
      <button
        className="w-max m-3 border-2 border-gacol px-2 rounded-xl hover:scale-105 ease-in-out duration-75 hover:bg-pcol"
        onClick={(e) => {
          e.stopPropagation();
          setIsAddPlaylistPopupVisible(true);
        }}
      >
        Add Playlist
      </button>
      {loginUser.playlists.length > 0 ? (
        loginUser.playlists.map((playlist) => (
          <div
            className="border-y-2 rounded-md p-1 xs:px-4 xs:pb-4 xs:pt-2 xs:w-[95%] xs:m-5 m-auto"
            key={playlist.id}
          >
            <p className="text-lg font-medium pb-2"># {playlist.name}</p>
            <p className="text-sm font-medium pb-2">
              Total videos: {playlist.videoList.length}
            </p>

            <VideoContainer>
              {playlist.videoList.slice(0, 6).map((video) => (
                <VideoTile video={video} key={video.id}>
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
            </VideoContainer>
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
        ))
      ) : (
        <div className="mx-auto">"There is no custom playlist to display."</div>
      )}
    </div>
  );
};
