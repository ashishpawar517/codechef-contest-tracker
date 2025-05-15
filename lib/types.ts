export interface Problem {
  code: string
  name: string
  successful_submissions: string
  accuracy: number
  problem_url: string
  category_name: string
}

export interface ProblemDetails {
  difficulty_rating: number
  [key: string]: any
}

export interface ContestData {
  status: string
  code: string
  name: string
  problems: {
    [key: string]: {
      code: string
      name: string
      successful_submissions: string
      accuracy: number
      problem_url: string
      category_name: string
      [key: string]: any
    }
  }
}
