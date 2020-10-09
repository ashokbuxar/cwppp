import db from "../config/cwppMongo.ts";

interface Comment {
  srNo: number;
  comment: string;
  user: string;
  blog: string;
  parent: string;
  time: Date
}

class CommentClass {
  constructor() {}
  commentRepo = db.collection("commentCollection");

  getAllComment = async () => {
    const allComment = await this.commentRepo.find({});
    return allComment;
  };

  addComment = async (inputCommentDetails: Comment) => {
    const srNo = inputCommentDetails.srNo;
    const comment = inputCommentDetails.comment;
    const user = inputCommentDetails.user;
    const blog = inputCommentDetails.blog;
    const parent = inputCommentDetails.parent;
    const time = inputCommentDetails.time;
    const createComment = await this.commentRepo.insertOne(
      { srNo: srNo, comment: comment, user: user, blog: blog, parent: parent, time: time },
    );
    return createComment;
  };

//   deleteList = async (listId: string) => {
//     const isListIdDelete = await this.listRepo.deleteOne({
//       _id: { $oid: listId },
//     });
//     if (isListIdDelete) {
//       return true;
//     } else {
//       return false;
//     }
//   };

//   editList = async (inputListDetails: List, listId: string) => {
//     const listTitle = inputListDetails.listTitle;
//     const isCompleted = inputListDetails.isCompleted;
//     const { matchedCount, modifiedCount, upsertedId } = await this.listRepo
//       .updateOne(
//         { _id: { $oid: listId } },
//         { $set: { title: listTitle, completed: isCompleted } },
//       );
//     if (matchedCount != 0) {
//       return true;
//     } else {
//       return false;
//     }
//   };
}

export default CommentClass;
