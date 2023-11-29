import prisma from "../../prismaClient";

export default {
  Author: {
    books: async parent => {
      const { books } = await prisma.author.findUnique({ 
        where: { id: parent.id },
        select: {
          books: true
        }
      })

      return books;
    },
    bookCount: async parent => {
      const {_count} = await prisma.author.findUnique({ 
        where: { id: parent.id },
        select: {
          _count: {
            select: { books: true }
          }
        }
      });

      return _count.books;
    }
  }
};
