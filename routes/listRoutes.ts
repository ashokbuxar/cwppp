import { Router } from "../deps.ts";
import {
  allList,
  addList,
  deleteList,
  updateList,
  updateDeleteList
} from "../controllers/listController.ts";

const router = new Router();

router
  .get("/lists", allList)
  .post("/add-list", addList)
  .post("/update-delete-list", updateDeleteList)
  .delete("/delete/:listId", deleteList)
  .patch("/update/:listId", updateList);

export default router;
