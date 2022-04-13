interface UserLoginInputData {
  username: string;
  password: string;
}
interface Video {
  id: string;
  tags: Array<string>;
  img: string;
  title: string;
  creator: string;
  avatar: string;
  about: string;
  likes: string;
  views: string;
  uploadedOn: string;
}
interface Playlist {
  id: string;
  name: string;
  videoList: Array<Video>;
}

interface User {
  id: string;
  fname: string;
  username: string;
  lname: string;
  password: string;
  dob: string;
  contact: number;
  email: string;
  likes: Array<Video>;
  watchlater: Array<Video>;
  history: Array<Video>;
  playlists: [Playlist];
  createdAt: string;
  updatedAt: string;
}
interface UserLoginData extends User {
  encodedToken: string;
}
interface UserSignupInputData {
  fname: string;
  lname: string;
  username: string;
  dob: string;
  email: string;
  contact: number;
  password: string;
}

export type {
  Playlist,
  User,
  UserLoginData,
  UserLoginInputData,
  UserSignupInputData,
  Video,
};
