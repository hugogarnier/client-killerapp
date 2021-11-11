import axios from "axios";
import { getStoreData } from "./asyncStorage";

const setKill = async (code) => {
  try {
    const token = await getStoreData();

    if (token) {
      const game = await axios({
        method: "post",
        // url: `https://192.168.86.33:3000/kill`,
        url: `https://killer-app-api.herokuapp.com/kill`,
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

export default setKill;
