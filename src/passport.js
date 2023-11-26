import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "./prismaClient";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

const vertifyUser = async (payload, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: payload.id }
    });

    if (user !== null) {
      return done(null, user);
    }

    return null, false;
  } catch (error) {
    return done(error, false);
  }
};

export const authenticateJwt = passport.authenticate("jwt", { session: false });

passport.use(new Strategy(jwtOptions, vertifyUser));
passport.initialize();
