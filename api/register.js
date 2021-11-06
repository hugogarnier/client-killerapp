import axios from "axios";

const login = async ({ firstname, lastname, email, password }) => {
  try {
    const user = await axios({
      method: "post",
      url: "http://192.168.1.48:3000/register",
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
