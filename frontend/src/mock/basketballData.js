// Mock data for basketball stats tracker - Friends Edition
export const mockPlayers = [
  {
    id: 1,
    name: "Alex Johnson",
    gamesPlayed: 18,
    stats: {
      points: 324,
      threePointers: 28,
      fieldGoals: 142,
      freeThrows: 40,
      assists: 67,
      rebounds: 89,
      steals: 15,
      blocks: 8,
      turnovers: 23,
      fouls: 34,
      saves: 12,
      deflections: 18,
      charges: 3,
      doubleDoubles: 4,
      tripleDoubles: 0
    }
  },
  {
    id: 2,
    name: "Mike Chen",
    gamesPlayed: 20,
    stats: {
      points: 398,
      threePointers: 52,
      fieldGoals: 156,
      freeThrows: 34,
      assists: 124,
      rebounds: 45,
      steals: 22,
      blocks: 3,
      turnovers: 31,
      fouls: 28,
      saves: 19,
      deflections: 24,
      charges: 2,
      doubleDoubles: 6,
      tripleDoubles: 1
    }
  },
  {
    id: 3,
    name: "Jordan Smith",
    gamesPlayed: 17,
    stats: {
      points: 289,
      threePointers: 5,
      fieldGoals: 125,
      freeThrows: 39,
      assists: 34,
      rebounds: 156,
      steals: 12,
      blocks: 31,
      turnovers: 18,
      fouls: 42,
      saves: 8,
      deflections: 11,
      charges: 5,
      doubleDoubles: 8,
      tripleDoubles: 0
    }
  },
  {
    id: 4,
    name: "Tyler Brown",
    gamesPlayed: 19,
    stats: {
      points: 367,
      threePointers: 41,
      fieldGoals: 148,
      freeThrows: 30,
      assists: 58,
      rebounds: 72,
      steals: 18,
      blocks: 7,
      turnovers: 26,
      fouls: 31,
      saves: 14,
      deflections: 16,
      charges: 1,
      doubleDoubles: 3,
      tripleDoubles: 0
    }
  },
  {
    id: 5,
    name: "Sam Davis",
    gamesPlayed: 16,
    stats: {
      points: 256,
      threePointers: 15,
      fieldGoals: 98,
      freeThrows: 45,
      assists: 41,
      rebounds: 128,
      steals: 14,
      blocks: 19,
      turnovers: 21,
      fouls: 38,
      saves: 6,
      deflections: 13,
      charges: 4,
      doubleDoubles: 5,
      tripleDoubles: 0
    }
  },
  {
    id: 6,
    name: "Chris Wilson",
    gamesPlayed: 21,
    stats: {
      points: 445,
      threePointers: 63,
      fieldGoals: 167,
      freeThrows: 48,
      assists: 89,
      rebounds: 67,
      steals: 25,
      blocks: 5,
      turnovers: 29,
      fouls: 26,
      saves: 21,
      deflections: 27,
      charges: 2,
      doubleDoubles: 7,
      tripleDoubles: 1
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
    tpg: (stats.turnovers / gamesPlayed).toFixed(1),
    fpg: (stats.fouls / gamesPlayed).toFixed(1),
    threePointPercentage: ((stats.threePointers / (stats.threePointers + 25)) * 100).toFixed(1),
    fgPercentage: ((stats.fieldGoals / (stats.fieldGoals + 60)) * 100).toFixed(1),
    ftPercentage: ((stats.freeThrows / (stats.freeThrows + 15)) * 100).toFixed(1)
  };
};

export const getLeaderboard = (stat) => {
  return [...mockPlayers].sort((a, b) => {
    if (stat === 'ppg') return (b.stats.points / b.gamesPlayed) - (a.stats.points / a.gamesPlayed);
    if (stat === 'apg') return (b.stats.assists / b.gamesPlayed) - (a.stats.assists / a.gamesPlayed);
    if (stat === 'rpg') return (b.stats.rebounds / b.gamesPlayed) - (a.stats.rebounds / a.gamesPlayed);
    if (stat === 'spg') return (b.stats.steals / b.gamesPlayed) - (a.stats.steals / a.gamesPlayed);
    if (stat === 'bpg') return (b.stats.blocks / b.gamesPlayed) - (a.stats.blocks / a.gamesPlayed);
    if (stat === 'tpg') return (a.stats.turnovers / a.gamesPlayed) - (b.stats.turnovers / b.gamesPlayed); // Lower is better
    return b.stats[stat] - a.stats[stat];
  });
};

export const getPlayerById = (id) => {
  return mockPlayers.find(player => player.id === parseInt(id));
};