import prisma from "../../prismaClient";
import bcrypt from "bcrypt";

import { checkAuthenticated } from "../../middlewares";
import { generateVerifyCode, sendVerifyMail } from "../../util";

export default {
  Mutation: {
    registerUser: async (_, args, { req }) => {
      checkAuthenticated(req, false);

      const { nickName, email, password: plainPassword } = args;

      const verifyCode = generateVerifyCode();
      const password = await bcrypt.hash(plainPassword, 10);

      const nickNameExist = await prisma.user.findUnique({ 
        where: { nickName },
        select: { id }
      }) != null;

      if (nickNameExist) {
        return { error: 1 };
      }

      const user = await prisma.user.findUnique({ 
        where: { email },
      });

      if (user) {
        if (user.verifyCode) {
          await prisma.user.update({
            where: { email },
            data: { nickName, password, verifyCode }
          });

          sendVerifyMail(email, verifyCode);

          return {};
        }

        return { error: 2 };
      }

      await prisma.user.create({
        data: {
          nickName,
          email,
          password,
          verifyCode
        }
      });

      sendVerifyMail(email, verifyCode);

      return {};
    }
  }
};
