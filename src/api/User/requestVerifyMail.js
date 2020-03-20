import { prisma } from "../../../generated/prisma-client";
import { sendVerifyMail } from "../../util";

export default {
  Mutation: {
    requestVerifyMail: async (_, args, { request, checkAuthenticated }) => {
      checkAuthenticated(request, false);

      const { email } = args;

      const user = await prisma.user({ email });

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
