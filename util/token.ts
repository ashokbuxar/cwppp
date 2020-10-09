// Old Code

import {
  validateJwt,
  parseAndDecode,
  validateJwtObject,
} from "../deps.ts";
import {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} from "../deps.ts";
import { config } from "../deps.ts";
import UserClass from "../models/userModel.ts";

const env = config();
const userClass = new UserClass();

const key = env.JWT_SECRET_KEY;

const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

export default {
  generate(context: any, userId: string): any {
    const payload: Payload = {
      iss: userId,
      exp: setExpiration(new Date().getTime() + 1000 * 60 * 60),
    };
    const jwt = makeJwt({ header, payload, key });
    return jwt;
  },

  async validate(context: any, jwt: string) {
    const data = await validateJwt({ jwt, key, algorithm: "HS256" });
    if (data.isValid) {
      const payload: any = data.payload;
      console.log(payload);
      if (payload) {
        const id = payload.iss;
        console.log(id);
        const user = (await userClass.getOneUser(id))!;
        if(user){
        context.state.user = user;
        }
        return data.isValid;
      }
    }
    return data.isValid;
  },
  fetchUserId(token: string) {
    return validateJwtObject(parseAndDecode(token)).payload;
  },
};
