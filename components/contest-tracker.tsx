"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContestProblems from "@/components/contest-problems";
import { MAX_CONTEST_NUMBER } from "@/lib/constants";

// Use lazy initialization to load the cached division value.
export default function ContestTracker() {
  // const [searchQuery, setSearchQuery] = useState("")
  const [selectedDivision, setSelectedDivision] = useState("D");
  const [isClient, setIsClient] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(MAX_CONTEST_NUMBER / 10));
  const [loading, setLoading] = useState(true);
  const [contestsRange, setContestsRange] = useState({
    start: MAX_CONTEST_NUMBER,
    end: MAX_CONTEST_NUMBER - 9,
  });

  // Load cached data on mount
  useEffect(() => {
    setIsClient(true);
    
    // Load cached division
    const cachedDivision = localStorage.getItem("last-division");
    if (cachedDivision) {
      setSelectedDivision(cachedDivision);
    }
    
    // Load cached page position
    const cachedRangeStr = localStorage.getItem("last-contest-range");
    if (cachedRangeStr) {
      try {
        const cachedRange = JSON.parse(cachedRangeStr);
        setContestsRange(cachedRange);
        
        // Calculate the correct page number based on the range
        const pageOffset = Math.floor((MAX_CONTEST_NUMBER - cachedRange.start) / 10) + 1;
        setCurrentPage(pageOffset);
      } catch (e) {
        console.error("Error parsing cached contest range:", e);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDivisionChange = (value: string) => {
    setSelectedDivision(value);
    setLoading(true);
    localStorage.setItem("last-division", value);
  };

  const handleRefresh = () => {
    setLoading(true);
    // Clear cache and refresh data
    localStorage.removeItem(`contests-${selectedDivision}`);
    // Refresh data
  };

  const handleNextPage = () => {
    // Don't go below contest #1
    if (contestsRange.end > 10) {
      setLoading(true);
      const newStart = contestsRange.start - 10;
      const newEnd = contestsRange.end - 10;
      const newRange = {
        start: newStart,
        end: newEnd,
      };
      
      setContestsRange(newRange);
      setCurrentPage(currentPage + 1);
      
      // Cache the new range
      localStorage.setItem("last-contest-range", JSON.stringify(newRange));
    }
  };

  const handlePreviousPage = () => {
    // Don't go above MAX_CONTEST_NUMBER
    if (contestsRange.start < MAX_CONTEST_NUMBER) {
      setLoading(true);
      const newStart = Math.min(contestsRange.start + 10, MAX_CONTEST_NUMBER);
      const newEnd = Math.min(contestsRange.end + 10, newStart - 9);
      const newRange = {
        start: newStart,
        end: newEnd,
      };
      
      setContestsRange(newRange);
      setCurrentPage(Math.max(currentPage - 1, 1));
      
      // Cache the new range
      localStorage.setItem("last-contest-range", JSON.stringify(newRange));
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="flex items-center justify-between mb-6 border-b pb-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 bg-gradient-to-r from-orange-500 to-red-500 rounded"></div>
          <h1 className="text-xl font-bold text-gray-800">
            CodeChef Contest Tracker
          </h1>
        </div>
        <nav className="hidden md:flex items-center gap-4"></nav>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-gray-800"
            onClick={handleRefresh}
          >
            <RefreshCw size={18} />
          </Button>
        </div>
      </header>

      {/* <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center justify-between">
        <form onSubmit={handleSearch} className="w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search by Contest Name or Id"
              className="pl-10 border-gray-300 w-full md:w-[400px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>
            Showing contests {contestsRange.end} to {contestsRange.start}
          </span>
          <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800">
            <Filter size={18} />
          </Button>
        </div>
      </div> */}

      <Tabs
        value={selectedDivision}
        onValueChange={handleDivisionChange}
        className="mb-6"
      >
        <TabsList className="bg-gray-100">
          <TabsTrigger value="A" className="data-[state=active]:bg-white">
            Div. 1
          </TabsTrigger>
          <TabsTrigger value="B" className="data-[state=active]:bg-white">
            Div. 2
          </TabsTrigger>
          <TabsTrigger value="C" className="data-[state=active]:bg-white">
            Div. 3
          </TabsTrigger>
          <TabsTrigger value="D" className="data-[state=active]:bg-white">
            Div. 4
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <ContestProblems
        division={selectedDivision}
        contestsRange={contestsRange}
        loading={loading}
        setLoading={setLoading}
      />

      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-gray-300"
            onClick={handlePreviousPage}
            disabled={contestsRange.start >= MAX_CONTEST_NUMBER}
          >
            Previous
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-gray-300"
            onClick={handleNextPage}
            disabled={contestsRange.end <= 10}
          >
            Next
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        {/* Display info about current range */}
        <div className="text-sm text-gray-600">
          Showing contests {contestsRange.end} to {contestsRange.start}
        </div>
      </div>
      <footer className="mt-8 text-center text-sm text-gray-500">
        ⭐ If you liked this app, please star the{" "}
        <a
          href="https://github.com/ashishpawar517/codechef-contest-tracker"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          GitHub repo
        </a>{" "}
        or{" "}
        <a
          href="https://github.com/ashishpawar517/codechef-contest-tracker/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          report an issue
        </a>
        .
      </footer>
    </div>
  );
}
