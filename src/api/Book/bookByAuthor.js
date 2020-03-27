import { prisma } from "../../../generated/prisma-client";

export default {
  Query: {
    bookByAuthor: (_, args) => {
      const { name, page } = args;

      return prisma.author({ name }).books({ first: 12, skip: 12 * (page - 1) });
    }
  }
};
