import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router";
import AdminList from "./pages/AdminList/AdminList";
import AdminScore from "./pages/AdminScore/AdminScore";
import CurrentGame from "./pages/CurrentGame/CurrentGame";
import Home from "./pages/Home/Home";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Login from "./pages/Login/Login";
import Prize from "./pages/Prize/Prize";
import SingleMatch from "./pages/SingleMatch/SingleMatch";
import TournamentBracket from "./pages/TournamentBracket/TournamentBracket";
import Navbar from "./views/Navbar/Navbar";
import Sponsors from "./pages/Sponsors/Sponsors";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="current-game" element={<CurrentGame />} />
        <Route path="prize" element={<Prize />} />
        <Route path="tournament-bracket" element={<TournamentBracket />} />
        <Route path="login" element={<Login />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="vote/:matchId" element={<SingleMatch />} />
        <Route path="sponsors" element={<Sponsors />} />
        {/* admin */}
        <Route path="admin-score" element={<AdminScore />} />
        <Route path="admin-match-list" element={<AdminList />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;