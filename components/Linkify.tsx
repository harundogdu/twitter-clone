import React from "react";
const Linkify: React.FC<{ text: string }> = ({ text }) => {
  const linkRegex = /((?:https?:)?(?:www.)?[^\s]+)/g;
  // Basit bir link tanıma regex'i
  const handleClick = (url: string) => {
    window.open(url, "_blank"); // Yeni sekmede açmak için
  };
  const renderText = () => {
    const parts = text.split(linkRegex);
    // Linkleri ayırma
    return parts.map((part, index) => {
      if (part.match(linkRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleClick(part)}
          >
            {" "}
            {part}{" "}
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };
  return <div>{renderText()}</div>;
};
export default Linkify;
