import { useCallback } from "react";
import axios from "axios";

const useSearch = () => {
  const searchUsers = useCallback(async (username: string) => {
    if (username === "" || username === undefined || username === null) {
      return [];
    }
    try {
      const { data } = await axios.get(`/api/search`, {
        params: {
          username: username,
        },
      });

      return data.users;
    } catch (error: any) {
      console.log(error);
      return [];
    }
  }, []);

  return {
    searchUsers,
  };
};
export default useSearch;
