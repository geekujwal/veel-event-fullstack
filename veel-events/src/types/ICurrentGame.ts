export interface ICurrentGame {
  _id: string;
  id: string;
  round: number;
  bracket: string;
  playerA: Player;
  playerB: Player;
  winner: null;
  isGameOver: boolean;
  isCurrentGame: boolean;
  parentId: null;
  playerAScore: number;
  playerBScore: number;
  votes: string[];
  fantasy: string[];
  isDeuce: boolean;
  isAdvantage: boolean;
  __v: number;
}

export interface Player {
  id: string;
  name: string;
}
