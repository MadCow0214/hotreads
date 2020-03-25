import { prisma } from "../../../generated/prisma-client";

export default {
  Query: {
    getBannerData: async () => {
      const starBest = await prisma.books({
        orderBy: "avgStar_ASC",
        first: 4
      });

      const wantedBest = await prisma.books({
        orderBy: "wantedCount_DESC",
        first: 4
      });

      const newest = await prisma.books({
        orderBy: "createdAt_DESC",
        first: 4
      });

      return { starBest, wantedBest, newest };
    }
  }
};
