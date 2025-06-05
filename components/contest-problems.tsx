"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { fetchContestProblems, fetchProblemDetails } from "@/lib/api";
import { Checkbox } from "@/components/ui/checkbox";
import type { Problem, ProblemDetails } from "@/lib/types";

interface ContestProblemsProps {
  division: string;
  contestsRange: {
    start: number;
    end: number;
  };
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export default function ContestProblems({
  division,
  contestsRange,
  loading,
  setLoading,
}: ContestProblemsProps) {
  const [contests, setContests] = useState<{ [key: string]: Problem[] }>({});
  const [problemDetails, setProblemDetails] = useState<{
    [key: string]: ProblemDetails;
  }>({});
  const [solvedProblems, setSolvedProblems] = useState<Set<string>>(new Set());

  // Load solved problems from localStorage on component mount
  useEffect(() => {
    const savedSolvedProblems = localStorage.getItem("solvedProblems");
    if (savedSolvedProblems) {
      setSolvedProblems(new Set(JSON.parse(savedSolvedProblems)));
    }
  }, []);

  // Save solved problems to localStorage whenever it changes
  useEffect(() => {
    if (solvedProblems.size > 0) {
      localStorage.setItem(
        "solvedProblems",
        JSON.stringify(Array.from(solvedProblems)),
      );
    }
  }, [solvedProblems]);

  useEffect(() => {
    const fetchContests = async () => {
      setLoading(true);

      // Check if we have cached data in localStorage
      const cacheKey = `contests-${division}-${contestsRange.start}-${contestsRange.end}`;
      const cachedData = localStorage.getItem(cacheKey);

      if (cachedData) {
        setContests(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      const contestsData: { [key: string]: Problem[] } = {};

      for (
        let contestNum = contestsRange.start;
        contestNum >= contestsRange.end;
        contestNum--
      ) {
        try {
          const contestCode = `START${contestNum}${division}`;
          const problems = await fetchContestProblems(contestCode);
          if (problems && problems.length > 0) {
            contestsData[contestCode] = problems;
          }
        } catch (error) {
          console.error(
            `Error fetching contest ${contestNum}${division}:`,
            error,
          );
        }
      }

      setContests(contestsData);

      // Cache the data in localStorage
      localStorage.setItem(cacheKey, JSON.stringify(contestsData));

      setLoading(false);
    };

    fetchContests();
  }, [division, contestsRange, setLoading]);

  useEffect(() => {
    const fetchAllProblemDetails = async () => {
      const details: { [key: string]: ProblemDetails } = {};
      const detailsToFetch: string[] = [];

      // Check which problems we need to fetch details for
      for (const contestCode in contests) {
        for (const problem of contests[contestCode]) {
          // Check if we already have the details or if they're in localStorage
          const cacheKey = `problem-${problem.code}`;
          const cachedDetails = localStorage.getItem(cacheKey);

          if (cachedDetails) {
            details[problem.code] = JSON.parse(cachedDetails);
          } else if (
            !problemDetails[problem.code] &&
            !detailsToFetch.includes(problem.code)
          ) {
            detailsToFetch.push(problem.code);
          }
        }
      }

      // Only update state if we have new details
      if (Object.keys(details).length > 0) {
        setProblemDetails((prev) => ({ ...prev, ...details }));
      }

      // Fetch details for problems not in cache
      for (const problemCode of detailsToFetch) {
        try {
          const problemDetail = await fetchProblemDetails(problemCode);
          if (problemDetail) {
            // Update state one problem at a time to avoid re-renders
            setProblemDetails((prev) => ({
              ...prev,
              [problemCode]: problemDetail,
            }));

            // Cache the problem details
            localStorage.setItem(
              `problem-${problemCode}`,
              JSON.stringify(problemDetail),
            );
          }
        } catch (error) {
          console.error(
            `Error fetching details for problem ${problemCode}:`,
            error,
          );
        }
      }
    };

    if (Object.keys(contests).length > 0) {
      fetchAllProblemDetails();
    }
  }, [contests]);

  const getRatingClass = (rating: number) => {
    // Round rating to nearest hundred
    const roundedRating = Math.floor(rating / 100) * 100;
    return `rating-${roundedRating}`;
  };

  const toggleSolved = (problemCode: string) => {
    const newSolvedProblems = new Set(solvedProblems);

    if (newSolvedProblems.has(problemCode)) {
      newSolvedProblems.delete(problemCode);
    } else {
      newSolvedProblems.add(problemCode);
    }

    setSolvedProblems(newSolvedProblems);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-gray-400" />
      </div>
    );
  }

  if (Object.keys(contests).length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No contests found for this division.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="problem-grid">
        <thead>
          <tr>
            <th className="w-16">#</th>
            <th className="w-32">Contest</th>
            {/* Create problem columns A through G */}
            {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
              <th key={letter}>Problem {letter}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(contests).map(([contestCode, problems], index) => (
            <tr key={contestCode}>
              <td>{index + 1}</td>
              <td>
                <a
                  href={`https://www.codechef.com/${contestCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {contestCode}
                </a>
              </td>
              {/* Create cells for problems A through G */}
              {["A", "B", "C", "D", "E", "F", "G"].map((letter) => {
                // Find a problem that matches this letter position
                const problem = problems.find(
                  (p, idx) => idx === letter.charCodeAt(0) - 65,
                );

                if (!problem) {
                  return <td key={letter}>-</td>;
                }

                const details = problemDetails[problem.code];
                const rating = details?.difficulty_rating || 0;
                const isSolved = solvedProblems.has(problem.code);

                return (
                  <td key={letter} className={isSolved ? "solved" : ""}>
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id={`solved-${problem.code}`}
                        checked={isSolved}
                        onCheckedChange={() => toggleSolved(problem.code)}
                        className="mt-1"
                      />
                      <div>
                        <a
                          href={`https://www.codechef.com/problems/${problem.code}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`font-medium ${getRatingClass(rating)}`}
                        >
                          {letter}. {problem.name}
                        </a>
                        <div className="text-sm text-gray-500">({rating})</div>
                      </div>
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
