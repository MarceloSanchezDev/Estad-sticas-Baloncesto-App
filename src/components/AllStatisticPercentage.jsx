import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function AllStatisticPercentage({ token, user }) {
  const [allPorcentages, setAllPorcentages] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetch(`/api/statistics/allPorcentage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: user.username }),
        });
        const data = await result.json();
        setAllPorcentages(data.response);
        console.log(data.response);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    }

    fetchData();
  }, [user.username]);
  return (
    <div className="container text-center h-100 p-3 mt-5">
      <h1>Porcentaje Total</h1>
    </div>
  );
}
