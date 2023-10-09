import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";

import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    throw new Error("Method not allowed");
  }
  try {
    const { postId } = req.body;
    const { currentUser } = await serverAuth(req, res);

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid request");
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error("Invalid request");
    }

    let updatedLikes = [...(post?.likedIds || [])];
    if (updatedLikes.includes(currentUser.id)) {
      updatedLikes = updatedLikes.filter((id) => id !== currentUser.id);
    } else {
      updatedLikes.push(currentUser.id);

      try {
        const post = await prisma.post.findUnique({
          where: {
            id: postId,
          },
        });

        if (post?.userId) {
          await prisma.notification.create({
            data: {
              body: "Someone liked your post",
              userId: post.userId,
            },
          });

          await prisma.user.update({
            where: {
              id: post.userId,
            },
            data: {
              hasNotification: true,
            },
          });
        }
      } catch (error: any) {
        console.log(error);
      }
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikes,
      },
    });

    res.status(200).json({
      success: true,
      data: updatedPost,
    });
  } catch (e: any) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
}
