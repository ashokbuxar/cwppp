import { Router } from "../deps.ts";
import token from "../util/token.ts";
import db from "../config/cwppMongo.ts";

const protectedRouter = new Router();
const users = db.collection("userCollection");

protectedRouter.get("/me", async (context) => {
  const authorization = (context.request.headers).get("authorization");
  if (authorization) {
    const headerToken = authorization.replace("Bearer ", "");

    const payload = token.fetchUserId(headerToken);
    console.log(`payload: ${payload}`);
    // if (payload) {
    //   const uid: string = String(payload.uid);
    //   const user = await users.findOne({ _id: { $oid: uid } });
    //   console.log(`user: ${user}`);
    //   context.response.body = user;
    // }
  }
});
export default protectedRouter;
