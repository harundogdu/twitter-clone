import Header from "@/components/shared/Header";

import PostForm from "@/components/PostForm";
import PostFeeds from "@/components/posts/PostFeeds";

export default function Home() {
  return (
    <main className="text-white">
      <Header label="Home" />
      <PostForm placeholder="Whats happening?" />
      <PostFeeds />
    </main>
  );
}
