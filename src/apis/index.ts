import axios from 'axios';
import { BASE_API_URL } from 'consts';
import {
  Playlist,
  UserLoginData,
  UserLoginInputData,
  UserSignupInputData,
  Video,
} from 'interfaces';

const getVideos = async () =>
  axios
    .get<{ videos: Array<Video> }>(`${BASE_API_URL}/videos`)
    .then((res) => res.data.videos);

const userLogin = async ({ username, password }: UserLoginInputData) =>
  axios
    .post<UserLoginData>(`${BASE_API_URL}/user/login`, {
      username,
      password,
    })
    .then((res) => res.data);
const getUser = async (encodedToken: string) =>
  axios
    .get<UserLoginData>(`${BASE_API_URL}/user`, {
      headers: { authorization: encodedToken },
    })
    .then((res) => res.data);

const userSignup = async ({
  fname,
  lname,
  username,
  dob,
  email,
  contact,
  password,
}: UserSignupInputData) =>
  axios.post<UserLoginData>(`${BASE_API_URL}/user/signup`, {
    fname,
    lname,
    username,
    dob,
    email,
    contact,
    password,
  });

const getHistory = async (encodedToken: string) =>
  axios.get<{ history: Array<Video> }>(`${BASE_API_URL}/user/history`, {
    headers: { authorization: encodedToken },
  });

const addHistory = async (video: Video, encodedToken: string) =>
  axios.post<{ history: Array<Video> }>(
    `${BASE_API_URL}/user/history`,
    { video },
    { headers: { authorization: encodedToken } }
  );

const removeHistory = async (id: string, encodedToken: string) =>
  axios.delete<{ history: Array<Video> }>(
    `${BASE_API_URL}/user/history/` + id,
    {
      headers: { authorization: encodedToken },
    }
  );

const deleteAllHistory = async () =>
  axios.delete<{ history: Array<Video> }>(`${BASE_API_URL}/user/history/all`);

const addLike = async (video: Video, encodedToken: string) =>
  axios.post<Array<Video>>(
    `${BASE_API_URL}/user/likes/`,
    { video },
    { headers: { authorization: encodedToken } }
  );

const removeLike = async (id: string, encodedToken: string) =>
  axios.delete<Array<Video>>(`${BASE_API_URL}/user/likes/` + id, {
    headers: { authorization: encodedToken },
  });

const addWatchLater = async (video: Video, encodedToken: string) =>
  axios.post<Array<Video>>(
    `${BASE_API_URL}/user//`,
    { video },
    { headers: { authorization: encodedToken } }
  );

const removeWatchLater = async (id: string, encodedToken: string) =>
  axios.delete<Array<Video>>(`${BASE_API_URL}/user/watchlater/` + id, {
    headers: { authorization: encodedToken },
  });

const getPlaylists = async (encodedToken: string) =>
  axios.get<Array<Playlist>>(`${BASE_API_URL}/user/playlists`, {
    headers: { authorization: encodedToken },
  });

const addPlaylist = async (playlist: Playlist, encodedToken: string) =>
  axios.post<Array<Playlist>>(`${BASE_API_URL}/user/playlists`, playlist, {
    headers: { authorization: encodedToken },
  });

const removePlaylist = async (id: string, encodedToken: string) =>
  axios.delete<Array<Playlist>>(`${BASE_API_URL}/user/playlists/` + id, {
    headers: { authorization: encodedToken },
  });

const getPlaylistVideos = async (id: string, encodedToken: string) =>
  axios.get<Playlist>(`${BASE_API_URL}/user/playlists/` + id, {
    headers: { authorization: encodedToken },
  });

const addPlaylistVideo = async (
  { video, playlistId }: { video: Video; playlistId: string },
  encodedToken: string
) =>
  axios.post<Playlist>(
    `${BASE_API_URL}/user/playlists/` + playlistId,
    { video },
    {
      headers: { authorization: encodedToken },
    }
  );

const removePlaylistVideo = async (
  { videoId, playlistId }: { videoId: string; playlistId: string },
  encodedToken: string
) =>
  axios.delete<Playlist>(
    `${BASE_API_URL}/user/playlists/` +
      playlistId +
      `${BASE_API_URL}/` +
      videoId,
    {
      headers: { authorization: encodedToken },
    }
  );

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
  getUser,
  getVideos,
  removeHistory,
  removeLike,
  removePlaylist,
  removePlaylistVideo,
  removeWatchLater,
  userLogin,
  userSignup,
};
