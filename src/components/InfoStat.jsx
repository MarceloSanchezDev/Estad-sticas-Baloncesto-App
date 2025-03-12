import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function InfoStat({ token, user }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);
  return (
    <div className="container text-center p-3 mt-5 aparecer vh-100">
      <h1 className="">Informacion de la estadistica </h1>;
    </div>
  );
}
