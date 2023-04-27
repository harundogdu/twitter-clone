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

    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
      where: {
        id: {
          not: currentUser.id,
        },
      },
    });

    return res.status(200).json(users);
  } catch (error: any) {
    console.log(error);
    return res.status(401).end();
  }
}
