import { prisma } from "../../../generated/prisma-client";

export default {
  Query: {
    me: (_, __, { request, checkAuthenticated }) => {
      checkAuthenticated(request, true);

      return request.user;
    }
  }
};
