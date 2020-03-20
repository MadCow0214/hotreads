import { prisma } from "../../../generated/prisma-client";
import bcrypt from "bcrypt";

import { checkAuthenticated } from "../../middlewares";
import { generateVerifyCode, sendVerifyMail } from "../../util";

export default {
  Mutation: {
    registerUser: async (_, args, { request }) => {
      checkAuthenticated(request, false);

      const { nickName, email, password: plainPassword, firstName = "", lastName = "" } = args;

      const verifyCode = generateVerifyCode();
      const password = await bcrypt.hash(plainPassword, 10);

      const checkNickName = await prisma.$exists.user({ nickName });
      if (checkNickName) {
        return { error: 1 };
      }

      const user = await prisma.user({ email });
      if (user) {
        if (user.verifyCode) {
          await prisma.updateUser({
            where: { email },
            data: { nickName, firstName, lastName, password, verifyCode }
          });

          sendVerifyMail(email, verifyCode);

          return {};
        }

        return { error: 2 };
      }

      await prisma.createUser({
        nickName,
        email,
        password,
        firstName,
        lastName,
        verifyCode
      });

      sendVerifyMail(email, verifyCode);

      return {};
    }
  }
};
