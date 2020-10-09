import { Router } from "../deps.ts";
import {
  allComment,
  addComment,
//   deleteList,
//   updateList,
//   updateDeleteList
} from "../controllers/commentController.ts";

const router = new Router();

router
  .get("/comments", allComment)
  .post("/add-comment", addComment)
//   .post("/update-delete-list", updateDeleteList)
//   .delete("/delete/:listId", deleteList)
//   .patch("/update/:listId", updateList);

export default router;