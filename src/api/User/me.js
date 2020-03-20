import { prisma } from "../../../generated/prisma-client";

export default {
  Query: {
    me: (_, __, { request, checkAuthenticated }) => {
      checkAuthenticated(request, true);

      console.log(request.user);

      return request.user;
    }
  }
};
