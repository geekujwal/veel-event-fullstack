import { IPlayer } from "./IPlayer";

export interface IMatch {
  id: string;
  round: number;
  bracket: "upper" | "lower";
  playerA?: IPlayer;
  playerB?: IPlayer;
  winner?: string | null;
  isGameOver: boolean;
  isCurrentGame: boolean;
  parentId?: string | null;
  playerAScore: number;
  playerBScore: number;
  votes: string[];
  fantasy: string[];
  isDeuce: boolean;
  isAdvantage: boolean;
  voteCount: number;
}
