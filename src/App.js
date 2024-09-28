
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          CapDragons
        </p>
      </header>
        <Navbar>
            <li><a href="/">Dashboard</a></li>
            <li><a href="/map">

            </a></li>
            <li><a href="/stuff">Dashboard</a></li>
        </Navbar>
    </div>
  );
}

export default App;
