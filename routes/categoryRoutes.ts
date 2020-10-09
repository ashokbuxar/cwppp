import { Router } from "../deps.ts";

import {
  allCategory,
  addCategory,
} from "../controllers/categoryController.ts";

const router = new Router();

router
  .get("/all-category", allCategory)
  .post("/add-category", addCategory);

export default router;
