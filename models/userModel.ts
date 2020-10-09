import db from "../config/cwppMongo.ts";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
}

class UserClass {
  constructor() {}
  userRepo = db.collection("userCollection");

  getAllUser = async () => {
    const allUser = await this.userRepo.find({});
    return allUser;
  };
  getOneUser = async (id: string) => {
    const user1 = await this.userRepo.findOne({ _id: {$oid: id }});
    return user1;
  }

  addUser = async (inputUserDetails: User) => {
    const userFirstName = inputUserDetails.firstName;
    const userLastName = inputUserDetails.lastName;
    const userEmail = inputUserDetails.email;
    const userPassword = inputUserDetails.password;
    const createdAt = inputUserDetails.createdAt;
    const createUser = await this.userRepo.insertOne(
      {
        firstName: userFirstName,
        lastName: userLastName,
        email: userEmail,
        password: userPassword,
        createdAt: createdAt,
      },
    );
    return createUser;
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

export default UserClass;
