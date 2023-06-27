import { useCallback, useState } from "react";

import { useRouter } from "next/router";
import { RiSearchLine } from "react-icons/ri";

import Avatar from "@/components/Avatar";
import { IUser } from "@/types/user.type";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUsers from "@/hooks/useUsers";
import useSearch from "@/hooks/useSearch";
import { set } from "date-fns";

const Searchbar = () => {
  const [searchResults, setSearchResults] = useState<IUser[]>([]);
  const [searchMessage, setSearchMessage] = useState<string>("");

  const router = useRouter();
  const { searchUsers } = useSearch();

  const searchOnChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const results = await searchUsers(e.target.value);
      setTimeout(() => {
        if (e.target.value.length < 0 || e.target.value.length === 0) {
          setSearchResults([]);
          setSearchMessage("Try searching for people");
        } else {
          setSearchResults(results);
          setSearchMessage("");
        }
      }, 400);
    },
    [searchUsers]
  );

  const searchOnClick = useCallback(() => {
    if (searchResults.length < 0 || searchResults === null) {
      setSearchResults([]);
    }
  }, [searchResults]);

  return (
    <div className="pl-2">
      <div className=" relative w-[21rem] h-12 bg-custom-lightBlack mt-2 ml-8 rounded-full flex justify-start items-center z-50">
        <RiSearchLine className="ml-5 text-custom-lightGray" size={18} />
        <input
          type="text"
          placeholder="Search"
          className="bg-inherit rounded-full pl-3 focus:border-none focus:outline-none text-custom-white"
          onChange={searchOnChange}
          onClick={searchOnClick}
        />
        <div className="absolute bg-custom-black top-14 w-full z-10   ">
          {searchUsers.length > 0 && (
            <div className="shadow-customSecondary  rounded-lg ">
              {searchResults.map((user: IUser) => {
                return (
                  <div
                    onClick={() => {
                      router.push(`/users/${user.username}`);
                      searchUsers("");
                    }}
                    key={user.id}
                    className="flex items-center gap-4 justify-between py-2 px-4 hover:bg-neutral-700 hover:bg-opacity-70 cursor-pointer duration-200"
                  >
                    <Avatar username={user.username} size="small" />
                    <div className="flex flex-col flex-1">
                      <h3
                        className="text-white font-bold text-sm text-ellipsis w-fit max-w-[8rem] whitespace-nowrap overflow-hidden hover:underline text-left"
                        title={user.name}
                      >
                        {user.name}
                      </h3>
                      <h5 className="text-gray-500 text-sm text-left">
                        @{user.username}
                      </h5>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
