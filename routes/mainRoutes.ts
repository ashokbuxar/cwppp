import { Router } from "../deps.ts";
import {index} from "../controllers/mainController.ts";

const router = new Router();

router
  .get("/", index);

export default router;
