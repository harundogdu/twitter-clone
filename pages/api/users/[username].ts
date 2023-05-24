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

    const userFollowCount = await prisma.user.count({
      where: {
        followingIds: {
          has: user?.id,
        },
      },
    });

    return res.status(200).json({
      ...user,
      userFollowCount,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(401).end();
  }
}
