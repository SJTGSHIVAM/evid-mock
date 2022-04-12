//@ts-nocheck
import { v4 as uuid } from 'uuid';

import { formatDate } from '../utils/authUtils';
import { videos } from './videos';

export const users = [
  {
    id: uuid(),
    fname: "Shivam",
    lname: "Pandey",
    username: "sjtgshivam",
    password: "acheDin",
    dob: "1997-03-07",
    contact: 8057700000,
    email: "randomshivam@gmail.com",
    likes: [videos[0], videos[1], videos[2]],
    watchlater: [videos[5], videos[3]],
    history: [videos[2], videos[0], videos[1], videos[4]],
    playlists: [
      {
        id: "1",
        name: "important",
        videoList: [videos[0], videos[1], videos[2]],
      },
      {
        id: "2",
        name: "fun",
        videoList: [videos[5], videos[3], videos[6]],
      },
    ],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
