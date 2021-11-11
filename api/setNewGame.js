import axios from "axios";
import { getStoreData } from "./asyncStorage";

const setNewGame = async () => {
  try {
    const token = await getStoreData();
    if (token) {
      let randomCode = Math.random().toString(36).substring(7);

      const newGame = await axios({
        method: "post",
        // url: `https://192.168.86.33:3000/newgame`,
        url: "https://killer-app-api.herokuapp.com/newgame",
        data: {
          code: randomCode,
        },
        headers: {
          authorization: token,
        },
      });

      if (newGame) {
        return { randomCode };
      } else {
        return false;
      }
    }
    return false;
  } catch (error) {
    return false;
  }
};

export default setNewGame;
