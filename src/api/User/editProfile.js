import prisma from "../../prismaClient";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    editProfile: async (_, args, { req, checkAuthenticated }) => {
      checkAuthenticated(req, true);

      const { user } = req;
      const { avatar, curPassword, newPassword } = args;

      let cryptPassword = "";
      if (newPassword) {
        const result = await bcrypt.compare(curPassword, user.password);
        if (!result) {
          return false;
        }

        cryptPassword = await bcrypt.hash(newPassword, 10);
      }

      try {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            avatar: avatar ? avatar : user.avatar,
            password: cryptPassword ? cryptPassword : user.password
          }
        });
      } catch {
        return false;
      }

      return true;
    }
  }
};
