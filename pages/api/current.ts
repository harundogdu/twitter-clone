import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    return res.status(200).json({
      success: false,
      currentUser,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(401).end();
  }
}
