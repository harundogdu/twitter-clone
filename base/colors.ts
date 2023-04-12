const ColorUtils = {
  colors: {
    blue: "#1f9bf0",
    green: "#05b97c",
    pink: "#f9197f",
    yellow: "#ffd401",
    purple: "#7956ff",
    orange: "#ff7a00",
    red: "#ff0000",
    white: "#ffffff",
    black: "#000000",
    gray: "#f2f2f2",
    darkGray: "#333333",
    lightGray: "#999999",
    main: "#1f9bf0",
  },
  darken: (color: string, percent: number) => {
    const num = parseInt(color.replace("#", ""), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      G = ((num >> 8) & 0x00ff) + amt,
      B = (num & 0x0000ff) + amt;
    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  },
  lighten: (color: string, percent: number) => {
    const num = parseInt(color.replace("#", ""), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) - amt,
      G = ((num >> 8) & 0x00ff) - amt,
      B = (num & 0x0000ff) - amt;
    return (
      "#" +
      (
        0x1000000 +
        (R > 255 ? (R > 1 ? 0 : R) : 255) * 0x10000 +
        (G > 255 ? (G > 1 ? 0 : G) : 255) * 0x100 +
        (B > 255 ? (B > 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  },
};

export default ColorUtils;
