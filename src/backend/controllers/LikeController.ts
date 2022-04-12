//@ts-nocheck
import { Response } from 'miragejs';

import { requiresAuth } from '../utils/authUtils';

/**
 * All the routes related to Liked Videos are present here.
 * These are private routes.
 * Client needs to add "authorization" header with JWT token in it to access it.
 * */

/**
 * This handler handles getting videos from user's likes.
 * send GET Request at /api/user/likes
 * */
export const getLikedVideosHandler = function (schema, request) {
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
    return new Response(200, {}, { likes: user.likes });
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
 * This handler handles adding videos to user's likes.
 * send POST Request at /api/user/likes
 * body contains {video}
 * */

export const addItemToLikedVideos = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (user) {
    const { video } = JSON.parse(request.requestBody);
    if (user.likes.some((item) => item.id === video.id))
      return new Response(201, {}, { likes: user.likes });
    user.likes.push(video);
    return new Response(201, {}, { likes: user.likes });
  }
  return new Response(
    404,
    {},
    {
      message: "Auth Error",
    }
  );
};

/**
 * This handler handles removing videos from user's likes.
 * send DELETE Request at /api/user/likes/:videoId
 * */

export const removeItemFromLikedVideos = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (user) {
    const videoId = request.params.videoId;
    const filteredLikes = user.likes.filter((item) => item.id !== videoId);
    this.db.users.update({ likes: filteredLikes });
    return new Response(200, {}, { likes: filteredLikes });
  }
  return new Response(
    404,
    {},
    {
      message: "Auth Error",
    }
  );
};
