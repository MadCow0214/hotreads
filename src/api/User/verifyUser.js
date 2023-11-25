import prisma from "../prismaClient";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    verifyUser: async (_, args, { request, checkAuthenticated }) => {
      checkAuthenticated(request, false);

      const { email, verifyCode } = args;

      const user = await prisma.user.findUnique({ 
        where: { email }
      });

      if (!user) {
        throw Error("Can't find user");
      }

      if (user.verifyCode !== verifyCode) {
        return { error: 1 };
      }

      await prisma.user.update({
        where: { email },
        data: { verifyCode: null }
      });

      return { token: jwt.sign({ id: user.id }, process.env.JWT_SECRET) };
    }
  }
};
