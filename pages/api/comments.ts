import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    const { body } = req.body;
    const { postId } = req.query;

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid post id");
    }

    const comment = await prisma?.comment.create({
      data: {
        body,
        userId: currentUser?.id as string,
        postId: postId as string,
      },
    });

    return res.status(200).json(comment);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
