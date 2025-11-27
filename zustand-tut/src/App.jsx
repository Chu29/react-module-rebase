import useBearStore from "./store/bearStore";
import "./index.css";

export default function App() {
  const bears = useBearStore((state) => state.bears);

  return (
    <div className="container">
      <h1>{bears} bears around hear...</h1>
      <Controls />
    </div>
  );
}

function Controls() {
  const increase = useBearStore((state) => state.increase);
  return <button onClick={increase}>Add one</button>;
}
