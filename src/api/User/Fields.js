import prisma from "../../prismaClient";

export default {
  User: {
    reviews: async parent => {
      const { reviews } = await prisma.user.findUnique({ 
        where: { id: parent.id },
        select: {
          reviews: true,
        }
      });

      return reviews;
    },
    isSelf: (parent, __, { req }) => {
      const { user } = req;

      if (!user) {
        return false;
      }

      return parent.id === user.id;
    },
    wantedBookCount: async parent => {
      const { _count } = await prisma.user.findUnique({
        where: { id: parent.id },
        select: {
          _count: {
            select: {
              wantedBooks: true
            }
          }
        }
      });

      return _count.wantedBooks;
    },
    uploadedBookCount: async parent => {
      const { _count } = await prisma.user.findUnique({ 
        where: { id: parent.id },
        select: {
          _count: {
            select: {
              uploadedBooks: true,
            }
          }
        }
      });

      return _count.uploadedBooks;
    }
  }
};
