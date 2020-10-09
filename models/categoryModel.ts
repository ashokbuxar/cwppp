import db from "../config/cwppMongo.ts";
import VideoClass from "../models/videoModel.ts";

const videoClass = new VideoClass();

interface Category {
  video_srNo: number;
  category: Array<string>;
}

class CategoryClass {
  constructor() {}
  categoryRepo = db.collection("categoryCollection");

  getAllCategory = async () => {
    const allCategory = await this.categoryRepo.find();
    return allCategory;
  };

  addCategory = async (inputCategoryDetails: Category) => {
    const video_srNo = inputCategoryDetails.video_srNo;
    const category = inputCategoryDetails.category;
    const addCategory = await this.categoryRepo.insertOne(
      {
        video_srNo: video_srNo,
        category: category,
      },
    );
    return addCategory;
  };

  // deleteList = async (listId: string) => {
  //   const isListIdDelete = await this.videoRepo.deleteOne({
  //     _id: { $oid: listId },
  //   });
  //   if (isListIdDelete) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  // editList = async (inputListDetails: List, listId: string) => {
  //   const listTitle = inputListDetails.listTitle;
  //   const isCompleted = inputListDetails.isCompleted;
  //   const { matchedCount, modifiedCount, upsertedId } = await this.listRepo
  //     .updateOne(
  //       { _id: { $oid: listId } },
  //       { $set: { title: listTitle, completed: isCompleted } },
  //     );
  //   if (matchedCount != 0) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };
}

export default CategoryClass;
