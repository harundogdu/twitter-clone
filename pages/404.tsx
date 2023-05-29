import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="flex justify-center items-center flex-col mt-24">
      <p style={{ color: "#71767B" }}>
        Hmm...this page doesn't exist. Try searching for something else.
      </p>
      <button
        style={{
          background: "#1f9bf0",
          color: "#fff",
          padding: "0.3rem 1rem",
          marginTop: "1.5rem",
          fontWeight: 700,
          borderRadius: "16px",
        }}
      >
        <Link href="/">Search</Link>
      </button>
    </div>
  );
};
export default Custom404;
