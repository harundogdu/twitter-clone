import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";
import { Like } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    const { postId } = req.body;
    const { currentUser } = await serverAuth(req, res);

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid post ID");
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    const userLikes = currentUser.likes || [];

    if (
      req.method === "POST" &&
      !userLikes.map((like) => like.postId).includes(postId)
    ) {
      await prisma.like.create({
        data: {
          postId,
          userId: currentUser.id,
        },
      });
    }

    if (
      req.method === "DELETE" &&
      userLikes.map((like) => like.postId).includes(postId)
    ) {
      const like = await prisma.like.findFirst({
        where: {
          postId,
          userId: currentUser.id,
        },
      });

      if (like) {
        await prisma.like.delete({
          where: {
            id: like.id,
          },
        });
      }
    }

    var user = await prisma.user.findUnique({
      where: {
        id: currentUser.id,
      },
      include: {
        likes: true,
      },
    });

    return res.status(200).json({ user });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
