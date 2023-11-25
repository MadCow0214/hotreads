import prisma from "../prismaClient";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    login: async (_, args, { request, checkAuthenticated }) => {
      checkAuthenticated(request, false);

      const { email, password } = args;

      const user = await prisma.user.findUnique({ 
        where: { email } 
      });
      
      if (!user) {
        return { error: 1 };
      }

      const result = await bcrypt.compare(password, user.password);

      if (!result) {
        return { error: 2 };
      }

      if (user.verifyCode) {
        return { error: 3 };
      }

      return { token: jwt.sign({ id: user.id }, process.env.JWT_SECRET) };
    }
  }
};
