import { Link } from "react-router";

export default function StatLoader() {
  return (
    <div
      className="card col-sm-6 col-xs-12 col-lg-3 m-5"
      style={{ margin: "0.5px" }}
    >
      <div className="card-header">
        <h5 className="card-title placeholder-glow ">
          <span className="placeholder col-6"></span>
        </h5>
        <h6 className="card-subtitle placeholder-glow mb-2 text-body-secondary">
          <span className="placeholder col-6"></span>
        </h6>
      </div>
      <div className="card-body placeholder-glow d-flex flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status"></div>
        <span className="">Cargando...</span>
      </div>
      <ul className="list-group list-group-flush rounded placeholder-glow">
        <li className="list-group-item text-bg-info placeholder"></li>
        <li className="list-group-item text-bg-info placeholder"></li>
        <li className="list-group-item text-bg-info placeholder"></li>
      </ul>
      <div className="p-2 placeholder-glow">
        <Link
          to={"/"}
          className="btn btn-success disabled placeholder col-6"
          aria-disabled="true"
        ></Link>
      </div>
    </div>
  );
}
