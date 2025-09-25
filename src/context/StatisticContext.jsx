import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext"; // Usamos AuthContext para obtener el usuario

const StatisticsContext = createContext();

export const StatisticsProvider = ({ children }) => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user?.username) return;

    async function fetchStatistics() {
      try {
        const result = await fetch(`/api/statistics`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: user.username }),
        });
        const data = await result.json();
        setStats(data.response[0]);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    }

    fetchStatistics();
  }, [user]);

  return (
    <StatisticsContext.Provider value={{ stats, setStats }}>
      {children}
    </StatisticsContext.Provider>
  );
};

export const useStatistics = () => useContext(StatisticsContext);
