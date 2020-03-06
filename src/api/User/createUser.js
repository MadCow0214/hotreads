import { prisma } from "../../../generated/prisma-client";
import jwt from "jsonwebtoken";

import { checkAuthenticated } from "../../middlewares";

export default {
  Mutation: {
    createUser: async (_, args, { request }) => {
      checkAuthenticated(request, false);

      const { nickName, email, firstName = "", lastName = "" } = args;

      const user = await prisma.createUser({
        nickName,
        email,
        firstName,
        lastName
      });

      return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    }
  }
};
