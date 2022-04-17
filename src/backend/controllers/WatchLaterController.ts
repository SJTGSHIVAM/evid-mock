//@ts-nocheck
import { Response } from 'miragejs';

import { requiresAuth } from '../utils/authUtils';

/**
 * All the routes related to Watch Later Videos are present here.
 * These are private routes.
 * Client needs to add "authorization" header with JWT token in it to access it.
 * */

/**
 * This handler handles getting videos from user's watchlater playlist.
 * send GET Request at /api/user/watchlater
 * */

export const getWatchLaterVideosHandler = function (schema, request) {
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
    return new Response(200, {}, { watchLater: user.watchLater });
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
 * This handler handles adding videos to user's watchlater playlist.
 * send POST Request at /api/user/watchlater
 * body contains {video}
 * */

export const addItemToWatchLaterVideos = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (user) {
    const { video } = JSON.parse(request.requestBody);
    if (user.watchLater.some((item) => item.id === video.id))
      return new Response(201, {}, { watchLater: user.watchLater });

    user.watchLater.push(video);
    return new Response(201, {}, { watchLater: user.watchLater });
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
 * This handler handles removing videos from user's watchlater playlist.
 * send DELETE Request at /api/user/watchlater/:videoId
 * */

export const removeItemFromWatchLaterVideos = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (user) {
    const videoId = request.params.videoId;
    const filteredVideos = user.watchLater.filter(
      (item) => item.id !== videoId
    );
    this.db.users.update({ watchLater: filteredVideos });
    return new Response(200, {}, { watchLater: filteredVideos });
  }
  return new Response(
    404,
    {},
    {
      message: "Something went wrong",
    }
  );
};
