//@ts-nocheck
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';
import { Response } from 'miragejs';

export const requiresAuth = function (request) {
  const encodedToken = request.requestHeaders.authorization;
  const decodedToken = jwt_decode(
    encodedToken,
    process.env.REACT_APP_JWT_SECRET
  );
  if (decodedToken) {
    const user = this.db.users.findBy({ username: decodedToken.username });
    return user;
  }
  return new Response(401, {}, { message: "Auth Error" });
};

export const formatDate = () => dayjs().format("YYYY-MM-DDTHH:mm:ssZ");
