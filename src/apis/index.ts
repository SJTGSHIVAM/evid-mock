import axios from 'axios';
import {
  Playlist,
  UserLoginData,
  UserLoginInputData,
  UserSignupInputData,
  Video,
} from 'interfaces';

const getVideos = async () => axios.get("/videos");

const userLogin = async ({ username, password }: UserLoginInputData) =>
  axios.post<UserLoginData>("/user/login", { username, password });

const userSignup = async ({
  fname,
  lname,
  username,
  dob,
  email,
  contact,
  password,
}: UserSignupInputData) =>
  axios.post<UserLoginData>("/user/signup", {
    fname,
    lname,
    username,
    dob,
    email,
    contact,
    password,
  });

const getHistory = async (encodedToken: string) =>
  axios.get<Array<Video>>("/user/history", {
    headers: { authorization: encodedToken },
  });

const addHistory = async (video: string, encodedToken: string) =>
  axios.post<Array<Video>>(
    "/user/history",
    { video },
    { headers: { authorization: encodedToken } }
  );

const removeHistory = async (id: string, encodedToken: string) =>
  axios.delete<Array<Video>>("/user/history/" + id, {
    headers: { authorization: encodedToken },
  });

const deleteAllHistory = async () =>
  axios.delete<Array<Video>>("/user/history/all");

const addLike = async (video: string, encodedToken: string) =>
  axios.post<Array<Video>>(
    "/user/likes/",
    { video },
    { headers: { authorization: encodedToken } }
  );

const removeLike = async (id: string, encodedToken: string) =>
  axios.delete<Array<Video>>("/user/likes/" + id, {
    headers: { authorization: encodedToken },
  });

const addWatchLater = async (video: string, encodedToken: string) =>
  axios.post<Array<Video>>(
    "/user/watchlater/",
    { video },
    { headers: { authorization: encodedToken } }
  );

const removeWatchLater = async (id: string, encodedToken: string) =>
  axios.delete<Array<Video>>("/user/watchlater/" + id, {
    headers: { authorization: encodedToken },
  });

const getPlaylists = async (encodedToken: string) =>
  axios.get<Array<Playlist>>("/user/playlists", {
    headers: { authorization: encodedToken },
  });

const addPlaylist = async (playlist: string, encodedToken: string) =>
  axios.post<Array<Playlist>>("/user/playlists", playlist, {
    headers: { authorization: encodedToken },
  });

const removePlaylist = async (id: string, encodedToken: string) =>
  axios.delete<Array<Playlist>>("/user/playlists/" + id, {
    headers: { authorization: encodedToken },
  });

const getPlaylistVideos = async (id: string, encodedToken: string) =>
  axios.get<Playlist>("/user/playlists/" + id, {
    headers: { authorization: encodedToken },
  });

const addPlaylistVideo = async (
  video: string,
  playlistId: string,
  encodedToken: string
) =>
  axios.post<Playlist>(
    "/user/playlists/" + playlistId,
    { video },
    {
      headers: { authorization: encodedToken },
    }
  );

const removePlaylistVideo = async (
  videoId: string,
  playlistId: string,
  encodedToken: string
) =>
  axios.delete<Playlist>("/user/playlists/" + playlistId + "/" + videoId, {
    headers: { authorization: encodedToken },
  });

export {
  addHistory,
  addLike,
  addPlaylist,
  addPlaylistVideo,
  addWatchLater,
  deleteAllHistory,
  getHistory,
  getPlaylists,
  getPlaylistVideos,
  getVideos,
  removeHistory,
  removeLike,
  removePlaylist,
  removePlaylistVideo,
  removeWatchLater,
  userLogin,
  userSignup,
};
