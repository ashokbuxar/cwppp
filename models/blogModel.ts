import db from "../config/cwppMongo.ts";

// for blog summary of main page

interface Blog {
  srNo: number;
  image: string;
  title: string;
  introLink: string;
  detailLink: string;
  createdAt: Date;
}

class BlogClass {
  constructor() {}
  blogRepo = db.collection("blogCollection");

  getAllBlog = async () => {
    const allBlog = await this.blogRepo.find({});
    return allBlog;
  };

  getBlogDetail = async (srNo: number) => {
    const blogDetail = await this.blogRepo.findOne({ srNo: srNo });
    return blogDetail;
  };

  addBlog = async (inputBlogDetails: Blog) => {
    const blogSrNo = inputBlogDetails.srNo;
    const blogImage = inputBlogDetails.image;
    const blogTitle = inputBlogDetails.title;
    const blogText = inputBlogDetails.introLink;
    const blogUrl = inputBlogDetails.detailLink;
    const blogCreatedAt = inputBlogDetails.createdAt;
    const createBlog = await this.blogRepo.insertOne(
      {
        srNo: blogSrNo,
        image: blogImage,
        title: blogTitle,
        introLink: blogText,
        detailLink: blogUrl,
        createdAt: blogCreatedAt,
      },
    );
    return createBlog;
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
export default BlogClass;
