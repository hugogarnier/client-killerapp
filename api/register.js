import axios from "axios";

const login = async ({ firstname, lastname, email, password }) => {
  try {
    const user = await axios({
      method: "post",
      url: `http://192.168.86.247:3000/register`,
      // url: "https://killer-app-api.herokuapp.com/register",
      data: {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      },
    });
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
