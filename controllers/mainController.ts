import VideoClass from "../models/videoModel.ts";
import BlogClass from "../models/blogModel.ts";
import CommentClass from "../models/commentModel.ts";

const videoClass = new VideoClass();
const blogClass = new BlogClass();
const commentClass = new CommentClass();

export const index = async (context: any) => {
  const allData = await videoClass.getAllVideo();
  const allBlogs = await blogClass.getAllBlog();
  const allComments = await commentClass.getAllComment();
  console.log(`allBlogs: ${allBlogs}`);
  // console.log(`allBlogs.introLink: ${allBlogs.introLink}`);
  // console.log(`allBlogs.detailLink: ${allBlogs.detailLink}`);
  console.log("From main Controller");
  context.render("main/index", { datas: allData, blogs: allBlogs, comments: allComments, logStatus: logInOut, logUser: logUser});
};