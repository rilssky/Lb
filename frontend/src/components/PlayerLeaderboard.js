import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Trophy, Medal, Award, Target, Users, TrendingUp, Eye, Shield, Zap, AlertTriangle } from 'lucide-react';
import { mockPlayers, calculateAverages, getLeaderboard } from '../mock/basketballData';

const PlayerLeaderboard = () => {
  const [activeTab, setActiveTab] = useState('points');

  const getPositionIcon = (index) => {
    switch(index) {
      case 0: return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 1: return <Medal className="h-5 w-5 text-gray-400" />;
      case 2: return <Award className="h-5 w-5 text-amber-600" />;
      default: return <span className="h-5 w-5 flex items-center justify-center text-sm font-bold text-gray-500">#{index + 1}</span>;
    }
  };

  const getStatValue = (player, stat) => {
    const averages = calculateAverages(player);
    switch(stat) {
      case 'points': return player.stats.points;
      case 'ppg': return averages.ppg;
      case 'assists': return player.stats.assists;
      case 'apg': return averages.apg;
      case 'rebounds': return player.stats.rebounds;
      case 'rpg': return averages.rpg;
      case 'threePointers': return player.stats.threePointers;
      case 'steals': return player.stats.steals;
      case 'blocks': return player.stats.blocks;
      case 'saves': return player.stats.saves;
      case 'deflections': return player.stats.deflections;
      case 'turnovers': return player.stats.turnovers;
      case 'fouls': return player.stats.fouls;
      case 'charges': return player.stats.charges;
      case 'doubleDoubles': return player.stats.doubleDoubles;
      default: return player.stats[stat];
    }
  };

  const LeaderboardCard = ({ players, stat, title, suffix = "" }) => (
    <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {players.map((player, index) => (
            <div key={player.id} className="flex items-center justify-between p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 group">
              <div className="flex items-center gap-3">
                {getPositionIcon(index)}
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900">{player.name}</p>
                    <Link to={`/player/${player.id}`}>
                      <Eye className="h-4 w-4 text-gray-400 hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100" />
                    </Link>
                  </div>
                  <p className="text-sm text-gray-500">
                    <span>{player.gamesPlayed} games played</span>
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">{getStatValue(player, stat)}{suffix}</p>
                <Link to={`/player/${player.id}`}>
                  <span className="text-xs text-blue-600 hover:text-blue-800 opacity-0 group-hover:opacity-100 transition-opacity">
                    View Profile →
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 bg-gray-100 rounded-lg">
          <TabsTrigger value="points" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">Points</TabsTrigger>
          <TabsTrigger value="assists" className="data-[state=active]:bg-white data-[state=active]:text-green-600">Assists</TabsTrigger>
          <TabsTrigger value="rebounds" className="data-[state=active]:bg-white data-[state=active]:text-orange-600">Rebounds</TabsTrigger>
          <TabsTrigger value="steals" className="data-[state=active]:bg-white data-[state=active]:text-red-600">Steals</TabsTrigger>
          <TabsTrigger value="saves" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">Saves</TabsTrigger>
          <TabsTrigger value="blocks" className="data-[state=active]:bg-white data-[state=active]:text-indigo-600">Blocks</TabsTrigger>
          <TabsTrigger value="charges" className="data-[state=active]:bg-white data-[state=active]:text-purple-600">Charges</TabsTrigger>
          <TabsTrigger value="doubleDoubles" className="data-[state=active]:bg-white data-[state=active]:text-yellow-600">2x2</TabsTrigger>
        </TabsList>

        <TabsContent value="points" className="mt-6">
          <LeaderboardCard 
            players={getLeaderboard('points')} 
            stat="points" 
            title="Total Points Leaders" 
          />
        </TabsContent>

        <TabsContent value="assists" className="mt-6">
          <LeaderboardCard 
            players={getLeaderboard('assists')} 
            stat="assists" 
            title="Total Assists Leaders" 
          />
        </TabsContent>

        <TabsContent value="rebounds" className="mt-6">
          <LeaderboardCard 
            players={getLeaderboard('rebounds')} 
            stat="rebounds" 
            title="Total Rebounds Leaders" 
          />
        </TabsContent>

        <TabsContent value="steals" className="mt-6">
          <LeaderboardCard 
            players={getLeaderboard('steals')} 
            stat="steals" 
            title="Steals Leaders" 
          />
        </TabsContent>

        <TabsContent value="saves" className="mt-6">
          <LeaderboardCard 
            players={getLeaderboard('saves')} 
            stat="saves" 
            title="Saves Leaders" 
          />
        </TabsContent>

        <TabsContent value="blocks" className="mt-6">
          <LeaderboardCard 
            players={getLeaderboard('blocks')} 
            stat="blocks" 
            title="Blocks Leaders" 
          />
        </TabsContent>

        <TabsContent value="charges" className="mt-6">
          <LeaderboardCard 
            players={getLeaderboard('charges')} 
            stat="charges" 
            title="Charges Taken Leaders" 
          />
        </TabsContent>

        <TabsContent value="doubleDoubles" className="mt-6">
          <LeaderboardCard 
            players={getLeaderboard('doubleDoubles')} 
            stat="doubleDoubles" 
            title="Double-Doubles Leaders" 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlayerLeaderboard;