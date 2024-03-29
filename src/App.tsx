import { useContext } from "react";
import { findDOMNode } from "react-dom";
import ArchivePanel from "./components/ArchivePanel";
import Board from "./components/Board";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Keyboard from "./components/Keyboad";
import Message from "./components/Message";
import RemainingWords from "./components/RemainingWords";
import SettingsPanel from "./components/SettingsPanel";
import StatsPanel from "./components/StatsPanel";
import { GameContext } from "./context/game";
import useGame from "./hooks/useGame";

const App = () => {
  const { isArchivePanelOpen, isStatsPanelOpen, message } =
    useContext(GameContext);

  const { isWin, isSettingsPanelOpen } = useGame();

  return (
    <div className="container mx-auto items-center h-screen py-4 px-1 relative flex flex-col gap-2">
      <Header />

      <main className="grow flex flex-col gap-2 max-w-sm">
        <Board />

        <Keyboard />

        {isWin ||
          isArchivePanelOpen ||
          isSettingsPanelOpen ||
          isStatsPanelOpen || <RemainingWords />}
      </main>

      {message !== "" && <Message />}

      {isSettingsPanelOpen && <SettingsPanel />}

      {isArchivePanelOpen && <ArchivePanel />}

      {isStatsPanelOpen && <StatsPanel />}

      <Footer />
    </div>
  );
};

findDOMNode;

export default App;
