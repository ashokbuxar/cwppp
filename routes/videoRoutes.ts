import { Router } from "../deps.ts";
import {
  // index,
  allVideo,
  addVideo,
} from "../controllers/videoController.ts";

const router = new Router();

router
  // .get("/", index)
  .get("/all-video", allVideo)
  .post("/add-video", addVideo);

export default router;
