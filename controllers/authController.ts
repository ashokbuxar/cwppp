import db from "../config/cwppMongo.ts";
// import { ObjectId } from "https://deno.land/x/mongo/mod.ts";
import validation from "../validation.ts";
import hash from "../util/hash.ts";
import token from "../util/token.ts";
const users = db.collection("userCollection");

export const login = async (context: any) => {
  console.log(`authController login function`);
  //validation of user parameters
  const formBody = await context.request.body({
    contentTypes: {
      text: ["application/x-www-form-urlencoded"],
    },
  });

  const params = await formBody.value;
  const email = params.get("email");
  const password = params.get("password");
  const user = {
    email: email,
    password: password,
  };
  console.log(user);
  const { validate, error } = await validation.validateLogin(user);
  console.log({ error: error });
  console.log(`validate: ${validate}`);

  let msg;
  let status;
  let jwt;
  if (!validate) {
    status = 400;
    msg = "Please fill all fields.";
  } else {
    const user = await users.findOne({ email: email });

    if (!user) {
      status = 400;
      msg = "Email did not match. No Such user";
    } else {
      console.log(
        "Email matched. The below code was not working hence commented for time being",
      );

      // to retrieve user saved password - as per - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values
      
      const userStoredPassword = Object.values(user)[4];

      const result = await hash.verify(password, userStoredPassword);
      if (!result) {
        console.log("Invalid Data entered");
        status = 401;
        msg = "Entered value input is wrong";
      } else {
        status = 202; //In recoding - 18 - 200 is used.
        jwt = await token.generate(context, user._id.$oid);
        context.cookies.set('jwt', jwt);
        console.log(`JWT: ${jwt}`);
        msg = "Welcome back user";
        logInOut = true;
        logUser = email;
      }
    }
  }
  context.response.status = status;
  context.response.body = {
    msg: msg,
    jwt: jwt,
    email: user.email,
    login: logInOut
  };
};

export const logout = (context: any) =>{
  logInOut = false;
  logUser = "";
  context.response.body = "User has logged out";
};
