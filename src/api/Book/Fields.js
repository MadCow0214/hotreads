import { prisma } from "../../../generated/prisma-client";

export default {
  Book: {
    author: parent => {
      return prisma.book({ id: parent.id }).author();
    },
    uploader: parent => {
      return prisma.book({ id: parent.id }).uploader();
    },
    wantedUserCount: parent => {
      return prisma
        .usersConnection({ where: { wantedBooks_some: { id: parent.id } } })
        .aggregate()
        .count();
    },
    reviews: parent => {
      return prisma.book({ id: parent.id }).reviews();
    }
  },
  Review: {
    user: parent => {
      return prisma.review({ id: parent.id }).user();
    },
    book: parent => {
      return prisma.review({ id: parent.id }).book();
    }
  },
  Author: {
    books: parent => {
      return prisma.author({ id: parent.id }).books();
    }
  }
};
