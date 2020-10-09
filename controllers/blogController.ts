import BlogClass from "../models/blogModel.ts";

const blogClass = new BlogClass();

export const allBlog = async (context: any) => {
  console.log("from blogController allBlog function");
  const allData = await blogClass.getAllBlog();
  context.render("blog/blogs", { datas: allData });
};

export const showBlog = async (context: any) => {
const blogDetail = await blogClass.getBlogDetail(context.params.blog);
console.log(blogDetail);
// context.render(blogDetail.detailLink);
};

export const addBlog = async (context: any) => {
  console.log("from blogController addBlog function");
  const formBody = await context.request.body({
    contentTypes: {
      text: ["application/x-www-form-urlencoded"],
    },
  });
  console.log("blog controller add blog function");
  const params = await formBody.value;
  const srNo = params.get("srNo");
  console.log(`srNo: ${srNo}`);
  const image = "image/".concat(params.get("image"));
  const title = params.get("title");
  let introLink1 = params.get("introLink");
  let introLink = `introduction/${introLink1}.txt`;
  let detailLink1 = params.get("detailLink");
  let detailLink = `content/${detailLink1}`;
  const createdAt = new Date();
  const introduction = params.get("introduction");
  const content = params.get("content");
  console.log(`introduction: ${introduction}`);
  // console.log(`body: ${content}`);
  const createdBlogId = await blogClass.addBlog({ srNo, image, title, introLink, detailLink, createdAt });
  
  Deno.writeTextFile(`./static/introduction/${introLink1}.txt`, introduction); // returns a promise
  Deno.writeTextFile(`./views/content/${detailLink1}.html`, content); // returns a promise


  context.response.body = {
    createdBlogId: createdBlogId, 
    msg: "Data has been added",
  };
};

// export const updateDeleteBlog = async (context: any) => {
// console.log("From updateDeleteList");
// const formBody = await context.request.body({
//   contentTypes: {
//     text: ["application/x-www-form-urlencoded"],
//   },
// });
// console.log("From updateDeleteList-2");
// const buttonPressed = formBody.value.get("button");
// console.log(`ButtonPressed: ${buttonPressed}`);
// if(buttonPressed == "delete"){
//   deleteList(context);
// }else if(buttonPressed == "update"){
// updateList(context);
// }
// };

// export const deleteBlog = async (context: any) => {
//   const formBody = await context.request.body({
//     contentTypes: {
//       text: ["application/x-www-form-urlencoded"],
//     },
//   });
//   const listId = formBody.value.get()
//   // const listId = await context.params.listId;
//   const deleteList = await listClass.deleteList(listId);
//   if (deleteList == true) {
//     context.response.status = 200;
//     context.response.body = {
//       msg: "List found and deleted",
//     };
//   } else {
//     context.response.status = 404;
//     context.response.body = {
//       msg: "List not found",
//     };
//   }
// };

// export const updateBlog = async (context: any) => {
//   const listId = await context.params.listId;
//   const updateBody = await context.request.body({
//     contentTypes: {
//       text: ["application/x-www-form-urlencoded"],
//     },
//   });
//   const listTitle = updateBody.value.get("title");
//   const isCompleted = updateBody.value.get("completed");
//   const isListUpdated = await listClass.editList(
//     { listTitle, isCompleted },
//     listId,
//   );
//   if (isListUpdated == true) {
//     context.response.status = 200;
//     context.response.body = {
//       msg: "List has been updated",
//     };
//   } else {
//     context.response.status = 404;
//     context.response.body = {
//       msg: "list not found",
//     };
//   }
// };
