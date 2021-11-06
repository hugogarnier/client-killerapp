import axios from "axios";
import { getStoreData } from "./asyncStorage";

const setStartGame = async (code) => {
  try {
    const token = await getStoreData();

    if (token) {
      const game = await axios({
        method: "post",
        url: `http://192.168.1.48:3000/startgame`,
        data: {
          code: code,
        },
        headers: {
          authorization: token,
        },
      });

      if (game) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  } catch (error) {
    return false;
  }
};

export default setStartGame;
