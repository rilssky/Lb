// Mock data for basketball stats tracker
export const mockPlayers = [
  {
    id: 1,
    name: "LeBron James",
    position: "SF",
    gamesPlayed: 25,
    stats: {
      points: 487,
      threePointers: 45,
      fieldGoals: 189,
      freeThrows: 64,
      assists: 152,
      rebounds: 201,
      steals: 32,
      blocks: 18
    }
  },
  {
    id: 2,
    name: "Stephen Curry",
    position: "PG", 
    gamesPlayed: 23,
    stats: {
      points: 521,
      threePointers: 89,
      fieldGoals: 178,
      freeThrows: 76,
      assists: 134,
      rebounds: 98,
      steals: 28,
      blocks: 8
    }
  },
  {
    id: 3,
    name: "Giannis Antetokounmpo",
    position: "PF",
    gamesPlayed: 24,
    stats: {
      points: 612,
      threePointers: 12,
      fieldGoals: 245,
      freeThrows: 110,
      assists: 142,
      rebounds: 287,
      steals: 31,
      blocks: 42
    }
  },
  {
    id: 4,
    name: "Kevin Durant",
    position: "SF",
    gamesPlayed: 22,
    stats: {
      points: 534,
      threePointers: 67,
      fieldGoals: 203,
      freeThrows: 61,
      assists: 98,
      rebounds: 143,
      steals: 19,
      blocks: 26
    }
  },
  {
    id: 5,
    name: "Jayson Tatum",
    position: "SF",
    gamesPlayed: 26,
    stats: {
      points: 489,
      threePointers: 78,
      fieldGoals: 167,
      freeThrows: 77,
      assists: 117,
      rebounds: 189,
      steals: 24,
      blocks: 15
    }
  }
];

export const calculateAverages = (player) => {
  const { stats, gamesPlayed } = player;
  return {
    ppg: (stats.points / gamesPlayed).toFixed(1),
    apg: (stats.assists / gamesPlayed).toFixed(1),
    rpg: (stats.rebounds / gamesPlayed).toFixed(1),
    threePointPercentage: ((stats.threePointers / (stats.threePointers + 20)) * 100).toFixed(1),
    fgPercentage: ((stats.fieldGoals / (stats.fieldGoals + 50)) * 100).toFixed(1)
  };
};

export const getLeaderboard = (stat) => {
  return [...mockPlayers].sort((a, b) => {
    if (stat === 'ppg') return (b.stats.points / b.gamesPlayed) - (a.stats.points / a.gamesPlayed);
    if (stat === 'apg') return (b.stats.assists / b.gamesPlayed) - (a.stats.assists / a.gamesPlayed);
    if (stat === 'rpg') return (b.stats.rebounds / b.gamesPlayed) - (a.stats.rebounds / a.gamesPlayed);
    return b.stats[stat] - a.stats[stat];
  });
};