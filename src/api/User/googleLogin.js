import prisma from "../prismaClient";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export default {
  Mutation: {
    googleLogin: async (_, args, { request, checkAuthenticated }) => {
      checkAuthenticated(request, false);

      const { tokenId } = args;

      const ticket = await googleClient.verifyIdToken({
        idToken: tokenId,
        audience: process.env.GOOGLE_CLIENT_ID
      });

      const payload = ticket.getPayload();

      let user = await prisma.user.findUnique({ 
        where: { email: payload.email }
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            nickName: payload.name,
            email: payload.email,
            avatar: payload.picture
          }
        });
      }

      return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    }
  }
};
