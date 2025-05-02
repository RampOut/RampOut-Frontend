export let tipoUsuario;

function Login() {
  return (
    <>
      {/* Fondo que abarca toda la pantalla*/}
      <div className="background-login cointainer-fluid d-flex justify-content-center align-content-center align-items-center">
        {/* Recueadro donde se encuentran los botones*/}
        <div className="d-flex flex-column align-items-center top-50 start-50 box-shadow" style={{ background: "linear-gradient(#603e91,rgb(170, 83, 187))", width: "100vh", height: "60vh" }}>
          <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
            <button
              className="btn col-10 m-2 p-2"
              onClick={() => {
                localStorage.setItem("tipoUsuario", "profesor");
                window.location.href = "/login/profesor";
              }}>
              SOY UN PROFESOR
            </button>
            <button className="btn col-10 m-2 p-2" onClick={() => {
              localStorage.setItem("tipoUsuario", "alumno");
              (window.location.href = "/game");
            }
            }>
              SOY UN ALUMNO
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
