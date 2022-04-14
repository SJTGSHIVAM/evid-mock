import {
  addHistory,
  addLike,
  addPlaylist,
  addPlaylistVideo,
  addWatchLater,
  removeHistory,
  removeLike,
  removePlaylist,
  removePlaylistVideo,
  removeWatchLater,
} from 'apis';
import { UserActionType } from 'hooks/reducer/user/action-types';
import {
  Playlist,
  Video,
} from 'interfaces';
import { UseUserReducerDispatch } from 'types';
import { toastError } from 'utils';

export const addHistoryModule = async (
  dispatch: UseUserReducerDispatch,
  token: string,
  payload: Video
) => {
  dispatch({ type: UserActionType.ADD_HISTORY, payload });
  try {
    await addHistory(payload, token);
  } catch (error) {
    dispatch({ type: UserActionType.ADD_HISTORY, payload });
    toastError();
  }
};

export const addLikedVideoModule = async (
  dispatch: UseUserReducerDispatch,
  token: string,
  payload: Video
) => {
  dispatch({ type: UserActionType.ADD_LIKED_VIDEO, payload });
  try {
    await addLike(payload, token);
  } catch (error) {
    dispatch({ type: UserActionType.ADD_LIKED_VIDEO, payload });
    toastError();
  }
};

export const addWatchLaterModule = async (
  dispatch: UseUserReducerDispatch,
  token: string,
  payload: Video
) => {
  dispatch({ type: UserActionType.ADD_WATCH_LATER, payload });
  try {
    await addWatchLater(payload, token);
  } catch (error) {
    dispatch({ type: UserActionType.ADD_WATCH_LATER, payload });
    toastError();
  }
};

export const delWatchLaterModule = async (
  dispatch: UseUserReducerDispatch,
  token: string,
  payload: string
) => {
  dispatch({ type: UserActionType.DEL_WATCH_LATER, payload });
  try {
    await removeWatchLater(payload, token);
  } catch (error) {
    dispatch({ type: UserActionType.DEL_WATCH_LATER, payload });
    toastError();
  }
};

export const delHistoryModule = async (
  dispatch: UseUserReducerDispatch,
  token: string,
  payload: string
) => {
  dispatch({ type: UserActionType.DEL_HISTORY, payload });
  try {
    await removeHistory(payload, token);
  } catch (error) {
    dispatch({ type: UserActionType.DEL_HISTORY, payload });
    toastError();
  }
};

export const delLikedVideoModule = async (
  dispatch: UseUserReducerDispatch,
  token: string,
  payload: string
) => {
  dispatch({ type: UserActionType.DEL_LIKED_VIDEO, payload });
  try {
    await removeLike(payload, token);
  } catch (error) {
    dispatch({ type: UserActionType.DEL_LIKED_VIDEO, payload });
    toastError();
  }
};

export const delPlaylistModule = async (
  dispatch: UseUserReducerDispatch,
  token: string,
  payload: string
) => {
  dispatch({ type: UserActionType.DEL_PLAYLIST, payload });
  try {
    await removePlaylist(payload, token);
  } catch (error) {
    dispatch({ type: UserActionType.DEL_PLAYLIST, payload });
    toastError();
  }
};

export const addPlaylistModule = async (
  dispatch: UseUserReducerDispatch,
  token: string,
  payload: Playlist
) => {
  dispatch({ type: UserActionType.ADD_PLAYLIST, payload });
  try {
    await addPlaylist(payload, token);
  } catch (error) {
    dispatch({ type: UserActionType.ADD_PLAYLIST, payload });
    toastError();
  }
};

export const addlPlaylistVideoModule = async (
  dispatch: UseUserReducerDispatch,
  token: string,
  payload: { video: Video; playlistId: string }
) => {
  dispatch({ type: UserActionType.ADD_PLAYLIST_VIDEO, payload });
  try {
    await addPlaylistVideo(payload, token);
  } catch (error) {
    dispatch({ type: UserActionType.ADD_PLAYLIST_VIDEO, payload });
    toastError();
  }
};

export const delPlaylistVideoModule = async (
  dispatch: UseUserReducerDispatch,
  token: string,
  payload: { videoId: string; playlistId: string }
) => {
  dispatch({ type: UserActionType.DEL_PLAYLIST_VIDEO, payload });
  try {
    await removePlaylistVideo(payload, token);
  } catch (error) {
    dispatch({ type: UserActionType.DEL_PLAYLIST_VIDEO, payload });
    toastError();
  }
};
