import prisma from "../../prismaClient";
import { sendVerifyMail } from "../../util";

export default {
  Mutation: {
    requestVerifyMail: async (_, args, { req, checkAuthenticated }) => {
      checkAuthenticated(request, false);

      const { email } = args;

      const user = await prisma.user.findUnique({ 
        where: { email }
      });

      if (!user) {
        return false;
      }

      if (!user.verifyCode) {
        return false;
      }

      sendVerifyMail(email, user.verifyCode);

      return true;
    }
  }
};
