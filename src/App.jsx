import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Login from "./components/Login";
import Main from "./components/Main";
import Register from "./components/Register";
import Profile from "./components/Profile";
import NewStatistic from "./components/NewStatistic";
import AllStatistic from "./components/AllStatistics";
import AllStatisticPercentage from "./components/AllStatisticPercentage";
import InfoStat from "./components/InfoStat";
import Inicio from "./components/Inicio";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { StatisticsProvider } from "./context/StatisticContext";

function AppContent() {
  const { token, user, login, logout } = useAuth();

  return (
    <Router>
      <div className="container-fluid">
        {token && <Nav logout={logout} />}
        <div className="content">
          <Routes>
            <Route path="/" element={<Main token={token} />} />
            <Route
              path="/inicio"
              element={<Inicio login={login} token={token} user={user} />}
            />
            <Route
              path="/login"
              element={<Login login={login} token={token} />}
            />
            <Route
              path="/register"
              element={<Register login={login} token={token} />}
            />
            <Route
              path="/profile"
              element={<Profile token={token} user={user} />}
            />
            <Route
              path="/newStatistic"
              element={<NewStatistic token={token} user={user} />}
            />
            <Route
              path="/allStatistic"
              element={<AllStatistic token={token} user={user} />}
            />
            <Route
              path="/allStatisticPercentage"
              element={<AllStatisticPercentage token={token} user={user} />}
            />
            <Route
              path="/infoStat"
              element={<InfoStat token={token} user={user} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
function App() {
  return (
    <AuthProvider>
      <StatisticsProvider>
        <AppContent />
      </StatisticsProvider>
    </AuthProvider>
  );
}

export default App;
