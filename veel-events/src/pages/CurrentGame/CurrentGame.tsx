import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import axiosInstance from "../../api/axiosInstance";
import Card from "../../components/ui/card/Card";
import { useFetchData } from "../../hooks/api/useFetchData";
import useSocket from "../../hooks/socket/useSocket";
import { ICurrentGame } from "../../types/ICurrentGame";
import MainLoader from "../../components/ui/mainLoader/MainLoader";

function CurrentGame() {
  const { data, isLoading } = useFetchData<ICurrentGame>(
    ["fetchCurrentMatch"],
    "/match/current"
  );

  const PLAYER_A = data?.playerA.name ?? "Player A";
  const PLAYER_B = data?.playerB.name ?? "Player B";
  const [displayMessage, setDisplayMessage] = useState("Playing!");
  const [prevPlayerAScore, setPrevPlayerAScore] = useState<number | undefined>(
    undefined
  );
  const [prevPlayerBScore, setPrevPlayerBScore] = useState<number | undefined>(
    undefined
  );

  const navigate = useNavigate();
  const [hasVoted, setHasVoted] = useState(false);

  useSocket();

  const handleVote = () => {
    if (parseInt(localStorage.getItem("votes") as string) > 3) {
      toast.error("You have already used your votes!");
      return;
    }

    axiosInstance
      .post(`/match/${data?.id}?code=${localStorage.getItem("code")}`)
      .then(() => {
        localStorage.setItem(
          "votes",
          String(parseInt(localStorage.getItem("votes") as string) + 1)
        );
        setHasVoted(true);
      });
  };

  useEffect(() => {
    if (data === null || data?.isGameOver) {
      toast.error("No live match going on!");
      navigate("/tournament-bracket");
      return;
    }

    let gameScoreMessageTimeout: NodeJS.Timeout;

    if (data) {
      if (data.playerAScore !== prevPlayerAScore) {
        setDisplayMessage(`${PLAYER_A} scored!🥳`);
        setPrevPlayerAScore(data.playerAScore);
      } else if (data.playerBScore !== prevPlayerBScore) {
        setDisplayMessage(`${PLAYER_B} scored!🥳`);
        setPrevPlayerBScore(data.playerBScore);
      }

      gameScoreMessageTimeout = setTimeout(() => {
        setDisplayMessage("Playing!");
      }, 3000);
    }

    return () => clearTimeout(gameScoreMessageTimeout);
  }, [data, PLAYER_A, PLAYER_B, prevPlayerAScore, prevPlayerBScore]);

  if (isLoading) {
    return <MainLoader />;
  }

  const getUpdateText = (score: ICurrentGame) => {
    if (score.playerAScore === 100 || score.playerBScore === 100)
      return "Deuce";
    if (score.playerAScore === 200 || score.playerBScore === 200) return "Ad";
    return `${score.playerAScore} : ${score.playerBScore}`;
  };

  return (
    <section className=" text-center relative container ">
      <img
        src="/player/player1.png"
        className="h-[60%] fixed top-10 -left-60 opacity-5 -z-10  object-contain"
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
            Live Match{" "}
            {/* <span className="bg-red-700 animate-pulse block w-4 h-4 rounded-full"></span> */}
          </div>

          <h3 className="text-white text-3xl font-bold text-center">
            {(data?.bracket || "")?.charAt(0).toUpperCase() +
              (data?.bracket || "").slice(1)}{" "}
            {(data?.bracket || "").includes("upper") ||
            (data?.bracket || "").includes("lower")
              ? "Bracket"
              : ""}{" "}
            {data?.round ? "Round " + data?.round : ""}
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
          <h1 className="text-white">{getUpdateText(data as ICurrentGame)}</h1>
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

      {data && (data?.playerAScore < 9 || data?.playerBScore < 9) && (
        <div className="flex mt-32 flex-wrap items-center justify-center">
          <h1 className="text-white animate-pulse">{displayMessage} </h1>
          {displayMessage === "Playing!" && (
            <div className="h-[80px] ">
              <img
                src="/loader/loader.gif"
                className="h-full w-full object-contain"
              />
            </div>
          )}
        </div>
      )}
      {data && (data?.playerAScore === 9 || data?.playerBScore === 9) && (
        <Card className="fixed left-0 bottom-0 w-screen rounded-tl-3xl rounded-tr-3xl  mt-28 px-6 py-10">
          <h3>Do you want to vote this as your match of the tournament?</h3>
          <button
            className="mt-10 disabled:cursor-not-allowed disabled:opacity-50 bg-green-500 text-white w-full py-4 rounded-lg text-3xl"
            onClick={() => {
              if (localStorage.getItem("code")) {
                handleVote();
              } else {
                toast.error("You have to login to use this feature!");
                navigate(`/login?from=${location.pathname}`);
              }
            }}
            disabled={hasVoted}
          >
            {hasVoted ? "Voted" : "Vote"}
          </button>
        </Card>
      )}
    </section>
  );
}

export default CurrentGame;
