import {RouterContext} from "../deps.ts";
import token from "../util/token.ts";
export default {
  async authorized(context: RouterContext, next: Function) {
    const headers = context.request.headers;
    const authorization = headers.get("Authorization");

    console.log(`authorization: ${authorization}`);
    //handle invalid or no token
    if (!authorization) {
      context.response.status = 401; //unauthorized
      return;
    }
    const jwt = authorization.replace("Bearer ", "");
    //     we can also use
    // const jwt = authorization.split(' ')[1];
    const isTokenValid = await token.validate(context, jwt);
    console.log(`isTokenValid: ${isTokenValid}`);
    if (!isTokenValid) {
      context.response.status = 401; //unauthorized
      context.response.body = "Unauthorised";
      return;
    }
    await next();
  },
};
