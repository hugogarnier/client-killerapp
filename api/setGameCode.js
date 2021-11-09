import axios from "axios";
import { getStoreData } from "./asyncStorage";

const setGameCode = async (code) => {
  let isGameExists = false;
  try {
    const token = await getStoreData();

    if (token) {
      const game = await axios({
        method: "post",
        url: `http://192.168.86.247:3000/entergame`,
        // url: `https://killer-app-api.herokuapp.com/entergame`,
        data: {
          code: code,
        },
        headers: {
          authorization: token,
        },
      });

      if (game) {
        isGameExists = true;
        return { isGameExists };
      } else {
        return { isGameExists };
      }
    }
    return { isGameExists };
  } catch (error) {
    return { isGameExists };
  }
};

export default setGameCode;
