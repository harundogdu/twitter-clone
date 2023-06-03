import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    switch (req.method) {
      case "POST":
        const { body } = req.body;

        const post = await prisma.post.create({
          data: {
            body,
            userId: currentUser.id,
          },
        });

        return res.status(201).json(post);
      case "GET":
      default:
        const { userId } = req.query;

        let posts = [];

        if (userId && typeof userId === "string") {
          posts = await prisma.post.findMany({
            where: {
              userId,
            },
            include: {
              user: {
                select: {
                  name: true,
                  username: true,
                  hashedPassword: false,
                  profileImage: true,
                },
              },
              Comment: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          });
        } else {
          posts = await prisma.post.findMany({
            where: {
              userId: {
                in: [...(currentUser.followingIds || []), currentUser.id],
              },
            },
            include: {
              user: {
                select: {
                  name: true,
                  username: true,
                  hashedPassword: false,
                  profileImage: true,
                },
              },
              Comment: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          });
        }

        return res.status(200).json(posts);
    }
  } catch (error: any) {
    return res.status(500).end();
  }
}
