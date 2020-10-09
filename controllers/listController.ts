import ListClass from "../models/listModel.ts";

const listClass = new ListClass();

export const allList = async (context: any) => {
  console.log("from listController allList file");
  const allData = await listClass.getAllList();
  context.render("list/toDoList", { datas: allData, async:true});
};

export const addList = async (context: any) => {
  console.log("from listController addList function");
  const formBody = await context.request.body({
    contentTypes: {
      text: ["application/x-www-form-urlencoded"],
    },
  });
  let params = await formBody.value;
  let listTitle = params.get('title');
  const isCompleted = false;
  const createListId = await listClass.addList({ listTitle, isCompleted });
  context.response.body = {
    createdListId: createListId,
    msg: "Data has been added",
  };
};

export const updateDeleteList = async (context: any) => {
console.log("From updateDeleteList");
const formBody = await context.request.body({
  contentTypes: {
    text: ["application/x-www-form-urlencoded"],
  },
});
console.log("From updateDeleteList-2");
const buttonPressed = formBody.value.get("button");
console.log(`ButtonPressed: ${buttonPressed}`);
if(buttonPressed == "delete"){
  deleteList(context);
}else if(buttonPressed == "update"){
updateList(context);
}
};

export const deleteList = async (context: any) => {
  const formBody = await context.request.body({
    contentTypes: {
      text: ["application/x-www-form-urlencoded"],
    },
  });
  const listId = formBody.value.get()
  // const listId = await context.params.listId;
  const deleteList = await listClass.deleteList(listId);
  if (deleteList == true) {
    context.response.status = 200;
    context.response.body = {
      msg: "List found and deleted",
    };
  } else {
    context.response.status = 404;
    context.response.body = {
      msg: "List not found",
    };
  }
};

export const updateList = async (context: any) => {
  const listId = await context.params.listId;
  const updateBody = await context.request.body({
    contentTypes: {
      text: ["application/x-www-form-urlencoded"],
    },
  });
  const listTitle = updateBody.value.get("title");
  const isCompleted = updateBody.value.get("completed");
  const isListUpdated = await listClass.editList(
    { listTitle, isCompleted },
    listId,
  );
  if (isListUpdated == true) {
    context.response.status = 200;
    context.response.body = {
      msg: "List has been updated",
    };
  } else {
    context.response.status = 404;
    context.response.body = {
      msg: "list not found",
    };
  }
};
// let listTitle = await context.request.body("title");
  // listTitle = await listTitle.value;
   // const listTitle = formBody.value.get("title");