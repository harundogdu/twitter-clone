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
    const { username, name } = req.query;

    if (
      !username ||
      typeof username !== "string" ||
      !name ||
      typeof name !== "string"
    ) {
      throw new Error("Invalid username or name");
    }

    const searchedUsers = await prisma.user.findMany({
      where: {
        username: {
          contains: username,
        },
        name: {
          contains: name,
        },
      },
    });

    if (!searchedUsers) {
      throw new Error("User not found");
    }

    return res.status(200).json({ users: searchedUsers });
  } catch (error: any) {
    return res.status(401).end();
  }
}
