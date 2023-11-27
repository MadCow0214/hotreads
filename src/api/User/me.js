import prisma from "../../prismaClient";

export default {
  Query: {
    me: (_, __, { req, checkAuthenticated }) => {
      checkAuthenticated(req, true);

      return req.user;
    }
  }
};
