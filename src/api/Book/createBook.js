import { prisma } from "../../../generated/prisma-client";

export default {
  Mutation: {
    createBook: async (_, args, { request, checkAuthenticated }) => {
      checkAuthenticated(request, true);

      const { title, author, image, tags } = args;
      const { user } = request;

      let tagIds = [];
      if (tags) {
        tagIds = await Promise.all(
          tags.map(async name => {
            let tag = await prisma.tag({ name });

            if (!tag) {
              tag = await prisma.createTag({ name });
            }

            return { id: tag.id };
          })
        );
      }

      let authorData = await prisma.author({ name: author });
      if (!authorData) {
        authorData = await prisma.createAuthor({ name: author });
      }

      console.log(tagIds);

      return prisma.createBook({
        title,
        author: { connect: { id: authorData.id } },
        image,
        uploader: { connect: { id: user.id } },
        tags: { connect: tagIds }
      });
    }
  }
};
