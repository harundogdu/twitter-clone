import router from "next/router";

import { REGEX } from "@/utils/constants";

const validateEmail = (email: string): boolean => {
  const emailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

const clearProtocol = (url: string): string => {
  return url.replace(/(^\w+:|^)\/\//, "").replace("www.", "");
};

const getURLText = (url: string) => {
  if (url.includes("youtu.be")) {
    url = url.replace("youtu.be/", "https://youtube.com/watch?v=");
  }

  try {
    const match = url.match(REGEX.URL_REGEX);
    if (!match) return false;
    const website = match[0];
    if (!website) return false;
    return website;
  } catch {
    return false;
  }
};

const handleURL = (url: string) => {
  if (!url) return;
  if (
    url.includes("https") ||
    url.includes("http") ||
    url.includes("www") ||
    REGEX.URL_REGEX.test(url) ||
    REGEX.YOUTUBE_URL_REGEX.test(url)
  ) {
    if (!getURLText(url)) return;
    if (url.includes("youtu.be")) {
      return url.replace("youtu.be/", "youtube.com/watch?v=");
    }
    const newURL = getURLText(url);
    if (!newURL) return;
    return newURL;
  }
  return `https://${url}`;
};

const controlLink = (text: string): string => {
  let formattedText = text;

  if (REGEX.USER_REGEX.test(text)) {
    formattedText = formattedText.replace(
      REGEX.USER_REGEX,
      `<span class="text-primary-main user-link cursor-pointer" data-username="$1">@$1</span>`
    );
  }

  if (handleURL(text)) {
    const match = text.match(REGEX.URL_REGEX);
    const allMatches = match?.[0].split(" ");

    let urlText = "";
    allMatches?.forEach((match) => {
      let innerFinalURL = match;
      if (!match.includes("http") && !match.includes("https")) {
        innerFinalURL = `https://${match}`;
      }

      urlText += innerFinalURL + " ";
    });

    formattedText = formattedText.replace(
      REGEX.URL_REGEX,
      urlText
        .split(" ")
        .map((text) => {
          return `<a id="external-url" href="${text}" target="_blank" class="text-primary-main cursor-pointer">${clearProtocol(
            text
          )}</a>`;
        })
        .filter((text, i, arr) => arr.indexOf(text) === i)
        .join(" ")
    );

    return formattedText;
  }

  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains("user-link")) {
      const username = target.getAttribute("data-username");
      if (username) {
        onClick(username);
      }
    }
  });

  const onClick = (username: string) => {
    const url = `/users/${username}`;
    router.push(url);
  };

  return formattedText;
};

const isNullOrUndefined = (value: any) => {
  return value === null || value === undefined;
};

const isNullOrEmpty = (value: any) => {
  return value === null || value === "" || value === undefined;
};

function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}

export {
  isNullOrUndefined,
  isNullOrEmpty,
  validateEmail,
  controlLink,
  exclude,
};
