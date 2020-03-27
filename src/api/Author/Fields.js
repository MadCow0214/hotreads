import { prisma } from "../../../generated/prisma-client";

export default {
  Author: {
    bookCount: parent => {
      return prisma
        .booksConnection({ where: { author: { id: parent.id } } })
        .aggregate()
        .count();
    }
  }
};
