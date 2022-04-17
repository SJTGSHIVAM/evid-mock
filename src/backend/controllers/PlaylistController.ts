//@ts-nocheck
import { Response } from 'miragejs';

import { requiresAuth } from '../utils/authUtils';

/**
 * All the routes related to User Playlists are present here.
 * These are private routes.
 * Client needs to add "authorization" header with JWT token in it to access it.
 * */

/**
 * This handler handles getting all user's playlists.
 * send GET Request at /api/user/playlist
 * */

export const getAllPlaylistsHandler = function (schema, request) {
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
    return new Response(200, {}, { playlists: user.playlists });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        message: "Something went wrong",
      }
    );
  }
};

/**
 * This handler handles adding playlist to user's playlists.
 * send POST Request at /api/user/playlists
 * body contains {playlist: {title: "foo", description:"bar bar bar" }}
 * */

export const addNewPlaylistHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (user) {
    const playlist = JSON.parse(request.requestBody);
    const name = playlist.name;
    const videoList = playlist.list === undefined ? [] : playlist.list;
    user.playlists.push({ name, videoList, id: playlist.id });
    return new Response(201, {}, { playlists: user.playlists });
  }
  return new Response(
    403,
    {},
    {
      message: "Auth Error",
    }
  );
};

/**
 * This handler handles removing videos from user's playlists.
 * send DELETE Request at /api/user/playlists/:playlistId
 * */

export const removePlaylistHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (user) {
    const playlistId = request.params.playlistId;
    const filteredPlaylists = user.playlists.filter(
      (item) => item.id !== playlistId
    );
    this.db.users.update({ playlists: filteredPlaylists });
    return new Response(200, {}, { playlists: filteredPlaylists });
  }
  return new Response(
    403,
    {},
    {
      message: "Auth Error",
    }
  );
};

/**
 * This handler handles getting videos from user's playlist.
 * send GET Request at /api/user/playlists/:playlistId
 * */

export const getVideosFromPlaylistHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (user) {
    const playlistId = request.params.playlistId;
    const playlist = user.playlists.find((item) => item.id !== playlistId);
    return new Response(200, {}, { playlist });
  }
  return new Response(
    403,
    {},
    {
      message: "Auth Error",
    }
  );
};

/**
 * This handler handles adding videos from user's playlist.
 * send POST Request at /api/user/playlists/:playlistId
 * body contains {video}
 * */

export const addVideoToPlaylistHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (user) {
    const playlistId = request.params.playlistId;
    const { video } = JSON.parse(request.requestBody);
    console.log(user, playlistId, video);

    const playlist = user.playlists.find((item) => item.id === playlistId);
    console.log(playlist);

    if (playlist.videoList.some((item) => item.id === video.id)) {
      return new Response(201, {}, { playlist });
    }
    playlist.videoList.push(video);
    return new Response(201, {}, { playlist });
  }
  return new Response(
    403,
    {},
    {
      message: "Auth Error",
    }
  );
};

/**
 * This handler handles removing videos from user's playlist.
 * send DELETE Request at /api/user/playlists/:playlistId/:videoId
 * */

export const removeVideoFromPlaylistHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (user) {
    const playlistId = request.params.playlistId;
    const videoId = request.params.videoId;
    let playlist = user.playlists.find((item) => item.id === playlistId);
    const filteredVideos = playlist.videoList.filter(
      (item) => item.id !== videoId
    );
    playlist.list = filteredVideos;
    return new Response(200, {}, { playlist });
  }
  return new Response(
    403,
    {},
    {
      message: "Auth Error",
    }
  );
};
