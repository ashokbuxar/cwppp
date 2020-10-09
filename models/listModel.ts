import db from "../config/cwppMongo.ts";

interface List {
  listTitle: string;
  isCompleted: boolean;
}

class ListClass {
  constructor() {}
  listRepo = db.collection("listCollection");

  getAllList = async () => {
    const allList = await this.listRepo.find({});
    return allList;
  };

  addList = async (inputListDetails: List) => {
    const listTitle = inputListDetails.listTitle;
    const isCompleted = inputListDetails.isCompleted;
    const createList = await this.listRepo.insertOne(
      { title: listTitle, completed: isCompleted },
    );
    return createList;
  };

  deleteList = async (listId: string) => {
    const isListIdDelete = await this.listRepo.deleteOne({
      _id: { $oid: listId },
    });
    if (isListIdDelete) {
      return true;
    } else {
      return false;
    }
  };

  editList = async (inputListDetails: List, listId: string) => {
    const listTitle = inputListDetails.listTitle;
    const isCompleted = inputListDetails.isCompleted;
    const { matchedCount, modifiedCount, upsertedId } = await this.listRepo
      .updateOne(
        { _id: { $oid: listId } },
        { $set: { title: listTitle, completed: isCompleted } },
      );
    if (matchedCount != 0) {
      return true;
    } else {
      return false;
    }
  };
}

export default ListClass;
