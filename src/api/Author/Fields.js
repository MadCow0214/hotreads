import { prisma } from "../../../generated/prisma-client";

export default {
  Author: {
    books: parent => {
      return prisma.author({ id: parent.id }).books();
    }
  }
};
