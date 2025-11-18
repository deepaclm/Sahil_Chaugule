import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AnimatePresence } from "framer-motion";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import PageTransition from "./components/PageTransition.jsx";
import Work from "./components/Work.jsx";


// Import pages
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Vision from "./pages/Vision.jsx";
import Journey from "./pages/Journey.jsx";
import Media from "./pages/Media.jsx";
import Events from "./pages/Events.jsx";
import Join from "./pages/Join.jsx";
import Contact from "./pages/Contact.jsx";

import "./App.css";

// Separate component to handle route transitions
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />
        <Route
          path="/vision"
          element={
            <PageTransition>
              <Vision />
            </PageTransition>
          }
        />
        <Route
          path="/journey"
          element={
            <PageTransition>
              <Journey />
            </PageTransition>
          }
        />
        <Route
          path="/media"
          element={
            <PageTransition>
              <Media />
            </PageTransition>
          }
        />
        <Route
          path="/events"
          element={
            <PageTransition>
              <Events />
            </PageTransition>
          }
        />
        <Route
          path="/join"
          element={
            <PageTransition>
              <Join />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <Contact />
            </PageTransition>
          }
        />

        <Route
  path="/work/:id"
  element={
    <PageTransition>
      <Work />
    </PageTransition>
  }
/>

      </Routes>
    </AnimatePresence>
  );
}


function App() {
  const { t } = useTranslation();

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />

        {/* Main content area */}
        <main className="flex-1 overflow-hidden">
          <AnimatedRoutes />
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
