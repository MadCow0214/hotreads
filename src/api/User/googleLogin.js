import prisma from "../../prismaClient";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.FRONTEND_URL,
);

export default {
  Mutation: {
    googleLogin: async (_, args, { req, checkAuthenticated }) => {
      checkAuthenticated(req, false);

      const { tokenId } = args;

      const { email } = await googleClient.getTokenInfo(tokenId);

      if (!email) {
        throw Error('token info don\'t have email.');
      }
      
      let user = await prisma.user.findUnique({ 
        where: { email: payload.email }
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            nickName: payload.name,
            email: payload.email,
            password: process.env.GOOGLE_USER_HASHEDPASSWORD,
            avatar: payload.picture
          }
        });
      }

      return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    }
  }
};
