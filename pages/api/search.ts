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
      throw new Error("Invalid username or name");
    }

    const searchedUsersByUserName = await prisma.user.findMany({
      where: {
        username: {
          contains: username,
          mode: "insensitive",
        },
      },
    });

    const searchedUsersByName = await prisma.user.findMany({
      where: {
        name: {
          contains: username,
          mode: "insensitive",
        },
      },
    });

    const searchedUserList = searchedUsersByName.concat(
      searchedUsersByUserName
    );

    const searchedUserListUnique = searchedUserList.filter(
      (user, index, self) =>
        index ===
        self.findIndex((t) => t.username === user.username && t.id === user.id)
    );

    if (!searchedUserListUnique) {
      throw new Error("No users found");
    }

    return res.status(200).json({ users: searchedUserListUnique });
  } catch (error: any) {
    return res.status(401).end();
  }
}
