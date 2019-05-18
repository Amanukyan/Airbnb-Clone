import * as bcrypt from "bcryptjs";

import { ResolverMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";
import {
  invalidLogin,
  confirmEmailError,
  forgotPasswordLockedError
} from "./errorMessages";
import { userSessionIdPrefix } from "../../../constants";

const errorResponse = [
  {
    path: "email",
    message: invalidLogin
  }
];

export const resolvers: ResolverMap = {
  Mutation: {
    login: async (_, { email, password }, { session, redis, req }) => {
      const user = await User.findOne({ where: { email } });

      console.log("ok 1");

      if (!user) {
        return { errors: errorResponse };
      }

      console.log("ok 2");

      if (!user.confirmed) {
        return {
          errors: [
            {
              path: "email",
              message: confirmEmailError
            }
          ]
        };
      }

      console.log("ok 3");

      if (user.forgotPasswordLocked) {
        return {
          errors: [
            {
              path: "email",
              message: forgotPasswordLockedError
            }
          ]
        };
      }

      console.log("ok 4");

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return { errors: errorResponse };
      }

      console.log("ok 5");

      // login sucessful
      session.userId = user.id;
      if (req.sessionID) {
        await redis.lpush(`${userSessionIdPrefix}${user.id}`, req.sessionID);
      }

      console.log("ok 6");

      return { sessionId: req.sessionID };
    }
  }
};
