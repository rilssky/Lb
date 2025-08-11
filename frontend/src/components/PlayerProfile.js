import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ArrowLeft, User, TrendingUp, Target, Award, BarChart3, Shield, Zap, AlertTriangle } from 'lucide-react';
import { getPlayerById, calculateAverages } from '../mock/basketballData';

const StatCard = ({ title, value, subtitle, icon: Icon, color = "blue" }) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    orange: "from-orange-500 to-orange-600",
    purple: "from-purple-500 to-purple-600",
    red: "from-red-500 to-red-600",
    indigo: "from-indigo-500 to-indigo-600",
    yellow: "from-yellow-500 to-yellow-600"
  };

  return (
    <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-md hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <Icon className={`h-8 w-8 bg-gradient-to-r ${colorClasses[color]} bg-clip-text text-transparent`} />
          <Badge variant="outline" className="text-xs">{subtitle}</Badge>
        </div>
        <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
        <p className="text-sm text-gray-600">{title}</p>
      </CardContent>
    </Card>
  );
};

const PlayerProfile = () => {
  const { playerId } = useParams();
  const player = getPlayerById(playerId);

  if (!player) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Player Not Found</h1>
          <Link to="/">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Leaderboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const averages = calculateAverages(player);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" className="hover:bg-gray-50">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Leaderboard
            </Button>
          </Link>
        </div>

        {/* Player Header */}
        <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-8 mb-8 border-l-4 border-orange-500">
          <div className="flex items-center space-x-6">
            <div className="bg-white p-4 rounded-full shadow-md">
              <User className="h-16 w-16 text-orange-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{player.name}</h1>
              <div className="flex items-center space-x-4">
                <span className="text-lg text-gray-700">
                  {player.gamesPlayed} games played
                </span>
                <span className="text-lg text-gray-700">
                  Season 2025
                </span>
                {player.stats.doubleDoubles > 0 && (
                  <Badge className="bg-green-600 text-white px-3 py-1 text-sm">
                    {player.stats.doubleDoubles} Double-Doubles
                  </Badge>
                )}
                {player.stats.tripleDoubles > 0 && (
                  <Badge className="bg-purple-600 text-white px-3 py-1 text-sm">
                    {player.stats.tripleDoubles} Triple-Double{player.stats.tripleDoubles > 1 ? 's' : ''}!
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Key Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Points Per Game"
            value={averages.ppg}
            subtitle="PPG"
            icon={Target}
            color="blue"
          />
          <StatCard
            title="Assists Per Game"
            value={averages.apg}
            subtitle="APG"
            icon={TrendingUp}
            color="green"
          />
          <StatCard
            title="Rebounds Per Game"
            value={averages.rpg}
            subtitle="RPG"
            icon={Award}
            color="orange"
          />
          <StatCard
            title="Total Points"
            value={player.stats.points}
            subtitle="Season"
            icon={BarChart3}
            color="purple"
          />
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Scoring Stats */}
          <Card className="bg-gradient-to-br from-white to-blue-50 border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-blue-800 flex items-center gap-2">
                <Target className="h-5 w-5" />
                Scoring Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                  <span className="font-medium text-gray-700">Total Points</span>
                  <span className="text-xl font-bold text-blue-600">{player.stats.points}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                  <span className="font-medium text-gray-700">3-Pointers Made</span>
                  <span className="text-xl font-bold text-blue-600">{player.stats.threePointers}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                  <span className="font-medium text-gray-700">Field Goals Made</span>
                  <span className="text-xl font-bold text-blue-600">{player.stats.fieldGoals}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                  <span className="font-medium text-gray-700">Free Throws Made</span>
                  <span className="text-xl font-bold text-blue-600">{player.stats.freeThrows}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Stats */}
          <Card className="bg-gradient-to-br from-white to-green-50 border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-green-800 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Team & Hustle Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                  <span className="font-medium text-gray-700">Total Assists</span>
                  <span className="text-xl font-bold text-green-600">{player.stats.assists}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                  <span className="font-medium text-gray-700">Total Rebounds</span>
                  <span className="text-xl font-bold text-green-600">{player.stats.rebounds}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                  <span className="font-medium text-gray-700">Saves</span>
                  <span className="text-xl font-bold text-green-600">{player.stats.saves}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                  <span className="font-medium text-gray-700">Deflections</span>
                  <span className="text-xl font-bold text-green-600">{player.stats.deflections}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Defense & Discipline Stats */}
          <Card className="bg-gradient-to-br from-white to-red-50 border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-red-800 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Defense & Discipline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                  <span className="font-medium text-gray-700">Steals</span>
                  <span className="text-xl font-bold text-red-600">{player.stats.steals}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                  <span className="font-medium text-gray-700">Blocks</span>
                  <span className="text-xl font-bold text-red-600">{player.stats.blocks}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                  <span className="font-medium text-gray-700">Charges Taken</span>
                  <span className="text-xl font-bold text-red-600">{player.stats.charges}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                  <span className="font-medium text-gray-700">Turnovers</span>
                  <span className="text-xl font-bold text-orange-600">{player.stats.turnovers}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Summary */}
        <Card className="mt-8 bg-gradient-to-br from-white to-gray-100 border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Award className="h-5 w-5" />
              Season Performance Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{averages.ppg}</div>
                <div className="text-sm text-gray-600">Points Per Game</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{averages.apg}</div>
                <div className="text-sm text-gray-600">Assists Per Game</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{averages.rpg}</div>
                <div className="text-sm text-gray-600">Rebounds Per Game</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{averages.spg}</div>
                <div className="text-sm text-gray-600">Steals Per Game</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{averages.tpg}</div>
                <div className="text-sm text-gray-600">Turnovers Per Game</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        {(player.stats.doubleDoubles > 0 || player.stats.tripleDoubles > 0) && (
          <Card className="mt-8 bg-gradient-to-br from-yellow-50 to-orange-50 border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-yellow-800 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Season Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {player.stats.doubleDoubles > 0 && (
                  <Badge className="bg-green-600 text-white px-4 py-2 text-sm">
                    🏀 {player.stats.doubleDoubles} Double-Double{player.stats.doubleDoubles > 1 ? 's' : ''}
                  </Badge>
                )}
                {player.stats.tripleDoubles > 0 && (
                  <Badge className="bg-purple-600 text-white px-4 py-2 text-sm">
                    ⭐ {player.stats.tripleDoubles} Triple-Double{player.stats.tripleDoubles > 1 ? 's' : ''}!
                  </Badge>
                )}
                {player.stats.charges > 3 && (
                  <Badge className="bg-red-600 text-white px-4 py-2 text-sm">
                    🛡️ Charge Champion ({player.stats.charges} charges)
                  </Badge>
                )}
                {player.stats.saves > 15 && (
                  <Badge className="bg-blue-600 text-white px-4 py-2 text-sm">
                    💫 Clutch Saver ({player.stats.saves} saves)
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Note about mock data */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-orange-50 border border-orange-200 rounded-lg">
            <BarChart3 className="h-4 w-4 text-orange-600 mr-2" />
            <span className="text-sm text-orange-700">
              Stats updated through mock data. Admin can update real statistics.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;