import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
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
    },
    wantedBookCount: parent => {
      return prisma
        .booksConnection({ where: { wantedUsers_some: { id: parent.id } } })
        .aggregate()
        .count();
    },
    uploadedBookCount: parent => {
      return prisma
        .booksConnection({ where: { uploader: { id: parent.id } } })
        .aggregate()
        .count();
    }
  }
};
