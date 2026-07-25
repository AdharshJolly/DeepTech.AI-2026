import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import https from "https";

const APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;
const EMAIL_SECRET = process.env.GOOGLE_APPS_SCRIPT_SECRET;

const agent = new https.Agent({ rejectUnauthorized: false });

function fetchWithRedirects(url: string, maxRedirects = 5): Promise<string> {
  return new Promise((resolve, reject) => {
    const follow = (currentUrl: string, redirectsLeft: number) => {
      const req = https.get(currentUrl, { agent }, (res) => {
        if (
          res.statusCode &&
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          if (redirectsLeft <= 0) return reject(new Error("Too many redirects"));
          follow(res.headers.location, redirectsLeft - 1);
          return;
        }

        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
        res.on("error", reject);
      });
      req.on("error", reject);
    };
    follow(url, maxRedirects);
  });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ quota: 100, remaining: 100 });
  }

  if (!APPS_SCRIPT_URL) {
    return NextResponse.json({ quota: 100, remaining: 100 });
  }

  try {
    const url = `${APPS_SCRIPT_URL}?action=getQuota&secret=${EMAIL_SECRET}`;
    const text = await fetchWithRedirects(url);
    const data = JSON.parse(text);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ quota: 100, remaining: 100 });
  }
}
