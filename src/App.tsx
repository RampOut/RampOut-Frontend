<<<<<<< HEAD
function App() {
  return (<>
    <h1 className="text-bg-danger">RAMPOUT</h1>
  </>);
=======
import { Outlet } from "react-router";

const url = "./index.ts";

function App() {
  return(<>
          <h1 className="text-bg-danger">RAMPOUT</h1>
          <Outlet />
        </>);
>>>>>>> BootstrapAdmin
}

export default App;