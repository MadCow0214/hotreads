import { prisma } from "../../../generated/prisma-client";

export default {
  Query: {
    userByNickName: async (_, args) => {
      const { nickName } = args;

      return await prisma.user({ nickName });
    }
  }
};
