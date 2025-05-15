import type { Problem, ProblemDetails } from "@/lib/types"

export async function fetchContestProblems(contestCode: string): Promise<Problem[]> {
  try {
    // Check if we have cached data in localStorage
    const cacheKey = `contest-${contestCode}`
    const cachedData = localStorage.getItem(cacheKey)

    if (cachedData) {
      return JSON.parse(cachedData)
    }

    const response = await fetch(`/api/contest?code=${contestCode}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch contest ${contestCode}`)
    }
    const data = await response.json()

    // Cache the response in localStorage
    if (data.problems && data.problems.length > 0) {
      localStorage.setItem(cacheKey, JSON.stringify(data.problems))
    }

    return data.problems || []
  } catch (error) {
    console.error(`Error fetching contest ${contestCode}:`, error)
    return []
  }
}

export async function fetchProblemDetails(problemCode: string): Promise<ProblemDetails | null> {
  try {
    // Check if we have cached data in localStorage
    const cacheKey = `problem-${problemCode}`
    const cachedData = localStorage.getItem(cacheKey)

    if (cachedData) {
      return JSON.parse(cachedData)
    }

    const response = await fetch(`/api/problem?code=${problemCode}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch problem details for ${problemCode}`)
    }
    const data = await response.json()

    // Cache the response in localStorage
    localStorage.setItem(cacheKey, JSON.stringify(data))

    return data
  } catch (error) {
    console.error(`Error fetching problem details for ${problemCode}:`, error)
    return null
  }
}
