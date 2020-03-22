import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    uploadedBooks: parent => {
      return prisma.user({ id: parent.id }).uploadedBooks();
    },
    wantedBooks: parent => {
      return prisma.user({ id: parent.id }).wantedBooks();
    },
    reviews: parent => {
      return prisma.user({ id: parent.id }).reviews();
    }
  }
};
