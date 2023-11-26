import prisma from "../../prismaClient";

export default {
  Query: {
    userByNickName: async (_, args) => {
      const { nickName } = args;

      return await prisma.user.findUnique({ 
        where: { nickName }
      });
    }
  }
};
