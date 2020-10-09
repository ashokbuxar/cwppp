export default {
  async validateAddUser(user: any) {
    let error: any = [];
    let validate = true;
    const fields = ["firstName", "lastName", "email", "password"];
    fields.forEach((item, index) => {
      if (!user[item]) {
        error.push({ [item]: `${item} field is required` });
        validate = false;
      }
    });
    return { validate, error };
  },

  async validateLogin(User: any) {
    console.log(User.email);
    let error: any = [];
    let validate = true;
    const fields = ["email", "password"];
    fields.forEach((item, index) => {
      if (!User[item]) {
        error.push({ [item]: `${item} field is required` });
        validate = false;
      }
    });
    return { validate, error };
  },
};
