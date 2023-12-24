import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Membership from "./pages/Membership";
import SignIn from "./pages/SignIn";
import Registration from "./pages/Registration";
import EventRegistration from "./pages/EventRegistration";
import Events from "./pages/Events";
import News from "./pages/News";
import Publication from "./pages/Publication";
import Gallery from "./pages/Gallery";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/membership" element={<Membership />}></Route>
        <Route path="/member-registration" element={<Registration />}></Route>
        <Route path="/events" element={<Events />}></Route>
        <Route
          path="/events-registration"
          element={<EventRegistration />}
        ></Route>
        <Route path="/news" element={<News />}></Route>
        <Route path="/publication" element={<Publication />}></Route>
        <Route path="/gallery" element={<Gallery />}></Route>
        <Route path="/singin" element={<SignIn />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
