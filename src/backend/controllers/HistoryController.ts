//@ts-nocheck
import { Response } from 'miragejs';

import { requiresAuth } from '../utils/authUtils';

/**
 * All the routes related to User History are present here.
 * These are private routes.
 * Client needs to add "authorization" header with JWT token in it to access it.
 * */

/**
 * This handler handles getting videos from user's history.
 * send GET Request at /api/user/history
 * */
export const getHistoryVideosHandler = function (schema, request) {
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
    return new Response(200, {}, { history: user.history });
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
 * This handler handles adding videos to user's history.
 * send POST Request at /api/user/history
 * body contains {video}
 * */

export const addVideoToHistoryHandler = function (schema, request) {
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
    const { video } = JSON.parse(request.requestBody);
    if (user.history.some((item) => item.id === video.id))
      return new Response(201, {}, { history: user.history });
    user.history.push(video);
    return new Response(201, {}, { history: user.history });
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
 * This handler handles removing videos from user's history.
 * send DELETE Request at /api/user/history/:videoId
 * */

export const removeVideoFromHistoryHandler = function (schema, request) {
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
    const videoId = request.params.videoId;
    const filteredHistory = user.history.filter((item) => item.id !== videoId);
    this.db.users.update({ history: filteredHistory });
    return new Response(200, {}, { history: filteredHistory });
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
 * This handler handles removing videos from user's history.
 * send DELETE Request at /api/user/history/all
 * */

export const clearHistoryHandler = function (schema, request) {
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
    this.db.users.update({ history: [] });
    return new Response(200, {}, { history: [] });
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
