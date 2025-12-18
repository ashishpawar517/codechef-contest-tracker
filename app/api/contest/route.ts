import { type NextRequest, NextResponse } from "next/server";
import type { Problem } from "@/lib/types";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const contestCode = searchParams.get("code");

  // Validate contestCode: only allow alphanumeric, underscores and hyphens
  if (!contestCode) {
    return NextResponse.json(
      { error: "Contest code is required" },
      { status: 400 },
    );
  }
  if (!/^[A-Za-z0-9_-]+$/.test(contestCode)) {
    return NextResponse.json(
      { error: "Invalid contest code format" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      `https://www.codechef.com/api/contests/${contestCode}`,
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch contest data for ${contestCode}` },
        { status: response.status },
      );
    }

    const data = await response.json();

    if (data.status !== "success" || !data.problems) {
      return NextResponse.json({ problems: [] });
    }

    // Filter problems to only include those with category_name as "main"
    const mainProblems: Problem[] = Object.values(data.problems)
      .filter((problem: any) => problem.category_name === "main")
      .map((problem: any) => ({
        code: problem.code,
        name: problem.name,
        successful_submissions: problem.successful_submissions,
        accuracy: problem.accuracy,
        problem_url: problem.problem_url,
        category_name: problem.category_name,
      }));

    return NextResponse.json({ problems: mainProblems });
  } catch (error) {
    console.error(`Error fetching contest ${contestCode}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch contest data" },
      { status: 500 },
    );
  }
}
