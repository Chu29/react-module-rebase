import "./App.css";

function App() {
  return (
    <>
      <h1>Tic Tac Toe</h1>
      <main>
        <div className="container">
          {Array.from({ length: 9 }, (_, index) => index + 1).map((square) => (
            <Square key={square} />
          ))}
        </div>
      </main>
    </>
  );
}

function Square() {
  return <button></button>;
}

export default App;
