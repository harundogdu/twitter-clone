import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);

    const usersCount = await prisma.user.count();
    const skip = Math.floor(Math.random() * usersCount);
    const users = await prisma.user.findMany({
      
      where: {
        id: {
          not: currentUser!.id,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (users.length < 3) {
      const remainingUsers = await prisma.user.findMany({
        take: 3 - users.length,
        where: {
          id: {
            not: currentUser!.id,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      users.push(...remainingUsers);
    }

    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(401).end();
  }
}
