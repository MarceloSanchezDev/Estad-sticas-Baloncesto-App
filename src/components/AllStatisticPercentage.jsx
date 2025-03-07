import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function AllStatisticPercentage({ token }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);
  return (
    <div className="container text-center h-100 p-3 mt-5">
      <h1>Porcentaje Total</h1>
    </div>
  );
}
