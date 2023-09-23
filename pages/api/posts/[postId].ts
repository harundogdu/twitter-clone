import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    const { postId } = req.query;

    if (!postId || typeof postId !== "string") {
      res.status(400).json({ message: "Invalid post id" });
      return;
    }

    const post = await prismadb.post.findUnique({
      where: {
        id: postId as string,
      },
      include: {
        user: true,
        Comment: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json(post);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
