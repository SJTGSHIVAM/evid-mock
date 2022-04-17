// @ts-nocheck

import { getUserHandler } from 'backend/controllers/UserController';
import {
  Model,
  RestSerializer,
  Server,
} from 'miragejs';

import {
  loginHandler,
  signupHandler,
} from './backend/controllers/AuthController';
import {
  getAllCategoriesHandler,
  getCategoryHandler,
} from './backend/controllers/CategoryController';
import {
  addVideoToHistoryHandler,
  clearHistoryHandler,
  getHistoryVideosHandler,
  removeVideoFromHistoryHandler,
} from './backend/controllers/HistoryController';
import {
  addItemToLikedVideos,
  getLikedVideosHandler,
  removeItemFromLikedVideos,
} from './backend/controllers/LikeController';
import {
  addNewPlaylistHandler,
  addVideoToPlaylistHandler,
  getAllPlaylistsHandler,
  getVideosFromPlaylistHandler,
  removePlaylistHandler,
  removeVideoFromPlaylistHandler,
} from './backend/controllers/PlaylistController';
import {
  getAllVideosHandler,
  getVideoHandler,
} from './backend/controllers/VideoController';
import {
  addItemToWatchLaterVideos,
  getWatchLaterVideosHandler,
  removeItemFromWatchLaterVideos,
} from './backend/controllers/WatchLaterController';
import { users } from './backend/db/users';
import { videos } from './backend/db/videos';

export function makeServer({ environment = "development" } = {}) {
  return new Server({
    serializers: {
      application: RestSerializer,
    },
    environment,
    // TODO: Use Relationships to have named relational Data
    models: {
      video: Model,
      category: Model,
      user: Model,
      like: Model,
      history: Model,
      playlist: Model,
      watchLater: Model,
    },

    // Runs on the start of the server
    seeds(server) {
      server.logging = false;
      videos.forEach((item) => {
        server.create("video", { ...item });
      });
      users.forEach((item) => {
        server.create("user", { ...item });
      });
    },

    routes() {
      this.namespace = "";
      // auth routes (public)
      this.post("/user/signup", signupHandler.bind(this));
      this.post("/user/login", loginHandler.bind(this));
      this.get("/user", getUserHandler.bind(this));
      // video routes (public)
      this.get("/videos", getAllVideosHandler.bind(this));
      this.get("video/:videoId", getVideoHandler.bind(this));

      // likes routes (private)
      this.get("/user/likes", getLikedVideosHandler.bind(this));
      this.post("/user/likes", addItemToLikedVideos.bind(this));
      this.delete("/user/likes/:videoId", removeItemFromLikedVideos.bind(this));

      // watch later routes (private)
      this.get("/user/watchlater", getWatchLaterVideosHandler.bind(this));
      this.post("/user/watchlater", addItemToWatchLaterVideos.bind(this));
      this.delete(
        "/user/watchlater/:videoId",
        removeItemFromWatchLaterVideos.bind(this)
      );

      // playlist routes (private)
      this.get("/user/playlists", getAllPlaylistsHandler.bind(this));
      this.post("/user/playlists", addNewPlaylistHandler.bind(this));
      this.delete(
        "/user/playlists/:playlistId",
        removePlaylistHandler.bind(this)
      );

      this.get(
        "/user/playlists/:playlistId",
        getVideosFromPlaylistHandler.bind(this)
      );
      this.post(
        "/user/playlists/:playlistId",
        addVideoToPlaylistHandler.bind(this)
      );
      this.delete(
        "/user/playlists/:playlistId/:videoId",
        removeVideoFromPlaylistHandler.bind(this)
      );

      // history routes (private)
      this.get("/user/history", getHistoryVideosHandler.bind(this));
      this.post("/user/history", addVideoToHistoryHandler.bind(this));
      this.delete(
        "/user/history/:videoId",
        removeVideoFromHistoryHandler.bind(this)
      );
      this.delete("/user/history/all", clearHistoryHandler.bind(this));
    },
  });
}
