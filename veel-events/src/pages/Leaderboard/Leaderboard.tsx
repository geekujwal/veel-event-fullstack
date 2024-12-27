import MainLoader from "../../components/ui/mainLoader/MainLoader";
import { useFetchData } from "../../hooks/api/useFetchData";
import { IMatch } from "../../types/IMatch";

const Leaderboard = () => {
  const { data, isLoading } = useFetchData<IMatch[]>(
    ["fetchMatchByVote"],
    "/match/sort/vote"
  );

  const top3 = data ? data.slice(0, 3) : [];

  const order = [1, 0, 2];

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="h-[100vh] w-full">
      <h2 className="text-white text-center mt-4">Leaderboard</h2>
      <section className="h-[40%] bg-primaryBlueLight self-end">
        <div className="flex h-[90%] items-end justify-evenly">
          {order.map((orderIndex) => {
            const match = top3[orderIndex];
            const heights = ["h-[140px]", "h-[100px]", "h-[80px]"];

            return (
              <div
                key={orderIndex}
                className={`bg-yellow-400 w-[20%] ${heights[orderIndex]} rounded-md relative`}
              >
                {match && (
                  <>
                    <p className="text-[34px] font-medium text-center w-full">
                      {orderIndex + 1}
                    </p>
                    <p className="text-md font-medium text-center w-full">
                      ({match.voteCount})
                    </p>
                    <div className="absolute h-[70px] w-[70px] rounded-full text-xs text-primaryBlue text-center font-bold border bg-white flex justify-center items-center -top-[80px] left-[8px]">
                      {match.playerA?.name} vs {match.playerB?.name}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>
      <section className="h-[70%] bg-white overflow-auto rounded-t-[42px] -translate-y-[42px] pt-7">
        {data?.slice(3, data.length)?.map((item, idx) => (
          <div className="flex items-center justify-center gap-[20px] px-[14px] py-[10px] ">
            <span className="text-black text-lg font-bold">{idx + 4}</span>
            <div className="bg-slate-100 border rounded-2xl w-[80%] p-[20px] flex gap-[20px] items-center">
              <div className=" h-[40px] w-[40px] rounded-full border bg-slate-50 flex justify-center items-center -top-[80px] left-[14px] text-[10px]">
                {item.playerA?.name.charAt(0)} vs {item.playerB?.name.charAt(0)}
              </div>
              <span className="text-subText">
                {item.playerA?.name} vs {item.playerB?.name}
              </span>
              <div className="grow"></div>
              <span className="text-primaryBlue text-xl font-bold">
                {item.voteCount}
              </span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Leaderboard;
