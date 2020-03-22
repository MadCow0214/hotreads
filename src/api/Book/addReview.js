import { prisma } from "../../../generated/prisma-client";

export default {
  Mutation: {
    addReview: (_, args, { request, checkAuthenticated }) => {
      checkAuthenticated(request, true);
      const { user } = request;
      const { bookId, text, star } = args;

      return prisma.createReview({
        user: { connect: { id: user.id } },
        book: { connect: { id: bookId } },
        text,
        star
      });
    }
  }
};
