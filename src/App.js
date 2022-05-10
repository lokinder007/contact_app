import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Profile from "./components/pages/Profile";
import Projects from "./components/pages/PhoneDir";
import Errorpage from "./components/pages/Errorpage";

// import "./stylesheets/auth.css";
import "./components/stylesheets/layout.css";
import AddContact from "./components/pages/AddContact";
import ViewContact from "./components/pages/ViewContact";
import EditContact from "./components/pages/EditContact";


function App() {



  return (
    <Router>
      <>
        <Navbar />
        <div className="main">
          <Routes>
            {/* <Route path="/login" exact element={<Login />} /> */}
            {/* <Route path="/register" exact element={<Register />} /> */}
            <Route path="/" exact element={<Home />} />
            <Route path="/profile" exact element={<Profile />} />
            <Route path="/about" exact element={<About />} />
            <Route path="/contact" exact element={<Contact />} />
            
            <Route path="/phoneDir" exact element={<Projects />} />
            <Route path="/contacts/add" exact element={<AddContact />} />
            <Route path="/contacts/view/:contactId" exact element={<ViewContact />} />
            <Route path="/contacts/edit/:contactId" exact element={<EditContact />} />
           

            <Route path="*" element={<Errorpage />} />
          </Routes>
        </div>
        <Footer/>
      </>
    </Router>
  );
}

export default App;