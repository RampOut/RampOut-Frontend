import { Outlet } from "react-router";

const url = "./index.ts";

function App() {
  return(<>
          <h1 className="text-bg-danger">RAMPOUT</h1>
          <Outlet />
        </>);
}

export default App;