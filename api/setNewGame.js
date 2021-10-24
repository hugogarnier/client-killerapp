import axios from "axios";
import { getStoreData } from "./asyncStorage";

const setNewGame = async ({ title, description, code }) => {
  try {
    const token = await getStoreData();
    if (token) {
      const newGame = await axios({
        method: "post",
        url: "http://localhost:3000/newgame",
        data: {
          title: title,
          description: description,
          code: code,
        },
        headers: {
          authorization: token,
        },
      });

      if (newGame) {
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

export default setNewGame;
