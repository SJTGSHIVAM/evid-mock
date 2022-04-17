import {
  createContext,
  useContext,
  useEffect,
} from 'react';

import { useUserReducer } from 'hooks/reducer/user/reducer';
import { UserLoginData } from 'interfaces';
import { UseUserReducerDispatch } from 'types';

import { tokenUserLoginModule } from './userContextModule';

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
  userDispatch: (() => null) | UseUserReducerDispatch;
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

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) tokenUserLoginModule(userDispatch, savedToken);
  }, []);
  return (
    <UserContext.Provider value={{ loginUser: user, userDispatch, isAuth }}>
      {children}
    </UserContext.Provider>
  );
};
