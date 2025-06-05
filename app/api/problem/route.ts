import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const problemCode = searchParams.get("code");

  if (!problemCode) {
    return NextResponse.json(
      { error: "Problem code is required" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      `https://www.codechef.com/api/contests/PRACTICE/problems/${problemCode}`,
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch problem details for ${problemCode}` },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json({
      difficulty_rating: data.difficulty_rating || 0,
    });
  } catch (error) {
    console.error(`Error fetching problem details for ${problemCode}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch problem details" },
      { status: 500 },
    );
  }
}
