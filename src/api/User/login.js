import { prisma } from "../../../generated/prisma-client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default {
  Query: {
    login: async (_, args, { request, checkAuthenticated }) => {
      checkAuthenticated(request, false);

      const { email, password } = args;

      const user = await prisma.user({ email });
      if (!user) {
        return { error: 1 };
      }

      if (user.verifyCode) {
        return { error: 2 };
      }

      const result = await bcrypt.compare(password, user.password);

      if (!result) {
        return { error: 3 };
      }

      return { token: jwt.sign({ id: user.id }, process.env.JWT_SECRET) };
    }
  }
};
