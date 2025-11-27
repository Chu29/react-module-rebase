import useBearStore from "./store/bearStore";
import './index.css'

export default function App() {
  const { bears, increase } = useBearStore();

  return (
    <div className="container">
      <h1>{bears} bears around hear...</h1>
      <button onClick={increase}>Add one</button>
    </div>
  );
}
