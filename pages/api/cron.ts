import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { exec } = require("child_process");
  const path = require("path");
  const bashFilePath = path.join(__dirname, "cron.sh");
  exec(`bash ${bashFilePath}`, (error: any, stdout: any, stderr: any) => {
    if (error) {
      return response.status(500).json({ message: error.message });
    }

    return response
      .status(200)
      .json({ message: "Main and master branches merged" });
  });
}
