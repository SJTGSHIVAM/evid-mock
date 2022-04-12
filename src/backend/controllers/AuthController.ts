//@ts-nocheck
import { Response } from 'miragejs';
import { v4 as uuid } from 'uuid';

import { formatDate } from '../utils/authUtils';

const sign = require("jwt-encode");
/**
 * All the routes related to Auth are present here.
 * These are Publicly accessible routes.
 * */

/**
 * This handler handles user signups.
 * send POST Request at /api/auth/signup
 * body contains {firstName, lastName, username, password}
 * */

export const signupHandler = function (schema, request) {
  const { username, fname, lname, dob, contact, email, password } = JSON.parse(
    request.requestBody
  );
  try {
    // check if username already exists
    const user = schema.users.findBy({ username });
    if (user) {
      return new Response(
        422,
        {},
        {
          message: "username Already Exists.",
        }
      );
    }
    const id = uuid();
    const newUser = {
      id,
      username,
      password,
      fname,
      lname,
      username,
      password,
      dob,
      contact,
      email,
      createdAt: formatDate(),
      updatedAt: formatDate(),
      likes: [],
      history: [],
      playlists: [],
      watchlater: [],
    };
    const createdUser = schema.users.create(newUser);
    const encodedToken = sign(
      { id, username },
      process.env.REACT_APP_JWT_SECRET
    );
    return new Response(201, {}, { ...createdUser, encodedToken });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        message: "something went wrong",
      }
    );
  }
};

/**
 * This handler handles user login.
 * send POST Request at /api/auth/login
 * body contains {username, password}
 * */

export const loginHandler = function (schema, request) {
  const { username, password } = JSON.parse(request.requestBody);
  try {
    const user = schema.users.findBy({ username });
    if (!user) {
      return new Response(
        404,
        {},
        {
          message:
            "The username you entered is not Registered. Not Found error",
        }
      );
    }
    if (password === user.password) {
      const encodedToken = sign(
        { id: user.id, username },
        process.env.REACT_APP_JWT_SECRET
      );
      user.password = undefined;
      return new Response(200, {}, { ...user, encodedToken });
    }
    return new Response(
      401,
      {},
      {
        message:
          "The credentials you entered are invalid. Unauthorized access error.",
      }
    );
  } catch (error) {
    return new Response(
      500,
      {},
      {
        message: "something went wrong",
      }
    );
  }
};
