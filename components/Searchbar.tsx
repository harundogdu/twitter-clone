import { useCallback, useEffect, useState, useRef } from "react";

import { debounce } from "lodash";
import { useRouter } from "next/router";
import { RiSearchLine, RiCloseFill } from "react-icons/ri";

import Avatar from "@/components/Avatar";

import { IUser } from "@/types/user.type";

import useSearch from "@/hooks/useSearch";

const SearchBar = () => {
  const [searchResults, setSearchResults] = useState<IUser[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchbarOn, setSearchbarOn] = useState<boolean>(false);


  
  const isBackspaceDown = useRef(false);
 

  const router = useRouter();
  const { searchUsers } = useSearch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchOnChange = useCallback(
    debounce(async (searchValue) => {
      const searchText = searchValue!.target.value;
      if (!isBackspaceDown.current) {
        await getUsers(searchText);
      }
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

  const handleCloseSearchbar = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    const attributeValue = target.getAttribute("image-data");
    if (attributeValue === "searchbar") return;
    setSearchbarOn(false);
   
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      isBackspaceDown.current = true;
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      isBackspaceDown.current = false;
    }
  };

  useEffect(() => {
    searchOnChange({ target: { value: searchValue } });
  }, [searchValue]);



  return (
    
    
    <div className="pl-2 sticky top-4 z-50 bg-custom-black  ">
      {
        searchbarOn && (
          <div className="fixed top-0 left-0 w-full h-full" onClick={(e) => {handleCloseSearchbar(e)}}/>
        )
      }
      <div className=" relative w-[21rem] h-12 bg-custom-lightBlack mt-2 ml-8 rounded-full flex justify-start items-center z-30">
        <RiSearchLine className="ml-5 text-custom-lightGray" size={18} />
        <input
          type="text"
          placeholder="Search"
          className="bg-inherit rounded-full w-full pl-3 focus:border-none focus:outline-none text-custom-white"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          onClick={() => setSearchbarOn(true)}
          value={searchValue}
         searchbar-data="searchbar"
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        />
        {searchResults.length === 0 && searchbarOn && (
          <div
            className="absolute top-14 w-full z-10 bg-custom-black"
            
          >
            <div className="shadow-customSecondary rounded-lg max-h-32 flex content-center items-start ">
              <h3 className="text-custom-lightGray p-5 text-left ">
                Try searching for people, topics, or keywords
              </h3>
            </div>
          </div>
        )}

        {searchResults.length > 0 && searchbarOn && (
          <RiCloseFill
            className="absolute right-5 rounded-full bg-custom-blue w-5 h-5 cursor-pointer z-20"
            onClick={(e) => {
              e.preventDefault();
              setSearchValue("");
              setSearchResults([]);
            }}
            
          />
        )}
        <div className="absolute bg-custom-black top-14 w-full z-10 ">
          {searchResults.length > 0 && searchbarOn && (
            <div
              className={ searchResults.length>6 ?"shadow-customSecondary rounded-lg max-h-96  overflow-y-scroll scrollbar-thin  scrollbar-thumb-neutral-500 scrollbar-track-neutral-800 scrollbar-thumb-rounded-md scrollbar-track-rounded-sm":"shadow-customSecondary rounded-lg max-h-96 " }
            
            >
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
