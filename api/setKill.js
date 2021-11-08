import axios from "axios";
import { getStoreData } from "./asyncStorage";

const setKill = async (code) => {
  try {
    const token = await getStoreData();

    if (token) {
      const game = await axios({
        method: "post",
        url: `http://localhost:3000/kill`,
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
