import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav/Nav.jsx";
import Login from "./components/Login/Login.jsx";
import Main from "./components/Main/Main.jsx";
import Register from "./components/Register/Register.jsx";
import Profile from "./components/Profile/Profile.jsx";
import NewStatistic from "./components/NewStatistic/NewStatistic.jsx";
import AllStatistic from "./components/AllStatistics/AllStatistics.jsx";
import AllStatisticPercentage from "./components/AllStatisticPercentage/AllStatisticPercentage.jsx";
import InfoStat from "./components/InfoStat/InfoStat.jsx";
import Inicio from "./components/Inicio/Inicio.jsx";
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
