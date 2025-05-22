"use client"

import type React from "react"

import { useState } from "react"
import { Search, Filter, RefreshCw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ContestProblems from "@/components/contest-problems"
import { MAX_CONTEST_NUMBER } from "@/lib/constants"

export default function ContestTracker() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDivision, setSelectedDivision] = useState("C") // Default to Div 3
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [contestsRange, setContestsRange] = useState({
    start: MAX_CONTEST_NUMBER,
    end: MAX_CONTEST_NUMBER - 9,
  })

  const handleDivisionChange = (value: string) => {
    setSelectedDivision(value)
    setLoading(true)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality
  }

  const handleRefresh = () => {
    setLoading(true)
    // Clear cache and refresh data
    localStorage.removeItem(`contests-${selectedDivision}`)
    // Refresh data
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="flex items-center justify-between mb-6 border-b pb-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 bg-gradient-to-r from-orange-500 to-red-500 rounded"></div>
          <h1 className="text-xl font-bold text-gray-800">CodeChef Contest Tracker</h1>
        </div>
        <nav className="hidden md:flex items-center gap-4">
        
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800">
            <RefreshCw size={18} onClick={handleRefresh} />
          </Button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center justify-between">
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
      </div>

      <Tabs defaultValue="C" onValueChange={handleDivisionChange} className="mb-6">
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
          <Button variant="outline" size="sm" className="border-gray-300">
            Previous
          </Button>
          <Button variant="outline" size="sm" className="border-gray-300">
            Next
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Per Page</span>
          <select className="border bg-cyan-50  border-gray-300 rounded text-sm p-1">
            <option>100</option>
            <option>50</option>
            <option>25</option>
          </select>
        </div>
      </div>
       <footer className="mt-8 text-center text-sm text-gray-500">
       ⭐ If you liked this app, please star the{' '}
        <a
          href="https://github.com/ashishpawar517/codechef-contest-tracker"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          GitHub repo
        </a>{' '}
        or{' '}
        <a
          href="https://github.com/ashishpawar517/codechef-contest-tracker/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          report an issue
        </a>.
      </footer>
    </div>
  )
}
