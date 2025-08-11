// Mock data for basketball stats tracker - Friends Edition
export const mockPlayers = [
  {
    id: 1,
    name: "Alex Johnson",
    position: "SF",
    gamesPlayed: 18,
    stats: {
      points: 324,
      threePointers: 28,
      fieldGoals: 142,
      freeThrows: 40,
      assists: 67,
      rebounds: 89,
      steals: 15,
      blocks: 8
    }
  },
  {
    id: 2,
    name: "Mike Chen",
    position: "PG", 
    gamesPlayed: 20,
    stats: {
      points: 398,
      threePointers: 52,
      fieldGoals: 156,
      freeThrows: 34,
      assists: 124,
      rebounds: 45,
      steals: 22,
      blocks: 3
    }
  },
  {
    id: 3,
    name: "Jordan Smith",
    position: "C",
    gamesPlayed: 17,
    stats: {
      points: 289,
      threePointers: 5,
      fieldGoals: 125,
      freeThrows: 39,
      assists: 34,
      rebounds: 156,
      steals: 12,
      blocks: 31
    }
  },
  {
    id: 4,
    name: "Tyler Brown",
    position: "SG",
    gamesPlayed: 19,
    stats: {
      points: 367,
      threePointers: 41,
      fieldGoals: 148,
      freeThrows: 30,
      assists: 58,
      rebounds: 72,
      steals: 18,
      blocks: 7
    }
  },
  {
    id: 5,
    name: "Sam Davis",
    position: "PF",
    gamesPlayed: 16,
    stats: {
      points: 256,
      threePointers: 15,
      fieldGoals: 98,
      freeThrows: 45,
      assists: 41,
      rebounds: 128,
      steals: 14,
      blocks: 19
    }
  },
  {
    id: 6,
    name: "Chris Wilson",
    position: "SG",
    gamesPlayed: 21,
    stats: {
      points: 445,
      threePointers: 63,
      fieldGoals: 167,
      freeThrows: 48,
      assists: 89,
      rebounds: 67,
      steals: 25,
      blocks: 5
    }
  }
];

export const calculateAverages = (player) => {
  const { stats, gamesPlayed } = player;
  return {
    ppg: (stats.points / gamesPlayed).toFixed(1),
    apg: (stats.assists / gamesPlayed).toFixed(1),
    rpg: (stats.rebounds / gamesPlayed).toFixed(1),
    spg: (stats.steals / gamesPlayed).toFixed(1),
    bpg: (stats.blocks / gamesPlayed).toFixed(1),
    threePointPercentage: ((stats.threePointers / (stats.threePointers + 25)) * 100).toFixed(1),
    fgPercentage: ((stats.fieldGoals / (stats.fieldGoals + 60)) * 100).toFixed(1)
  };
};

export const getLeaderboard = (stat) => {
  return [...mockPlayers].sort((a, b) => {
    if (stat === 'ppg') return (b.stats.points / b.gamesPlayed) - (a.stats.points / a.gamesPlayed);
    if (stat === 'apg') return (b.stats.assists / b.gamesPlayed) - (a.stats.assists / a.gamesPlayed);
    if (stat === 'rpg') return (b.stats.rebounds / b.gamesPlayed) - (a.stats.rebounds / a.gamesPlayed);
    if (stat === 'spg') return (b.stats.steals / b.gamesPlayed) - (a.stats.steals / a.gamesPlayed);
    if (stat === 'bpg') return (b.stats.blocks / b.gamesPlayed) - (a.stats.blocks / a.gamesPlayed);
    return b.stats[stat] - a.stats[stat];
  });
};

export const getPlayerById = (id) => {
  return mockPlayers.find(player => player.id === parseInt(id));
};