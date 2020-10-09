import CategoryClass from "../models/categoryModel.ts";
const categoryClass = new CategoryClass();
const categoryList = [
  "Vegetable Recipes",
  "Recipes For Kids",
  "Snacks Recipes",
  "Bihari Recipes",
  "Sweet Dishes",
  "Breakfast Recipes",
  "Product Unboxing And Review",
  "Gujrati Recipes",
  "Dal And Kadhi Recipes",
  "Vrat Recipes",
];

export const allCategory = async (context: any) => {
  const allData = await categoryClass.getAllCategory();
  console.log(`all Category = ${allData}`);
  context.render("video/addCategory", { datas: allData });
};

export const addCategory = async (context: any) => {
  console.log("From add category");
  const formBody = await context.request.body({
    contentTypes: {
      text: ["application/x-www-form-urlencoded"],
    },
  });

  const params = await formBody.value;
  const video_srNo = params.get("srNo");
  //To retrieve the value of checked category items and save it into an array.
  let category = Array<string>();
  categoryList.forEach((item, index) => {
    if (params.get(item)) {
      category.push(categoryList[index]);
    }
  });
  console.log(category);
  console.log(categoryList);

  const addCategory = await categoryClass.addCategory({ video_srNo, category });
  context.response.body = {
    msg: {
      msg: "Data has been added",
      categories: category,
      addedItemId: addCategory
  }}
};
