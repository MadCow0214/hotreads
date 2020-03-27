import { prisma } from "../../../generated/prisma-client";

export default {
  Book: {
    author: parent => {
      return prisma.book({ id: parent.id }).author();
    },
    uploader: parent => {
      return prisma.book({ id: parent.id }).uploader();
    },
    reviews: parent => {
      return prisma.book({ id: parent.id }).reviews();
    },
    reviewCount: parent => {
      return prisma
        .reviewsConnection({ where: { book: { id: parent.id } } })
        .aggregate()
        .count();
    },
    wantedCount: parent => {
      return prisma
        .usersConnection({ where: { wantedBooks_some: { id: parent.id } } })
        .aggregate()
        .count();
    },
    isWanted: async (parent, __, { request }) => {
      const { user } = request;
      const { id } = parent;

      if (!user) {
        return false;
      }

      const result = await prisma.user({ id: user.id }).wantedBooks({ where: { id } });

      return Boolean(result.length);
    }
  },
  Review: {
    user: parent => {
      return prisma.review({ id: parent.id }).user();
    },
    book: parent => {
      return prisma.review({ id: parent.id }).book();
    }
  }
};
