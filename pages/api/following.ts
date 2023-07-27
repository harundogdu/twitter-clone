import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (
    req.method !== "POST" &&
    req.method !== "DELETE" &&
    req.method !== "PUT"
  ) {
    try {
      const { username } = req.query;

      if (!username || typeof username !== "string") {
        throw new Error("Invalid username");
      }

      const user = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const followers = await prisma.user.findMany({
        where: {
          followingIds: {
            has: user.id,
          },
        },
        select: {
          name: true,
          username: true,
          bio: true,
          profileImage: true,
        },
      });

      const following = await prisma.user.findMany({
        where: {
          id: {
            in: user.followingIds,
          },
        },
        select: {
          name: true,
          username: true,
          bio: true,
          profileImage: true,
        },
      });

      return res.status(200).json({
        followers,
        following,
      });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }
}
