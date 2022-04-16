//@ts-nocheck
import { Response } from 'miragejs';

import { requiresAuth } from '../utils/authUtils';

export const getUserHandler = function (schema, request) {
  const encodedToken = request.requestHeaders.authorization;
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        403,
        {},
        {
          message: "Auth Error",
        }
      );
    }
    const {
      id,
      fname,
      lname,
      username,
      dob,
      contact,
      email,
      likes,
      watchLater,
      history,
      playlists,
      createdAt,
      updatedAt,
    } = user;
    return new Response(
      200,
      {},
      {
        id,
        fname,
        lname,
        username,
        dob,
        contact,
        email,
        likes,
        watchLater,
        history,
        playlists,
        createdAt,
        updatedAt,
        encodedToken,
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
