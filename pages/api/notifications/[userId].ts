import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { userId } = req.query;

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid user ID");
    }

    const notifications = await prisma.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });

    await prisma.user.update({
      where: {
        id: userId as string,
      },
      data: {
        hasNotification: false,
      },
    });

    return res.status(200).json(notifications);
  } catch (error: any) {
    console.log(error);
    res.status(500).end();
  }
}
