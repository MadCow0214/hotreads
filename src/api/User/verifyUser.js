import { prisma } from "../../../generated/prisma-client";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    verifyUser: async (_, args, { request, checkAuthenticated }) => {
      checkAuthenticated(request, false);

      const { email, verifyCode } = args;

      const user = await prisma.user({ email });
      if (!user) {
        throw Error("Can't find user");
      }

      if (user.verifyCode !== verifyCode) {
        return { error: 1 };
      }

      await prisma.updateUser({
        where: { email },
        data: { verifyCode: null }
      });

      return { token: jwt.sign({ id: user.id }, process.env.JWT_SECRET) };
    }
  }
};
