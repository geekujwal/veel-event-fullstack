import { useNavigate } from "react-router";
import axiosInstance from "../../api/axiosInstance";
import Card from "../../components/ui/card/Card";
import { useFetchData } from "../../hooks/api/useFetchData";
import { IMatch } from "../../types/IMatch";
import { useQueryClient } from "@tanstack/react-query";
import MainLoader from "../../components/ui/mainLoader/MainLoader";

function AdminList() {
  const { data, isLoading } = useFetchData<IMatch[]>(
    ["fetchAllMatches"],
    "/match/undecided"
  );

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const handleClick = () => {
    axiosInstance
      .put("/match", {
        playerAScore: 0,
        playerBScore: 0,
        isDeuce: false,
        isGameOver: false,
        isAdvantage: false,
        winner: false,
      })
      .then(() => {
        navigate("/admin-score");
      });
  };

  const handleSetCurrentMatch = (matchId: string) => {
    axiosInstance.put(`/match/currentGame/${matchId}`).then((res) => {
      queryClient.setQueryData(
        ["fetchAllMatches"],
        data?.map((item) => {
          return item.id === res.data.id ? res.data : item;
        })
      );
    });
  };

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="padding-primary">
      <h2 className="text-white mb-6 text-center">Match List</h2>
      {data?.map((match, index) => (
        <Card key={index} className="mb-4 flex justify-between">
          <div onClick={handleClick}>
            {match?.playerA?.name} vs {match?.playerB?.name}{" "}
            {match.isCurrentGame && <span>🔥</span>}
          </div>

          {!match.isCurrentGame && (
            <button
              className="text-primaryBlue text-xs"
              onClick={() => handleSetCurrentMatch(match.id)}
            >
              Set as current match
            </button>
          )}
        </Card>
      ))}
    </div>
  );
}

export default AdminList;
