import prisma from "../../prismaClient";

export default {
  Mutation: {
    createBook: async (_, args, { req, checkAuthenticated }) => {
      checkAuthenticated(req, true);

      const { title, subtitle, category, authorId, company, image, desc, publishDate } = args;
      const { user } = req;

      const titleExist = await prisma.book.findUnique({ 
        where: { title },
        select: { title },
      }) != null;

      if (titleExist) {
        return { error: 1, book: null };
      }

      if (!category) {
        return { error: 2, book: null };
      }

      const hasAuthor = await prisma.author.findUnique({ 
        where: { id: authorId }
      }) != null;

      if (!hasAuthor) {
        return { error: 3, book: null };
      }

      return {
        error: null,
        book: await prisma.book.create({
          data: {
            title,
            subtitle,
            category,
            author: { connect: { id: authorId } },
            company,
            image,
            desc,
            publishDate: new Date(publishDate),
            uploader: { connect: { id: user.id } }
          }
        })
      };
    }
  }
};
