import { prisma } from "../../../generated/prisma-client";

export default {
  Author: {
    bookCount: parent => {
      return prisma
        .booksConnection({ where: { author_some: { id: parent.id } } })
        .aggregate()
        .count();
    }
  }
};
