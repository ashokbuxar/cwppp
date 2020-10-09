import UserClass from "../models/userModel.ts";
import VideoClass from "../models/videoModel.ts";
import validation from "../validation.ts";
import hash from "../util/hash.ts";

const userClass = new UserClass();
const videoClass = new VideoClass();

export const allUser = async (context: any) => {
  const allData = await userClass.getAllUser();
  context.render("user/index", { datas: allData, logStatus: logInOut, logUser: logUser });
};

export const addUser = async (context: any) => {
  const formBody = await context.request.body({
    contentTypes: {
      text: ["application/x-www-form-urlencoded"],
    },
  });
  const params = await formBody.value;
  const firstName = params.get("firstName");
  const lastName = params.get("lastName");
  const email = params.get("email");
  const password = await hash.encrypt(params.get("password"));
  const createdAt = new Date();
  const user = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  };
  const { validate, error } = await validation.validateAddUser(user);
  console.log({ error: error });
  if (validate) {
    const insertId = await userClass.addUser(
      { firstName, lastName, email, password, createdAt },
    );
    context.response.body = insertId;
  }
};















// export const addUser = async (context: any) => {
//   console.log('from userController addUser function');
//   const validate = await validation.validateAddUser(context);
//   if(validate){
//   const insertId = await userClass.addUser(validate);
//   context.response.body = insertId;
//   }
// }

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
