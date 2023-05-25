import { url } from "inspector";
import Router from "next/router";
import router from "next/router";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

export const validateEmail = (email: string): boolean => {
  const emailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

/* export const controlLink = (text: string): string => {
  const userRegex = /@(\w+)/g;
  const urlRegex = /(?<!href=["']|["']>)\b\S+\.com\/\S+\b(?![^<]*?<\/a>)/g;
  var newText = text;
  var username = String;

  const onClick = (username: string) => {
    username = username.replace(/'/g, " ");
    const url = `/users/${username}`;
    router.push(url);
  };

  if (userRegex.test(text)) {
    newText = newText.replace(
      userRegex,
      `<div onclick="onClick('${"$1"}')">@$1</div>`
    );
  }

  if (urlRegex.test(text)) {
    newText = newText.replace(
      urlRegex,
      '<a href="$&"  target="_blank"  style="color:#1D9BF0" >$&</a>'
    );
  }

  return newText;
}; */
export const controlLink = (text: string): string => {
  const userRegex = /@(\w+)/g;
  const urlRegex = /(?<!href=["']|["']>)\b\S+\.com\/\S+\b(?![^<]*?<\/a>)/g;
  const urlHttpsRegex = /https?:\/\/\S+/g;
  let newText = text;

  if (userRegex.test(text)) {
    newText = newText.replace(
      userRegex,
      `<div style="color:#1D9BF0" class="user-link" data-username="$1">@$1</div>`
    );
  }

  if (urlRegex.test(text)) {
    newText = newText.replace(urlRegex, (match: string, domain: string) => {
      const modifiedLink = match.replace(/https?:\/\/(?:www\.)?/i, "");
      return `<a href="${match}" target="_blank" style="color:#1D9BF0">${modifiedLink}</a>`;
    });
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

  return newText;
};

// Example usage
