import { Application, send, RouterContext } from "./deps.ts";
import {parse} from "./deps.ts"; 
import { config } from "./deps.ts";
import mainRoute from "./routes/mainRoutes.ts";
import listRoute from "./routes/listRoutes.ts";
import videoRoute from "./routes/videoRoutes.ts";
import categoryRoute from "./routes/categoryRoutes.ts";
import userRoute from "./routes/userRoutes.ts";
import blogRoute from "./routes/blogRoutes.ts";
import commentRoute from "./routes/commentRoutes.ts";
import authMiddleware from "./middleware/authMiddleware.ts";
import protectedRouter from "./routes/protectedRoutes.ts";
import notFound from "./404.ts";
import {
  viewEngine,
  engineFactory,
  adapterFactory,
} from "./deps.ts";
import { login } from "./controllers/authController.ts";

// start. for deploying on heroku as per recoding Code.
const {args, exit} = Deno;
const DEFAULT_PORT = 8000;
const argPort = parse(args).port;
const port = argPort ? Number(argPort) : DEFAULT_PORT;
if(isNaN(port)){
  console.log("This port is not a number");
  exit(1);
}

// end

const app = new Application();

// start - below code declares a global variable 'loginout'. to know whether user has logged in or not. variable 'login' can not be used as it is a constant.
declare global {
  var logInOut: boolean;
  var logUser: string;
  interface Window {
    logInOut: boolean;
    logUser: string;
  }
}
window.logInOut = false;
window.logUser = "";

// End

const env = config();
const HOST = env.APP_HOST || "localhost";
// in place of parseInt() we can use + sign also.
// const PORT =parseInt(env.APP_POST) || 4000;
const PORT = +env.APP_PORT || 8000;

const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();
app.use(viewEngine(oakAdapter, ejsEngine, {
  viewRoot: "./views",
  viewExt: ".ejs",
}));

// Logger
app.use(async (context, next) => {
  await next();
  const rt = context.response.headers.get("X-Response-Time");
  console.log(`${context.request.method} ${context.request.url} - ${rt}`);
});

// Timing
app.use(async (context, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  context.response.headers.set("X-Response-Time", `${ms}ms`);
});

app.use(mainRoute.routes());
app.use(mainRoute.allowedMethods());

app.use(videoRoute.routes());
app.use(videoRoute.allowedMethods());

app.use(categoryRoute.routes());
app.use(categoryRoute.allowedMethods());

app.use(userRoute.routes());
app.use(userRoute.allowedMethods());

app.use(listRoute.routes());
app.use(listRoute.allowedMethods());

app.use(blogRoute.routes());
app.use(blogRoute.allowedMethods());

app.use(commentRoute.routes());
app.use(commentRoute.allowedMethods());

app.use(async (context, next) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/static`,
  });
  next();
});

app.use(async (context: any, next)=>{
  console.log(context.request.headers);
  await next();
}); 


app.addEventListener('error', evt => {
  console.log(evt.error);
});

// app.use(async (context, next)=>{
//   await authMiddleware.authorized(context, next);
// });
// app.use(protectedRouter.routes());
// app.use(notFound);

app.addEventListener("listen", ({hostname, port, secure})=>{
  console.log(`Listening on ${secure ? "https://" : "http://"}${hostname || 'localhost'}:${port}`);
});

// console.log(`server started at: ${HOST}:${PORT}`);
app.listen({ port: PORT });

// for deploying on heroku
console.log(`server started at: ${HOST}:${port}`);
await app.listen({ port: port });