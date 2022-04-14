import {
  createContext,
  useContext,
} from 'react';

import { useUserReducer } from 'hooks/reducer/user/reducer';
import { UserActionType } from 'hooks/reducer/user/types';
import {
  Playlist,
  UserLoginData,
  Video,
} from 'interfaces';

const initialUser: UserLoginData = {
  id: "",
  fname: "",
  lname: "",
  username: "",
  dob: "",
  contact: NaN,
  email: "",
  likes: [],
  watchLater: [],
  history: [],
  playlists: [],
  createdAt: "",
  updatedAt: "",
  encodedToken: "",
};
const UserContext = createContext<{
  loginUser: UserLoginData;
  userDispatch:
    | (() => null)
    | React.Dispatch<
        | { type: UserActionType.LOGOUT }
        | { type: UserActionType.LOGIN; payload: UserLoginData }
        | { type: UserActionType.ADD_HISTORY; payload: Video }
        | { type: UserActionType.ADD_LIKED_VIDEO; payload: Video }
        | { type: UserActionType.ADD_WATCH_LATER; payload: Video }
        | { type: UserActionType.DEL_WATCH_LATER; payload: string }
        | { type: UserActionType.DEL_LIKED_VIDEO; payload: string }
        | { type: UserActionType.SET_HISTORY; payload: Array<Video> }
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
      >;
  isAuth: () => boolean;
}>({
  loginUser: initialUser,
  userDispatch: () => {},
  isAuth: () => false,
});
export const useLogin = () => useContext(UserContext);

export const UserProvider = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) => {
  const { user, userDispatch } = useUserReducer(initialUser);
  const isAuth = () => {
    return !(user.username === "" || user.username === undefined);
  };
  return (
    <UserContext.Provider value={{ loginUser: user, userDispatch, isAuth }}>
      {children}
    </UserContext.Provider>
  );
};
