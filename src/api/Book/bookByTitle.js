import { prisma } from "../../../generated/prisma-client";

export default {
  Query: {
    bookByTitle: (_, { title }) => {
      return prisma.book({ title });
    }
  }
};
