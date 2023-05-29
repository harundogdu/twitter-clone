import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    switch (req.method) {
      case "POST":
        const { currentUser } = await serverAuth(req, res);
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
