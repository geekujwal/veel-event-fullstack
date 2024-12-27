import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import Card from "../../components/ui/card/Card";
import { useFetchData } from "../../hooks/api/useFetchData";
import { ICurrentGame } from "../../types/ICurrentGame";
import { useNavigate } from "react-router";
import MainLoader from "../../components/ui/mainLoader/MainLoader";
import toast from "react-hot-toast";

type Players = {
  player1: number;
  player2: number;
};

function AdminScore() {
  const { data, isLoading } = useFetchData<ICurrentGame>(
    ["fetchCurrentMatch"],
    "/match/current"
  );

  const [score, setScore] = useState<Players>({
    player1: data?.playerAScore ?? 0,
    player2: data?.playerBScore ?? 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setScore({
        player1: data.playerAScore,
        player2: data.playerBScore,
      });
    } else {
      toast.error("No live match going on!");
      navigate("/admin-match-list");
    }
  }, [data]);

  const PLAYER_A = data?.playerA?.name ?? "Player A";
  const PLAYER_B = data?.playerB?.name ?? "Player B";

  const updateScoreAPI = async (newScore: Players, winner: string | null) => {
    try {
      await axiosInstance.put("/match", {
        playerAScore: newScore.player1,
        playerBScore: newScore.player2,
        isDeuce: newScore.player1 === 100,
        isAdvantage: newScore.player1 === 200,
        winner,
        isGameOver: typeof winner === "string",
      });
    } catch (error) {
      console.error("Failed to update score:", error);
    }
  };

  const updateScore = (player: keyof Players, action: string) => {
    setScore((prev) => {
      let newScore = { ...prev };

      if (action === "+") {
        newScore[player] = Math.min(newScore[player] + 1, 10);
      } else if (action === "-" && newScore[player] > 0) {
        newScore[player] -= 1;
      } else if (action === "Deuce") {
        newScore = { player1: 100, player2: 100 };
      } else if (action === "Advantage") {
        newScore = { player1: 200, player2: 200 };
      } else if (action === "Winner") {
        // alert(`${player === "player1" ? PLAYER_A : PLAYER_B} wins!`);
      }

      updateScoreAPI(
        newScore,
        (action === "Winner" &&
          (player === "player1" ? data?.playerA.id : data?.playerB.id)) ||
          null
      );

      return newScore;
    });
  };

  const getUpdateText = (score: Players) => {
    if (score.player1 === 100 || score.player2 === 100) return "Deuce";
    if (score.player1 === 200 || score.player2 === 200) return "Ad";
    return `${score.player1} : ${score.player2}`;
  };

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <section className="text-center relative">
      <img
        src="/player/player1.png"
        className="h-[60%] fixed top-10 -left-60 opacity-5 -z-10 object-contain"
        alt=""
      />
      <img
        src="/player/player2.png"
        className="h-[60%] fixed top-10 -right-60 opacity-5 -z-10 object-contain"
        alt=""
      />

      <div className="padding-primary flex justify-center">
        <div className="space-y-[14px]">
          <div className="bg-white flex items-center gap-1 place-self-center text-primaryBlackLight font-bold uppercase w-fit rounded-full px-3 py-1">
            Live Match
          </div>
          <h3 className="text-white text-3xl font-bold text-center">
            Admin Panel - Upper Bracket Round 1
          </h3>
          <p className="text-white/90 font-light">
            {PLAYER_A} Vs. {PLAYER_B}
          </p>
        </div>
      </div>

      <div className="padding-primary flex justify-between mt-10 items-center">
        <div className="space-y-4">
          <div className="h-[80px] w-fit">
            <img
              src="/player/player1.png"
              className="h-full w-full object-contain"
              alt=""
            />
          </div>
          <h3 className="text-white font-light">{PLAYER_A}</h3>
        </div>
        <div className="-translate-y-4">
          <h1 className="text-white">{getUpdateText(score)}</h1>
        </div>
        <div className="space-y-4">
          <div className="h-[80px] w-fit ">
            <img
              src="/player/player2.png"
              className="h-full w-full object-contain"
              alt=""
            />
          </div>
          <h3 className="text-white font-light">{PLAYER_B}</h3>
        </div>
      </div>

      <Card className="fixed bottom-0 w-screen h-[38%] mt-28 px-6 py-10">
        <h3 className="text-xl font-bold mb-4">Update Scores</h3>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">{PLAYER_A}</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => updateScore("player1", "+")}
              className="bg-primaryBlue text-white px-4 py-2 rounded"
            >
              +
            </button>
            <button
              onClick={() => updateScore("player1", "-")}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              -
            </button>
            <button
              onClick={() => updateScore("player1", "Winner")}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Winner
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">{PLAYER_B}</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => updateScore("player2", "+")}
              className="bg-primaryBlue text-white px-4 py-2 rounded"
            >
              +
            </button>
            <button
              onClick={() => updateScore("player2", "-")}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              -
            </button>
            <button
              onClick={() => updateScore("player2", "Winner")}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Winner
            </button>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => updateScore("player1", "Deuce")}
            className="bg-purple-500 text-white px-4 py-2 rounded"
          >
            Deuce
          </button>
          <button
            onClick={() => updateScore("player1", "Advantage")}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Adv
          </button>
        </div>
      </Card>
    </section>
  );
}

export default AdminScore;
