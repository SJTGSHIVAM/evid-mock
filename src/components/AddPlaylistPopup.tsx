import {
  useCallback,
  useState,
} from 'react';

import { useLogin } from 'hooks/context/user/userContext';
import {
  addlPlaylistVideoModule,
  addPlaylistModule,
  delPlaylistVideoModule,
} from 'hooks/context/user/userContextModule';
import {
  Playlist,
  Video,
} from 'interfaces';
import throttle from 'lodash.throttle';
import { UseUserReducerDispatch } from 'types';
import {
  toastError,
  toastSuccess,
} from 'utils';
import { v4 as uuid } from 'uuid';

export const AddPlaylistPopup = ({
  setIsAddPlaylistPopupVisible,
  video,
  isUlNeeded = true,
}: {
  setIsAddPlaylistPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
  video?: Video;
  isUlNeeded?: boolean;
}) => {
  const [playlistName, setPlaylistName] = useState("");
  const { loginUser, isAuth, userDispatch } = useLogin();
  const isInPlaylist = (playlsit: Playlist, videoId: string) =>
    playlsit.videoList.some((video: Video) => video.id === videoId);

  function handleVideoToPlaylistRaw(
    VideoInPlaylist: boolean,
    userDispatch: UseUserReducerDispatch,
    encodedToken: string,
    video: Video,
    playlistId: string
  ) {
    if (VideoInPlaylist)
      delPlaylistVideoModule(userDispatch, encodedToken, { video, playlistId });
    else {
      addlPlaylistVideoModule(userDispatch, encodedToken, {
        video,
        playlistId,
      });
    }
  }
  const handleVideoToPlaylist = useCallback(
    throttle(handleVideoToPlaylistRaw, 1000),
    []
  );
  function handleAddNewPlaylistRaw(
    userDispatch: UseUserReducerDispatch,
    encodedToken: string,
    video: Video | undefined,
    name: string
  ) {
    if (video)
      addPlaylistModule(userDispatch, encodedToken, {
        id: uuid(),
        name,
        videoList: [video],
      });
    else {
      addPlaylistModule(userDispatch, encodedToken, {
        id: uuid(),
        name,
        videoList: [],
      });
      toastSuccess("Added");
      setIsAddPlaylistPopupVisible(false);
    }
  }
  const handleAddNewPlaylist = useCallback(
    throttle(handleAddNewPlaylistRaw, 1000),
    []
  );
  return (
    <div
      className="w-full h-full fixed inset-0  bg-slate-500/70 grid place-items-center"
      onClick={() => setIsAddPlaylistPopupVisible(false)}
    >
      <div
        className=" border-2 p-4 xs:px-8 rounded-xl bg-lcol fixed grid place-items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <input
            type="text"
            className=" w-36 xs:w-56 bg-lcol border-2 border-gacol rounded-md outline-none px-1  mr-2"
            placeholder="New playlist"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.currentTarget.value)}
          />
          <button
            className="px-2 my-2 border-2 border-gacol rounded-md bg-pcol hover:bg-plcol "
            onClick={() =>
              playlistName.trim() !== ""
                ? handleAddNewPlaylist(
                    userDispatch,
                    loginUser.encodedToken,
                    video,
                    playlistName
                  )
                : toastError("Please add a name for playlist  ")
            }
          >
            Add
          </button>
        </div>
        {isUlNeeded && video && (
          <div className="inline-flex flex-col max-h-60 items-start m-auto overflow-y-auto">
            {loginUser.playlists.map((playlist) => (
              <label key={playlist.id}>
                <input
                  type="checkbox"
                  className="accent-plcol mr-1"
                  checked={isInPlaylist(playlist, video.id)}
                  onClick={() => {
                    handleVideoToPlaylist(
                      isInPlaylist(playlist, video.id),
                      userDispatch,
                      loginUser.encodedToken,
                      video,
                      playlist.id
                    );
                  }}
                />
                {playlist.name}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
