import { prisma } from "../../../generated/prisma-client";

export default {
  Mutation: {
    createBook: async (_, args, { request, checkAuthenticated }) => {
      checkAuthenticated(request, true);

      const { title, subtitle, category, authorId, company, image, desc, publishDate } = args;
      const { user } = request;

      const titleCheck = await prisma.$exists.book({ title });
      if (titleCheck) {
        return { error: 1, book: null };
      }

      if (!category) {
        return { error: 2, book: null };
      }

      const hasAuthor = await prisma.$exists.author({ id: authorId });
      if (!hasAuthor) {
        return { error: 3, book: null };
      }

      return {
        error: null,
        book: prisma.createBook({
          title,
          subtitle,
          category,
          author: { connect: { id: authorId } },
          company,
          image,
          desc,
          publishDate: new Date(publishDate),
          uploader: { connect: { id: user.id } }
        })
      };
    }
  }
};
