import logo from './logo.svg';
import './App.css';

function App() {
    const alertHandler = () => {
        alert("Hello react")
    };
    return (
        <div className="App">
            <header className="App-header">

                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <div>
                    <button onClick={alertHandler}>CLICK ME!!</button>
                </div>
                <div>
                    <a  className="App-link" href="https://github.com/matyjasiakm/daft-frontend-4begginers">https://github.com/matyjasiakm/daft-frontend-4begginers</a>
                </div>
            </header>
        </div>
    );
}

export default App;
