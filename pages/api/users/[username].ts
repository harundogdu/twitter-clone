import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { username } = req.query;

    if (!username || typeof username !== "string") {
      throw new Error("Invalid userId!");
    }

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    const userTwitCount = await prisma.post.count({
      where: {
        userId: user?.id,
      },
    });

    const userFollowCount = await prisma.user.count({
      where: {
        followingIds: {
          has: user?.id,
        },
      },
    });

    return res.status(200).json({
      ...user,
      userTwitCount,
      userFollowCount,
    });
  } catch (error: any) {
    return res.status(401).end();
  }
}
