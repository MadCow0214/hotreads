import { prisma } from "../../../generated/prisma-client";

export default {
  Author: {
    books: parent => {
      return prisma.author({ id: parent.id }).books();
    },
    bookCount: parent => {
      return prisma
        .booksConnection({ where: { author: { id: parent.id } } })
        .aggregate()
        .count();
    }
  }
};
