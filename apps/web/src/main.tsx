import { createRoot } from "react-dom/client";
import "./style.css";

const App = () => <div>Hi</div>;

createRoot(document.getElementById("app")!).render(<App />);
