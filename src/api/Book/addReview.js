import prisma from "../../prismaClient";

export default {
  Mutation: {
    addReview: async (_, args, { req, checkAuthenticated }) => {
      checkAuthenticated(req, true);
      const { user } = request;
      const { bookId, text, star } = args;

      let { avgStar, reviews } = await prisma.book.findUnique({ 
        where: { id: bookId },
        select: {
          avgStar: true,
          reviews: true
        }
      });

      const reviewCount = reviews.count();

      avgStar = (avgStar * reviewCount + star) / (reviewCount + 1);

      const review = await prisma.review.create({
        data: {
          user: { connect: { id: user.id } },
          book: { connect: { id: bookId } },
          text,
          star
        }
      });

      await prisma.book.update({
        where: { id: bookId },
        data: {
          avgStar
        }
      });

      return review;
    }
  }
};
