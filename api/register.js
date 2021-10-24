import axios from "axios";

const login = async ({ firstname, lastname, email, password }) => {
  try {
    const user = await axios({
      method: "post",
      url: "http://localhost:3000/register",
      data: {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      },
    });
    console.log(user);
    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export default login;
