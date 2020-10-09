import db from "../config/cwppMongo.ts";

interface Video {
  srNo: number;
  youTubeLink: string;
  thumbnail: string;
  categoryNos: number;
}

class VideoClass {
  constructor() {}
  videoRepo = db.collection("videoCollection");

  getAllVideo = async () => {
    const allVideo = await this.videoRepo.find({});
    return allVideo;
  };

  getOneVideo = async (srNo: any) => {
    const oneVideo = await this.videoRepo.findOne({ srNo: srNo });
    return oneVideo;
  };
  addVideo = async (inputVideoDetails: Video) => {
    const srNo = inputVideoDetails.srNo;
    const youTubeLink = inputVideoDetails.youTubeLink;
    const thumbnail = inputVideoDetails.thumbnail;
    const categoryNos = inputVideoDetails.categoryNos;
    const addVideo = await this.videoRepo.insertOne(
      {
        srNo: srNo,
        youTubeLink: youTubeLink,
        thumbnail: thumbnail,
        categoryNos: categoryNos,
      },
    );
    return addVideo;
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

export default VideoClass;
