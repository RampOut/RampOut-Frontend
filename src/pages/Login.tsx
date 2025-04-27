function Login() {
  return (
    <>
      <div className="background-login cointainer-fluid d-flex justify-content-center align-content-center align-items-center">
        <div className="d-flex flex-column align-items-center top-50 start-50 box-shadow"  style={{ background: "linear-gradient(#e0e0e0, #c0c0c0)", width: "100vh", height:"60vh" }}>
          <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
          <button
            className="btn col-10 m-2 p-2"
            onClick={() => (window.location.href = "/login/profesor")}>
            SOY UN PROFESOR
          </button>
          <button className="btn col-10 m-2 p-2" onClick={() => (window.location.href = "equipo")}>
            SOY UN ALUMNO
          </button>
          </div>
          </div>
        </div>
    </>
  );
}

export default Login;
