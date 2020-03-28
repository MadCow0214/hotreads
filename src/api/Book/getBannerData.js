import { prisma } from "../../../generated/prisma-client";

export default {
  Query: {
    getBannerData: async (_, args) => {
      const { bannerLength } = args;

      const starBest = await prisma.books({
        orderBy: "avgStar_DESC",
        first: Math.min(4, bannerLength)
      });

      const wantedBest = await prisma.books({
        orderBy: "wantedCount_DESC",
        first: Math.min(4, bannerLength)
      });

      const newest = await prisma.books({
        orderBy: "createdAt_DESC",
        first: Math.min(4, bannerLength)
      });

      return { starBest, wantedBest, newest };
    }
  }
};
