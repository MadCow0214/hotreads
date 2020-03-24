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
    },
    fullName: async parent => {
      const { firstName, lastName } = await prisma.user({ id: parent.id });

      return `${lastName}${firstName}`;
    },
    isSelf: (parent, __, { request }) => {
      const { user } = request;

      if (!user) {
        return false;
      }

      return parent.id === user.id;
    }
  }
};
