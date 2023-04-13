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
    const { userId } = req.query;

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid userId!");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const userFollowCount = await prisma.user.count({
      where: {
        followingIds: {
          has: userId,
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
