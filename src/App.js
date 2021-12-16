import './App.css';
import Navbar from "./components/Navbar.jsx";
import Routes from "./routes/Routes.jsx";
import paytm from "./images/paytm.svg";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes/>
      <div className='paytm_container'>
        <a className='paytm_link' href='https://paytm.com/' target={"_blank"}>
          <img src={paytm} alt='paytm' />
        </a>
      </div>
    </div>
  );
}

export default App;
