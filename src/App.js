import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Header from './components/Header';
import "./App.css";
import Home from './components/Home';
import Detail from "./components/Detail";
import Contacts from "./components/Contacts";
import CustomMessage from "./components/CustomMessage";
import AboutUs from "./components/AboutUs";
// import Footer from "./components/Footer";


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Login/>}>
          </Route>
          <Route exact path = '/home' element={<Home/>}></Route>
          <Route exact path = '/aboutUs' element={<AboutUs/>}></Route>
          <Route exact path="/contacts" element={<Contacts/>}></Route>
          <Route exact path = '/customMessage' element={<CustomMessage/>}></Route>
        </Routes>
        {/* <Footer/> */}
      </Router>
    </div>
  );
}

export default App;
