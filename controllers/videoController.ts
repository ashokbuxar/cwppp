import VideoClass from "../models/videoModel.ts";

const videoClass = new VideoClass();

// export const index = async (context: any) => {
//   const allData = await videoClass.getAllVideo();
//   console.log("From Video Controller");
//   context.render("video/index", { datas: allData });
// };

export const allVideo = async (context: any) => {
  const allData = await videoClass.getAllVideo();
  console.log("From Video Controller");
  context.render("video/addVideo", { datas: allData });
};

export const addVideo = async (context: any) => {
  console.log("From add video");
  const formBody = await context.request.body({
    contentTypes: {
      text: ["application/x-www-form-urlencoded"],
    },
  });
  const params = await formBody.value;
  const srNo = params.get("srNo");
  const youTubeLink = params.get("youTubeLink");
  const thumbnail = params.get("thumbnail");
  const categoryNos = params.get("categoryNos");
  await videoClass.addVideo({ srNo, youTubeLink, thumbnail, categoryNos });
  context.response.body = {
    msg: "Data has been added",
  };
};

// export const deleteList = async (context: any) => {
//   const listId = await context.params.listId;
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
