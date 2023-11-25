import prisma from "../prismaClient";

export default {
  Query: {
    me: (_, __, { request, checkAuthenticated }) => {
      checkAuthenticated(request, true);

      return request.user;
    }
  }
};
