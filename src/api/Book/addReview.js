import { prisma } from "../../../generated/prisma-client";

export default {
  Mutation: {
    addReview: async (_, args, { request, checkAuthenticated }) => {
      checkAuthenticated(request, true);
      const { user } = request;
      const { bookId, text, star } = args;

      let { avgStar } = await prisma.book({ id: bookId });
      const reviewCount = await prisma
        .reviewsConnection({ where: { book: { id: bookId } } })
        .aggregate()
        .count();

      avgStar = (avgStar * reviewCount + star) / (reviewCount + 1);

      const review = await prisma.createReview({
        user: { connect: { id: user.id } },
        book: { connect: { id: bookId } },
        text,
        star
      });

      await prisma.updateBook({
        where: { id: bookId },
        data: {
          avgStar
        }
      });

      return review;
    }
  }
};
