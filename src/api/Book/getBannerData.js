import prisma from "../../prismaClient";

export default {
  Query: {
    getBannerData: async (_, args) => {
      const { bannerLength } = args;

      const starBest = await prisma.book.findMany({
        orderBy: { avgStar: 'desc' },
        take: Math.min(4, bannerLength)
      });

      const wantedBest = await prisma.book.findMany({
        orderBy: { wantedCount: 'desc' },
        take: Math.min(4, bannerLength)
      });

      const newest = await prisma.book.findMany({
        orderBy: { createdAt: 'desc' },
        take: Math.min(4, bannerLength)
      });

      return { starBest, wantedBest, newest };
    }
  }
};
