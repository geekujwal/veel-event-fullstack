import { useQueryClient } from "@tanstack/react-query";
import { socket } from "../../socket";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { IMatch } from "../../types/IMatch";

const useSocket = () => {
  const queryClient = useQueryClient();
  const getData = queryClient.getQueryData(["fetchCurrentMatch"]);
  const navigate = useNavigate();

  console.log("listeing");
  const matchInitiation = () => {
    socket.emit("matchUpdated");
  };

  const listenMatchUpdate = () => {
    socket.on("matchUpdated", (data: IMatch) => {
      queryClient.setQueryData(["fetchCurrentMatch"], { getData, ...data });

      if (data.isGameOver) {
        toast.success("Match is completed");
        navigate("/tournament-bracket");
      }
    });
  };

  const listening = () => {
    listenMatchUpdate();
  };

  const detachListeners = () => {
    socket.off("matchUpdated");
  };

  useEffect(() => {
    if (socket.connected) {
      listening();
    }
    return () => {
      detachListeners();
    };
  }, [socket.connected]);

  return {
    matchInitiation,
  };
};

export default useSocket;
