import { Link } from "react-router";
import { useFetchData } from "../../hooks/api/useFetchData";
import { IBracket } from "../../types/IBracket";
import MainLoader from "../../components/ui/mainLoader/MainLoader";

function TournamentBracket() {
  const { data, isLoading } = useFetchData<IBracket>(
    ["fetchBracketMatches"],
    "/match"
  );

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">
      <div className="w-full max-w-screen-xl p-4 overflow-x-auto">
        <h1 className="text-3xl font-bold text-center mb-6">
          Tournament Bracket
        </h1>
        <div className="flex flex-wrap justify-center space-x-4 min-w-max">
          {data &&
            data.brackets.upper.map((round, idx) => (
              <div
                key={round.round}
                className="flex flex-col items-center space-y-8"
              >
                <h2 className="text-xl font-semibold mb-4">
                  Round {round.round}
                </h2>
                <div
                  className={`relative  flex h-full flex-col ${idx < 2 && "space-y-4"}`}
                >
                  {idx > 1 && <div className="grow"></div>}

                  {round.matches.map((match) => (
                    <>
                      {idx < 2 && <div className="grow"></div>}
                      <div
                        key={match.id}
                        className={`bg-gray-700 rounded-lg shadow-md p-4 w-64 sm:w-72 relative ${idx > 1 && "mb-20"} `}
                      >
                        <div
                          className={`flex justify-between ${match.winner_id && match.winner_id === match.playerA.id ? "font-bold text-green-400" : ""}`}
                        >
                          <span>{match.playerA.name || "TBD"}</span>
                          <span>{match.playerA.score}</span>
                        </div>
                        <div
                          className={`flex justify-between ${match.winner_id && match.winner_id === match.playerB.id ? "font-bold text-green-400" : ""}`}
                        >
                          <span>{match.playerB.name || "TBD"}</span>
                          <span>{match.playerB.score}</span>
                        </div>
                        <hr className="my-2 border-gray-500" />
                        <div className="text-center text-sm text-gray-400">
                          {match.is_game_over ? (
                            <>
                              Game Over.{" "}
                              <Link
                                to={`/vote/${match.id}`}
                                className="text-green-400"
                              >
                                Vote?
                              </Link>
                            </>
                          ) : (
                            "Upcoming"
                          )}
                        </div>
                        {/* {roundIndex < data.brackets.upper.length - 1 &&
                        matchIndex % 2 === 0 && (
                          <div className="absolute w-full h-0.5 bg-gray-600 top-full left-0">
                            <div className="absolute h-16 w-0.5 bg-gray-600 left-1/2 top-0"></div>
                          </div>
                        )} */}
                      </div>

                    </>
                  ))}
                  {idx > 1 && <div className="grow"></div>}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default TournamentBracket;
