export interface IBracket {
  brackets: Brackets;
  finals: null;
}

export interface Brackets {
  upper: Upper[];
}

export interface Upper {
  round: number;
  matches: Match[];
}

export interface Match {
  id: string;
  playerA: Player;
  playerB: Player;
  winner_id: null;
  is_game_over: boolean;
}

export interface Player {
  id?: string;
  name?: string;
  score: number;
}
