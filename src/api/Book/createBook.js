import { prisma } from "../../../generated/prisma-client";

export default {
  Mutation: {
    createBook: async (_, args, { request, checkAuthenticated }) => {
      checkAuthenticated(request, true);

      const { title, subtitle, category, authorId, company, image, desc, publishDate } = args;
      const { user } = request;

      if (!category) {
        return null;
      }

      const hasAuthor = await prisma.$exists.author({ id: authorId });
      if (!hasAuthor) {
        return null;
      }

      return prisma.createBook({
        title,
        subtitle,
        category,
        author: { connect: { id: authorId } },
        company,
        image,
        desc,
        publishDate: new Date(publishDate),
        uploader: { connect: { id: user.id } }
      });
    }
  }
};
