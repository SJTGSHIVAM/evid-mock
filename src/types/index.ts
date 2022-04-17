import { UserActionType } from 'hooks/reducer/user/action-types';
import {
  Playlist,
  UserLoginData,
  Video,
} from 'interfaces';

export type UserReducerAction =
  | { type: UserActionType.LOGOUT }
  | { type: UserActionType.LOGIN; payload: UserLoginData }
  | { type: UserActionType.ADD_HISTORY; payload: Video }
  | { type: UserActionType.ADD_LIKED_VIDEO; payload: Video }
  | { type: UserActionType.ADD_WATCH_LATER; payload: Video }
  | { type: UserActionType.DEL_WATCH_LATER; payload: string }
  | { type: UserActionType.DEL_LIKED_VIDEO; payload: string }
  | { type: UserActionType.DEL_PLAYLIST; payload: string }
  | {
      type: UserActionType.ADD_PLAYLIST_VIDEO;
      payload: { video: Video; playlistId: string };
    }
  | {
      type: UserActionType.DEL_PLAYLIST_VIDEO;
      payload: { videoId: string; playlistId: string };
    }
  | { type: UserActionType.ADD_PLAYLIST; payload: Playlist }
  | { type: UserActionType.DEL_HISTORY; payload: string }
  | { type: UserActionType.DEL_ALL_HISTORY };

export type UseUserReducerDispatch = React.Dispatch<UserReducerAction>;
