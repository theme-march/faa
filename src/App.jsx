// import React, { Suspense, lazy } from "react";
// import { Routes, Route } from "react-router-dom";
// import Layout from "./layout/Layout";
// import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
// import HomeLoading from "./components/UI/HomeLoading";

// const Home = lazy(() => import("./pages/Home"));
// const About = lazy(() => import("./pages/About"));
// const Membership = lazy(() => import("./pages/Membership"));
// const SignIn = lazy(() => import("./pages/SignIn"));
// const MembershipRegistration = lazy(() => import("./pages/Registration"));
// const Events = lazy(() => import("./pages/Events"));
// const News = lazy(() => import("./pages/News"));
// const NewsDetails = lazy(() => import("./pages/NewsDetails"));
// const Publication = lazy(() => import("./pages/Publication"));
// const Gallery = lazy(() => import("./pages/Gallery"));
// const NoticeBoard = lazy(() => import("./pages/NoticeBoard"));
// const ContactUs = lazy(() => import("./pages/ContactUs"));
// const Program = lazy(() => import("./pages/Program"));
// const Faq = lazy(() => import("./pages/Faq"));
// const EventSponsorRegistration = lazy(() => import("./pages/EventSponsorRegistration"));
// const EventParticipateRegistration = lazy(() => import("./pages/EventParticipateRegistration"));
// const EventDetails = lazy(() => import("./pages/EventDetails"));
// const Career = lazy(() => import("./pages/Career"));
// const Donation = lazy(() => import("./pages/Donation"));
// const PaymentCancel = lazy(() => import("./pages/PaymentCancel"));
// const MemberDetails = lazy(() => import("./pages/MemberDetails"));
// const TermsCondition = lazy(() => import("./pages/TermsCondition"));
// const ProgramsDetails = lazy(() => import("./pages/ProgramsDetails"));
// const AllPrograms = lazy(() => import("./pages/AllPrograms"));
// const ErrorPages = lazy(() => import("./pages/ErrorPages"));
// const MemberPayment = lazy(() => import("./pages/MemberPayment"));
// const PaymentFail = lazy(() => import("./pages/PaymentFail"));
// const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
// const MemberDetailsUpdate = lazy(() => import("./pages/MemberDetailsUpdate"));
// const UpdatePassword = lazy(() => import("./pages/MemberPassWordUpdate"));
// const ResetPassword = lazy(() => import("./pages/ResetPassword"));

// function App() {
//   const routeFallback = (
//     <div>
//       <HomeLoading />
//       <div className="ak-height-60 ak-height-lg-30" />
//     </div>
//   );

//   return (
//     <Suspense fallback={routeFallback}>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Home />}></Route>
//           <Route path="/all-programs" element={<AllPrograms />}></Route>
//           <Route
//             path="/programs-details/:id"
//             element={<ProgramsDetails />}
//           ></Route>
//           <Route path="/about" element={<About />}></Route>
//           <Route path="/membership" element={<Membership />}></Route>
//           <Route
//             path="/member-registration"
//             element={<MembershipRegistration />}
//           ></Route>
//           {/*  <Route
//           path="/members-approved-list"
//           element={
//             <PrivateRoute>
//               <MembersApprovedList />
//             </PrivateRoute>
//           }
//           ></Route> */}
//           <Route
//             path="/member-details/:id"
//             element={
//               <PrivateRoute>
//                 <MemberDetails />
//               </PrivateRoute>
//             }
//           ></Route>

//           <Route
//             path="/member-details-update/:id"
//             element={
//               <PrivateRoute>
//                 <MemberDetailsUpdate />
//               </PrivateRoute>
//             }
//           ></Route>
//           <Route
//             path="/member-password-update/:id"
//             element={
//               <PrivateRoute>
//                 <UpdatePassword />
//               </PrivateRoute>
//             }
//           ></Route>

//           <Route
//             path="/members-payment/:id"
//             element={
//               <PrivateRoute>
//                 <MemberPayment />
//               </PrivateRoute>
//             }
//           ></Route>

//           <Route path="/events" element={<Events />}></Route>
//           <Route path="/events-details/:id" element={<EventDetails />}></Route>
//           <Route
//             path="/event-sponsor-registration/:id"
//             element={<EventSponsorRegistration />}
//           ></Route>
//           <Route
//             path="/event-participate-registration/:id"
//             element={<EventParticipateRegistration />}
//           ></Route>
//           <Route path="/news" element={<News />}></Route>
//           <Route path="/news-details/:id" element={<NewsDetails />}></Route>
//           <Route path="/publication" element={<Publication />}></Route>
//           <Route path="/gallery" element={<Gallery />}></Route>
//           <Route path="/notice-board" element={<NoticeBoard />}></Route>
//           <Route
//             path="/donation"
//             element={
//               <PrivateRoute>
//                 <Donation />
//               </PrivateRoute>
//             }
//           ></Route>
//           <Route path="/contact-us" element={<ContactUs />}></Route>
//           <Route path="/program" element={<Program />}></Route>
//           <Route path="/career" element={<Career />}></Route>
//           <Route path="/faq" element={<Faq />}></Route>
//           <Route path="/terms-condition" element={<TermsCondition />}></Route>
//           <Route path="/success/:tr_id" element={<PaymentSuccess />}></Route>
//           <Route path="/fail/:tr_id" element={<PaymentFail />}></Route>
//           <Route path="/cancel/:tr_id" element={<PaymentCancel />}></Route>
//           <Route path="/singin" element={<SignIn />}></Route>
//           <Route path="/reset-password" element={<ResetPassword />}></Route>
//           <Route path="/*" element={<ErrorPages />}></Route>
//         </Route>
//       </Routes>
//     </Suspense>
//   );
// }

// export default App;
import React, { memo } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

/**
 * 🔥 All Pages (Direct Import = Fast Navigation)
 */
import Home from "./pages/Home";
import About from "./pages/About";
import Membership from "./pages/Membership";
import SignIn from "./pages/SignIn";
import MembershipRegistration from "./pages/Registration";
import Events from "./pages/Events";
import News from "./pages/News";
import NewsDetails from "./pages/NewsDetails";
import Publication from "./pages/Publication";
import Gallery from "./pages/Gallery";
import NoticeBoard from "./pages/NoticeBoard";
import ContactUs from "./pages/ContactUs";
import Program from "./pages/Program";
import Faq from "./pages/Faq";
import EventSponsorRegistration from "./pages/EventSponsorRegistration";
import EventParticipateRegistration from "./pages/EventParticipateRegistration";
import EventDetails from "./pages/EventDetails";
import Career from "./pages/Career";
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
import MemberDetailsUpdate from "./pages/MemberDetailsUpdate";
import UpdatePassword from "./pages/MemberPassWordUpdate";
import ResetPassword from "./pages/ResetPassword";
import CommitteeMemberDetails from "./pages/CommitteeMemberDetails";

/**
 * 🔐 Private Wrapper
 */
const withPrivate = (Component) => (
  <PrivateRoute>
    <Component />
  </PrivateRoute>
);

/**
 * ⚡ Route Config
 */
const routes = [
  { path: "/", element: <Home />, index: true },
  { path: "/about", element: <About /> },
  { path: "/committee-member/:id", element: <CommitteeMemberDetails /> },
  { path: "/all-programs", element: <AllPrograms /> },
  { path: "/programs-details/:id", element: <ProgramsDetails /> },
  { path: "/membership", element: <Membership /> },
  { path: "/member-registration", element: <MembershipRegistration /> },

  { path: "/member-details/:id", element: withPrivate(MemberDetails) },
  { path: "/member-details-update/:id", element: withPrivate(MemberDetailsUpdate) },
  { path: "/member-password-update/:id", element: withPrivate(UpdatePassword) },
  { path: "/members-payment/:id", element: withPrivate(MemberPayment) },

  { path: "/events", element: <Events /> },
  { path: "/events-details/:id", element: <EventDetails /> },
  { path: "/event-sponsor-registration/:id", element: <EventSponsorRegistration /> },
  { path: "/event-participate-registration/:id", element: <EventParticipateRegistration /> },

  { path: "/news", element: <News /> },
  { path: "/news-details/:id", element: <NewsDetails /> },

  { path: "/publication", element: <Publication /> },
  { path: "/gallery", element: <Gallery /> },
  { path: "/notice-board", element: <NoticeBoard /> },

  { path: "/donation", element: <Donation /> },

  { path: "/contact-us", element: <ContactUs /> },
  { path: "/program", element: <Program /> },
  { path: "/career", element: <Career /> },
  { path: "/faq", element: <Faq /> },
  { path: "/terms-condition", element: <TermsCondition /> },

  { path: "/success/:tr_id", element: <PaymentSuccess /> },
  { path: "/fail/:tr_id", element: <PaymentFail /> },
  { path: "/cancel/:tr_id", element: <PaymentCancel /> },

  { path: "/singin", element: <SignIn /> },
  { path: "/reset-password", element: <ResetPassword /> },

  { path: "*", element: <ErrorPages /> },
];

/**
 * 🚀 App Component
 */
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.index ? undefined : route.path}
            index={route.index}
            element={route.element}
          />
        ))}
      </Route>
    </Routes>
  );
}

export default memo(App);
