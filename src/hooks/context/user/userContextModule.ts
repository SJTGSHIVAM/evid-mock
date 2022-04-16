import {
  addHistory,
  addLike,
  addPlaylist,
  addPlaylistVideo,
  addWatchLater,
  getUser,
  removeHistory,
  removeLike,
  removePlaylist,
  removePlaylistVideo,
  removeWatchLater,
  userLogin,
} from 'apis';
import { UserActionType } from 'hooks/reducer/user/action-types';
import {
  Playlist,
  UserLoginInputData,
  Video,
} from 'interfaces';
import { UseUserReducerDispatch } from 'types';
import { toastError } from 'utils';

export const tokenUserLoginModule = async (
  dispatch: UseUserReducerDispatch,
  token: string
) => {
  try {
    const payload = await getUser(token);
    dispatch({ type: UserActionType.LOGIN, payload });
    localStorage.setItem("token", payload.encodedToken);
  } catch (error) {
    toastError();
  }
};

export const userLoginModule = async (
  dispatch: UseUserReducerDispatch,
  loginInput: UserLoginInputData
): Promise<boolean> => {
  try {
    const payload = await userLogin(loginInput);
    dispatch({ type: UserActionType.LOGIN, payload });
    localStorage.setItem("token", payload.encodedToken);
    return true;
  } catch (error) {
    toastError("Authentication Error. Please provide correct credentials");
    return false;
  }
};

export const userLogoutModule = async (dispatch: UseUserReducerDispatch) => {
  dispatch({ type: UserActionType.LOGOUT });
  localStorage.removeItem("token");
};

export const addHistoryModule = async (
  dispatch: UseUserReducerDispatch,
  token: string,
  payload: Video
) => {
  dispatch({ type: UserActionType.ADD_HISTORY, payload });
  try {
    await addHistory(payload, token);
  } catch (error) {
    dispatch({ type: UserActionType.DEL_HISTORY, payload: payload.id });
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
    dispatch({ type: UserActionType.DEL_LIKED_VIDEO, payload: payload.id });
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
    dispatch({ type: UserActionType.DEL_WATCH_LATER, payload: payload.id });
    toastError();
  }
};

export const delWatchLaterModule = async (
  dispatch: UseUserReducerDispatch,
  token: string,
  payload: Video
) => {
  dispatch({ type: UserActionType.DEL_WATCH_LATER, payload: payload.id });
  try {
    await removeWatchLater(payload.id, token);
  } catch (error) {
    dispatch({ type: UserActionType.ADD_WATCH_LATER, payload });
    toastError();
  }
};

export const delHistoryModule = async (
  dispatch: UseUserReducerDispatch,
  token: string,
  payload: Video
) => {
  dispatch({ type: UserActionType.DEL_HISTORY, payload: payload.id });
  try {
    await removeHistory(payload.id, token);
  } catch (error) {
    dispatch({ type: UserActionType.ADD_HISTORY, payload });
    toastError();
  }
};

export const delLikedVideoModule = async (
  dispatch: UseUserReducerDispatch,
  token: string,
  payload: Video
) => {
  dispatch({ type: UserActionType.DEL_LIKED_VIDEO, payload: payload.id });
  try {
    await removeLike(payload.id, token);
  } catch (error) {
    dispatch({ type: UserActionType.ADD_LIKED_VIDEO, payload });
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
