import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Plus, Edit3, Save, Users, BarChart3 } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { mockPlayers } from '../mock/basketballData';

const AdminPanel = () => {
  const { toast } = useToast();
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [statType, setStatType] = useState('');
  const [statValue, setStatValue] = useState('');
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    position: ''
  });

  const handleUpdateStats = (e) => {
    e.preventDefault();
    if (!selectedPlayer || !statType || !statValue) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Stats Updated! 🏀",
      description: `Added ${statValue} ${statType} for ${selectedPlayer}`,
      className: "bg-green-50 border-green-200 text-green-800"
    });
    
    setStatValue('');
  };

  const handleAddPlayer = (e) => {
    e.preventDefault();
    if (!newPlayer.name || !newPlayer.position) {
      toast({
        title: "Error",
        description: "Please enter player name and position",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Player Added! 🎉",
      description: `${newPlayer.name} has been added to the roster`,
      className: "bg-blue-50 border-blue-200 text-blue-800"
    });
    
    setNewPlayer({ name: '', position: '' });
  };

  const StatUpdateCard = () => (
    <Card className="bg-gradient-to-br from-white to-blue-50 border-0 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <BarChart3 className="h-5 w-5" />
          Update Player Stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpdateStats} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="player">Select Player</Label>
            <Select value={selectedPlayer} onValueChange={setSelectedPlayer}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a player" />
              </SelectTrigger>
              <SelectContent>
                {mockPlayers.map((player) => (
                  <SelectItem key={player.id} value={player.name}>
                    {player.name} ({player.position})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="statType">Stat Type</Label>
            <Select value={statType} onValueChange={setStatType}>
              <SelectTrigger>
                <SelectValue placeholder="Choose stat type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="points">Points</SelectItem>
                <SelectItem value="threePointers">3-Pointers</SelectItem>
                <SelectItem value="fieldGoals">Field Goals</SelectItem>
                <SelectItem value="freeThrows">Free Throws</SelectItem>
                <SelectItem value="assists">Assists</SelectItem>
                <SelectItem value="rebounds">Rebounds</SelectItem>
                <SelectItem value="steals">Steals</SelectItem>
                <SelectItem value="blocks">Blocks</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="statValue">Value to Add</Label>
            <Input
              id="statValue"
              type="number"
              min="0"
              value={statValue}
              onChange={(e) => setStatValue(e.target.value)}
              placeholder="Enter number"
              className="focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
          >
            <Save className="h-4 w-4 mr-2" />
            Update Stats
          </Button>
        </form>
      </CardContent>
    </Card>
  );

  const AddPlayerCard = () => (
    <Card className="bg-gradient-to-br from-white to-green-50 border-0 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-800">
          <Users className="h-5 w-5" />
          Add New Player
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddPlayer} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="playerName">Player Name</Label>
            <Input
              id="playerName"
              type="text"
              value={newPlayer.name}
              onChange={(e) => setNewPlayer({...newPlayer, name: e.target.value})}
              placeholder="Enter player name"
              className="focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Select value={newPlayer.position} onValueChange={(value) => setNewPlayer({...newPlayer, position: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PG">Point Guard (PG)</SelectItem>
                <SelectItem value="SG">Shooting Guard (SG)</SelectItem>
                <SelectItem value="SF">Small Forward (SF)</SelectItem>
                <SelectItem value="PF">Power Forward (PF)</SelectItem>
                <SelectItem value="C">Center (C)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Player
          </Button>
        </form>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-100 to-red-100 p-6 rounded-lg border-l-4 border-orange-500">
        <h2 className="text-xl font-bold text-orange-800 mb-2">🔒 Admin Panel</h2>
        <p className="text-orange-700">Use this panel to update player statistics and manage the roster.</p>
      </div>

      <Tabs defaultValue="update-stats" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-lg">
          <TabsTrigger value="update-stats" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
            Update Stats
          </TabsTrigger>
          <TabsTrigger value="add-player" className="data-[state=active]:bg-white data-[state=active]:text-green-600">
            Add Player
          </TabsTrigger>
        </TabsList>

        <TabsContent value="update-stats" className="mt-6">
          <StatUpdateCard />
        </TabsContent>

        <TabsContent value="add-player" className="mt-6">
          <AddPlayerCard />
        </TabsContent>
      </Tabs>

      <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-0">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Current Players</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {mockPlayers.map((player) => (
              <div key={player.id} className="text-center p-3 bg-white rounded-lg shadow-sm border">
                <p className="font-medium text-gray-900">{player.name}</p>
                <Badge variant="outline" className="mt-1">{player.position}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;