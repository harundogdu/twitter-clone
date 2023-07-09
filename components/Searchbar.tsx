import { useCallback, useRef, useState } from "react";

import { debounce } from "lodash";
import { useRouter } from "next/router";
import { RiSearchLine, RiCloseFill } from "react-icons/ri";

import Avatar from "@/components/Avatar";

import { IUser } from "@/types/user.type";

import useSearch from "@/hooks/useSearch";

const SearchBar = () => {
  const [searchResults, setSearchResults] = useState<IUser[]>([]);
  const [searchValue, setSearchValue] = useState();

  const router = useRouter();
  const { searchUsers } = useSearch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchOnChange = useCallback(
    debounce(async (event) => {
      console.log(searchValue);
      const searchText = event.target.value;
      await getUsers(searchText);
      console.log(searchText);
    }, 400),
    [searchUsers]
  );

  const getUsers = async (searchText: string) => {
    if (searchText.length > 0) {
      const users = await searchUsers(searchText);
      setSearchResults(users);
    } else {
      setSearchResults([]);
    }
  };

  const searchOnClick = useCallback(() => {
    if (searchResults.length < 0 || searchResults === null) {
      setSearchResults([]);
    }
  }, [searchResults]);

  return (
    <div className="pl-2">
      <div className=" relative w-[21rem] h-12 bg-custom-lightBlack mt-2 ml-8 rounded-full flex justify-start items-center z-30">
        <RiSearchLine className="ml-5 text-custom-lightGray" size={18} />
        <input
          type="text"
          placeholder="Search"
          className="bg-inherit rounded-full w-full pl-3 focus:border-none focus:outline-none text-custom-white"
          onChange={searchOnChange}
          value={searchValue}
          onClick={searchOnClick}
        />
        {searchResults.length > 0 && (
          <RiCloseFill className="absolute right-5 rounded-full bg-custom-blue w-5 h-5 cursor-pointer" />
        )}
        <div className="absolute bg-custom-black top-14 w-full z-10   ">
          {searchResults.length > 0 && (
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

export default SearchBar;
