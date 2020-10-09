import CommentClass from "../models/commentModel.ts";

const commentClass = new CommentClass();

export const allComment = async (context: any) => {
  console.log("from commentController allComment file");
  const allData = await commentClass.getAllComment();
  context.render("comment/comments", { datas: allData });
};

export const addComment = async (context: any) => {
  console.log("from commentController addComment function");
  const formBody = await context.request.body({
    contentTypes: {
      text: ["application/x-www-form-urlencoded"],
    },
  });
  const srNo = formBody.value.get("srNo");
  console.log(`srNo: ${srNo}`);
  const comment = formBody.value.get("comment");
  const user = formBody.value.get("user");
  const blog = formBody.value.get("blog");
  const parent = formBody.value.get("parent");
  const time = new Date();
  
  const createCommentId = await commentClass.addComment({ srNo, comment, user, blog, parent, time});
  context.response.body = {
    createdCommentId: createCommentId,
    msg: "Data has been added",
  };
};

// export const updateDeleteList = async (context: any) => {
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

// export const deleteList = async (context: any) => {
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

// export const updateList = async (context: any) => {
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
