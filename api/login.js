import axios from "axios";
import { storeData } from "./asyncStorage";

const login = async ({ email, password }) => {
  try {
    const user = await axios({
      method: "post",
      url: `http://192.168.86.247:3000/login`,
      // url: `https://killer-app-api.herokuapp.com/login`,
      data: {
        email: email,
        password: password,
      },
    });

    const token = user.headers.authorization.replace("Bearer ", "");
    storeData(token);

    return true;
  } catch (error) {
    return false;
  }
};

export default login;
