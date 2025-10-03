import { getAccessToken } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const res = new NextResponse();
  const accessToken = await getAccessToken(req, res);
  return NextResponse.json(accessToken.accessToken, res);
};
