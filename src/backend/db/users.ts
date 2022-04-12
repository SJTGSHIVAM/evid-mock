//@ts-nocheck
import { v4 as uuid } from 'uuid';

import { formatDate } from '../utils/authUtils';

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
    likes: [],
    watchlater: [],
    history: [],
    playlists: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
