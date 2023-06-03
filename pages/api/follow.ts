import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    const { username } = req.body;
    const { currentUser } = await serverAuth(req, res);

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

    let updatingFollowingIds = [...(currentUser.followingIds || [])];

    if (req.method === "POST") {
      updatingFollowingIds.push(user.id);
    }

    if (req.method === "DELETE") {
      updatingFollowingIds = updatingFollowingIds.filter(
        (id) => id !== user.id
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatingFollowingIds,
      },
    });

    return res.status(200).json({ user: updatedUser });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
