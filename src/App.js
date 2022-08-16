import { Link } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div>
      <h1>r3f examples</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
          paddingLeft: "1rem",
        }}
      >
        {/* <Link to="/invoices">Invoices</Link> |{" "} */}
        <Link to="/globe">globe</Link>
      </nav>
    </div>
  );
}

export default App;
