import { useReducer } from 'react';

import { UserLoginData } from 'interfaces';
import { UserReducerAction } from 'types';

import { UserActionType } from './action-types';

export const useUserReducer = (initialUser: UserLoginData) => {
  const reducerUser = (
    state: UserLoginData,
    action: UserReducerAction
  ): UserLoginData => {
    switch (action.type) {
      case UserActionType.LOGIN:
        return action.payload;

      case UserActionType.LOGOUT:
        return initialUser;

      case UserActionType.ADD_HISTORY:
        return {
          ...state,
          history: [...state.history, action.payload],
        };

      case UserActionType.DEL_HISTORY:
        const newHistory = state.history.filter(
          (video) => video.id !== action.payload
        );
        return { ...state, history: newHistory };

      case UserActionType.ADD_LIKED_VIDEO:
        return {
          ...state,
          likes: [...state.likes, action.payload],
        };

      case UserActionType.DEL_LIKED_VIDEO:
        const newLikes = state.likes.filter(
          (video) => video.id !== action.payload
        );
        return { ...state, likes: newLikes };

      case UserActionType.ADD_WATCH_LATER:
        return {
          ...state,

          watchLater: [...state.watchLater, action.payload],
        };

      case UserActionType.DEL_WATCH_LATER:
        const newWatchLater = state.watchLater.filter(
          (video) => video.id !== action.payload
        );
        return { ...state, watchLater: newWatchLater };

      case UserActionType.ADD_PLAYLIST:
        return {
          ...state,

          playlists: [...state.playlists, action.payload],
        };

      case UserActionType.DEL_PLAYLIST:
        const newPlaylists = state.playlists.filter(
          (video) => video.id !== action.payload
        );
        return { ...state, playlists: newPlaylists };

      case UserActionType.ADD_PLAYLIST_VIDEO: {
        const selectedPlaylistIndex = state.playlists.findIndex(
          (video) => video.id === action.payload.playlistId
        );
        const selectedPlaylist = {
          ...state.playlists[selectedPlaylistIndex],
          list: [
            ...state.playlists[selectedPlaylistIndex].videoList,
            action.payload.video,
          ],
        };

        const newPlaylist = [...state.playlists];
        newPlaylist[selectedPlaylistIndex] = selectedPlaylist;
        return {
          ...state,
          playlists: newPlaylist,
        };
      }

      case UserActionType.DEL_PLAYLIST_VIDEO:
        const selectedPlaylistIndex = state.playlists.findIndex(
          (video) => video.id === action.payload.playlistId
        );
        const selectedPlaylist = {
          ...state.playlists[selectedPlaylistIndex],
        };
        const newSelectedPlaylistList = selectedPlaylist.videoList.filter(
          (video) => video.id !== action.payload.videoId
        );
        const newPlaylist = [...state.playlists];
        newPlaylist[selectedPlaylistIndex] = {
          ...selectedPlaylist,
          videoList: newSelectedPlaylistList,
        };
        return {
          ...state,
          playlists: newPlaylist,
        };
    }
  };
  const [user, userDispatch] = useReducer(reducerUser, initialUser);

  return { user, userDispatch };
};
