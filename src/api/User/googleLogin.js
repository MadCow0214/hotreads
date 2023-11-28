import prisma from "../../prismaClient";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import axios from "axios";

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

      const { name, email, picture } = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?accress_token=${tokenId}`
      );
      
      let user = await prisma.user.findUnique({ 
        where: { email }
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            nickName: name,
            email: email,
            password: process.env.GOOGLE_USER_HASHEDPASSWORD,
            avatar: picture
          }
        });
      }

      return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    }
  }
};
