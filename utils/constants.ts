const URL_REGEX =
  /(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+)\.[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)?(\/[a-zA-Z0-9\W\w]*)/;

const YOUTUBE_URL_REGEX =
  /(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

const USER_REGEX = /@(\w+)/g;

const REGEX = {
  URL_REGEX,
  USER_REGEX,
  YOUTUBE_URL_REGEX,
};

export { REGEX };
