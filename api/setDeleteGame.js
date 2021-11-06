import axios from "axios";
import { getStoreData } from "./asyncStorage";

const setDeleteGame = async (code) => {
  let isGameExists = false;
  try {
    const token = await getStoreData();

    if (token) {
      const game = await axios({
        method: "post",
        url: `http://192.168.1.48:3000/deletegame`,
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
    console.log(error);
    return { isGameExists };
  }
};

export default setDeleteGame;
