// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./NavBar";
import ResponsiveAppBar from "./SampleNavBar";
function App() {
  return (
    <div className="App">
    <div style={{textAlign: 'center'}}>
  <h3 style={{color: '#a51c24', display: 'inline-block', margin: '0'}}>Attendance Calculator</h3>
  <h3 style={{color: '#286090', display: 'inline-block', margin: '0'}}>-KLU</h3>
</div>


      <Router>
        <NavBar/>
        {/* <ResponsiveAppBar/> */}
      </Router>
      <div>
 
      </div>
    </div>
  );
}

export default App;
