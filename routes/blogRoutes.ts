import { Router } from "../deps.ts";
import {
  allBlog,
  addBlog,
  showBlog,
//   deleteBlog,
//   updateBlog,
//   updateDeleteBlog
} from "../controllers/blogController.ts";

const router = new Router();

router
  .get("/blogs", allBlog)
  .get("/blogs/:blog", showBlog)
  .post("/add-blog", addBlog);

//   .post("/update-delete-blog", updateDeleteBlog)
//   .delete("/delete/:blogId", deleteBlog)
//   .patch("/update/:blogId", updateBlog);

export default router;
