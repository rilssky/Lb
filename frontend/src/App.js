import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Toaster } from "./components/ui/toaster";
import { BarChart3, Trophy, Users, Settings, Activity, TrendingUp, Target, Award } from "lucide-react";
import StatsCard from "./components/StatsCard";
import PlayerLeaderboard from "./components/PlayerLeaderboard";
import AdminPanel from "./components/AdminPanel";
import { mockPlayers, calculateAverages } from "./mock/basketballData";

const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <Activity className="h-8 w-8 text-orange-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                BasketStats
              </span>
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link to="/">
                <Button 
                  variant={location.pathname === "/" ? "default" : "ghost"} 
                  size="sm"
                  className="transition-all duration-200"
                >
                  <Trophy className="h-4 w-4 mr-2" />
                  Leaderboard
                </Button>
              </Link>
              <Link to="/admin">
                <Button 
                  variant={location.pathname === "/admin" ? "default" : "ghost"} 
                  size="sm"
                  className="transition-all duration-200"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Admin
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Live Stats
            </Badge>
          </div>
        </div>
      </div>
    </nav>
  );
};

const HomePage = () => {
  const totalGames = mockPlayers.reduce((sum, player) => sum + player.gamesPlayed, 0);
  const totalPoints = mockPlayers.reduce((sum, player) => sum + player.stats.points, 0);
  const totalAssists = mockPlayers.reduce((sum, player) => sum + player.stats.assists, 0);
  const totalThreePointers = mockPlayers.reduce((sum, player) => sum + player.stats.threePointers, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Basketball Statistics Tracker
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track and view real-time basketball statistics for all players. 
            See who's dominating the court with comprehensive performance metrics.
          </p>
        </div>

        {/* Stats Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Points"
            value={totalPoints.toLocaleString()}
            subtitle="Across all games"
            icon={Target}
            color="blue"
          />
          <StatsCard
            title="Active Players"
            value={mockPlayers.length}
            subtitle="Currently tracking"
            icon={Users}
            color="green"
          />
          <StatsCard
            title="Total Assists"
            value={totalAssists.toLocaleString()}
            subtitle="Team collaboration"
            icon={TrendingUp}
            color="orange"
          />
          <StatsCard
            title="3-Pointers Made"
            value={totalThreePointers.toLocaleString()}
            subtitle="Long range success"
            icon={Award}
            color="purple"
          />
        </div>

        {/* Main Leaderboard */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Trophy className="h-6 w-6 text-yellow-500" />
              Player Leaderboards
            </h2>
            <Badge className="bg-orange-100 text-orange-800">
              Season {new Date().getFullYear()}
            </Badge>
          </div>
          <PlayerLeaderboard />
        </div>

        {/* Note about mock data */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
            <BarChart3 className="h-4 w-4 text-blue-600 mr-2" />
            <span className="text-sm text-blue-700">
              Currently showing mock data. Admin can update real statistics.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminPanel />
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;