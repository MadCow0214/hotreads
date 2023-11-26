import prisma from "../../prismaClient";

export default {
  Book: {
    author: async parent => {
      const { author } = await prisma.book.findUnique({ 
        where: { id: parent.id },
        select: {
          author: true
        }
      });

      return author;
    },
    uploader: async parent => {
      const { uploader } = await prisma.book.findUnique({ 
        where: { id: parent.id },
        select: {
          uploader: true
        }
      });

      return uploader;
    },
    reviews: async parent => {
      const { reviews } = await prisma.book.findUnique({ 
        where: { id: parent.id },
        select: {
          reviews: true
        }
      });

      return reviews;
    },
    reviewCount: async parent => {
      const { _count } = await prisma.book.findUnique({
        where: { id: parent.id },
        select: {
          _count: {
            select: {
              reviews: true
            }
          }
        }
      });

      return _count.reviews;
    },
    wantedCount: async parent => {
      const { _count } = await prisma.book.findUnique({
        where: { id: parent.id },
        select: {
          _count: {
            select: {
              wantedUsers: true
            }
          }
        }
      });

      return _count.wantedUsers;
    },
    isWanted: async (parent, __, { request }) => {
      const { user } = request;
      const { id } = parent;

      if (!user) {
        return false;
      }

      const result = await prisma.user.findUnique({ 
        where: { id: user.id },
        select: {
          wantedBooks: {
            where: { id },
            select: {
              id: true
            }
          }
        }
      });

      return Boolean(result.wantedBooks.length);
    }
  },
  Review: {
    user: async parent => {
      const { user } = await prisma.review.findUnique({ 
        where: { id: parent.id },
        select: {
          user: true
        },
      });

      return user;
    },
    book: async parent => {
      const { book } = await prisma.review.findUnique({
        where: { id: parent.id },
        select: {
          book: true
        }
      });

      return book;
    }
  }
};
