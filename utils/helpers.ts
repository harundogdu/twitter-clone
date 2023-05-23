export const validateEmail = (email: string): boolean => {
  const emailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

export const controlLink = (text: string): string => {
  const userRegex = /@(\w+)/g;
  const urlRegex = /(?<!href=["']|["']>)\b\S+\.com\/\S+\b(?![^<]*?<\/a>)/g;
  var newText = text;

  if (userRegex.test(text)) {
    newText = newText.replace(
      userRegex,
      ' <a  href="$1"  style="color:#1D9BF0">@$1</a>'
    );
  }

  if (urlRegex.test(text)) {
    newText = newText.replace(
      urlRegex,
      '<a href="https://$&" style="color:#1D9BF0" >$&</a>'
    );
  }

  return newText;
};
