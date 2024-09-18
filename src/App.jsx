import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Membership from "./pages/Membership";
import SignIn from "./pages/SignIn";
import MembershipRegistration from "./pages/Registration";
// import EventRegistration from "./pages/EventRegistration";
import Events from "./pages/Events";
import News from "./pages/News";
import NewsDetails from "./pages/NewsDetails";
import Publication from "./pages/Publication";
import Gallery from "./pages/Gallery";
import NoticeBoard from "./pages/NoticeBoard";
import ContactUs from "./pages/ContactUs";
import Program from "./pages/Program";
import TeamsUse from "./pages/TeamsUse";
import Faq from "./pages/Faq";
// import JobApplication from "./pages/JobApplication";
import EventSponsorRegistration from "./pages/EventSponsorRegistration";
import EventParticipateRegistration from "./pages/EventParticipateRegistration";
import EventDetails from "./pages/EventDetails";
import Career from "./pages/Career";
// import MembersApprovedList from "./components/MembersApprovedList/MembersApprovedList";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Donation from "./pages/Donation";
import PaymentCancel from "./pages/PaymentCancel";
import MemberDetails from "./pages/MemberDetails";
import TermsCondition from "./pages/TermsCondition";
import ProgramsDetails from "./pages/ProgramsDetails";
import AllPrograms from "./pages/AllPrograms";
import ErrorPages from "./pages/ErrorPages";
import MemberPayment from "./pages/MemberPayment";
import PaymentFail from "./pages/PaymentFail";
import PaymentSuccess from "./pages/PaymentSuccess";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="/all-programs" element={<AllPrograms />}></Route>
        <Route
          path="/programs-details/:id"
          element={<ProgramsDetails />}
        ></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/membership" element={<Membership />}></Route>
        <Route
          path="/member-registration"
          element={<MembershipRegistration />}
        ></Route>
        {/*  <Route
          path="/members-approved-list"
          element={
            <PrivateRoute>
              <MembersApprovedList />
            </PrivateRoute>
          }
        ></Route> */}
        <Route
          path="/member-details/:id"
          element={
            <PrivateRoute>
              <MemberDetails />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/members-payment/:id"
          element={
            <PrivateRoute>
              <MemberPayment />
            </PrivateRoute>
          }
        ></Route>

        <Route path="/events" element={<Events />}></Route>
        <Route path="/events-details/:id" element={<EventDetails />}></Route>
        <Route
          path="/event-sponsor-registration/:id"
          element={<EventSponsorRegistration />}
        ></Route>
        <Route
          path="/event-participate-registration/:id"
          element={<EventParticipateRegistration />}
        ></Route>
        <Route path="/news" element={<News />}></Route>
        <Route path="/news-details/:id" element={<NewsDetails />}></Route>
        <Route path="/publication" element={<Publication />}></Route>
        <Route path="/gallery" element={<Gallery />}></Route>
        <Route path="/notice-board" element={<NoticeBoard />}></Route>
        <Route
          path="/donation"
          element={
            <PrivateRoute>
              <Donation />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/contact-us" element={<ContactUs />}></Route>
        <Route path="/program" element={<Program />}></Route>
        <Route path="/teams-use" element={<TeamsUse />}></Route>
        <Route path="/career" element={<Career />}></Route>
        <Route path="/faq" element={<Faq />}></Route>
        <Route path="/terms-condition" element={<TermsCondition />}></Route>
        <Route path="/success/:tr_id" element={<PaymentSuccess />}></Route>
        <Route path="/fail/:tr_id" element={<PaymentFail />}></Route>
        <Route path="/cancel/:tr_id" element={<PaymentCancel />}></Route>
        <Route path="/singin" element={<SignIn />}></Route>
        <Route path="/*" element={<ErrorPages />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
