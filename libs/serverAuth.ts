import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { exclude } from "@/utils/helpers";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      posts: true,
      comments: true,
      notifications: true,
    },
  });

  if (!currentUser) {
    throw new Error("Not signed in");
  }

  const userWithoutPassword = exclude(currentUser, ["hashedPassword"]);
  return { currentUser: userWithoutPassword };
};

export default serverAuth;
