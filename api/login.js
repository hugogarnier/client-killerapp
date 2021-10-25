import axios from "axios";
import { storeData } from "./asyncStorage";

const login = async ({ email, password }) => {
  try {
    const user = await axios({
      method: "post",
      url: "http://localhost:3000/login",
      data: {
        email: email,
        password: password,
      },
    });
    console.log(user);
    const token = user.headers.authorization.replace("Bearer ", "");
    storeData(token);

    return true;
  } catch (error) {
    return false;
  }
};

export default login;
