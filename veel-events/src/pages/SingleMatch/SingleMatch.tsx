import { useFetchData } from "../../hooks/api/useFetchData";
import { ICurrentGame } from "../../types/ICurrentGame";
import Card from "../../components/ui/card/Card";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import axiosInstance from "../../api/axiosInstance";
import { useEffect, useState } from "react";
import MainLoader from "../../components/ui/mainLoader/MainLoader";

function SingleMatch() {
  const { matchId } = useParams();
  const { data, isLoading } = useFetchData<ICurrentGame>(
    ["fetchMatchById"],
    `/match/${matchId}`
  );

  const PLAYER_A = data?.playerA.name ?? "Player A";
  const PLAYER_B = data?.playerB.name ?? "Player B";

  const navigate = useNavigate();

  const [hasVoted, setHasVoted] = useState(false);

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
    if (data && !data.isGameOver) {
      navigate("/tournament-bracket");
    }
  }, [data]);

  if (isLoading) {
    return <MainLoader />;
  }

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
            Vote for Match of the tournament{" "}
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
          <h1 className="text-white">
            {data?.playerAScore} : {data?.playerBScore}
          </h1>
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

      {data && (
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
            disabled={
              hasVoted ||
              data.votes.includes(localStorage.getItem("code") as string)
            }
          >
            {hasVoted ? "Voted" : "Vote"}
          </button>
        </Card>
      )}
    </section>
  );
}

export default SingleMatch;
