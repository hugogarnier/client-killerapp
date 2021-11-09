import axios from "axios";
import { getStoreData } from "./asyncStorage";

const setDeleteGame = async (code) => {
  try {
    const token = await getStoreData();

    if (token) {
      const game = await axios({
        method: "post",
        url: `http://192.168.86.247:3000/deletegame`,
        // url: `https://killer-app-api.herokuapp.com/deletegame`,
        data: {
          code: code,
        },
        headers: {
          authorization: token,
        },
      });

      return true;
    }
    return false;
  } catch (error) {
    console.log(error, "test");
    return false;
  }
};

export default setDeleteGame;
