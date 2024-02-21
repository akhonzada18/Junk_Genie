import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/hs/Topbar";
import Sidebar from "./scenes/hs/Sidebar";
import Dashboard from "./scenes/dashboard";
import Profile from "./scenes/profile";
import Login from "./scenes/Login";
import Signup from "./scenes/Signup";
import UserManagment from "./scenes/userManagment";
import ComplaintManagment from "./scenes/complaintManagment";
import WorkerManagemnt from "./scenes/workerMangment";
import Bar from "./scenes/bar";
import Pie from "./scenes/pie";
import Feedback from "./scenes/feedback";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import GeographyChart from "./components/GeographyChart";
import PickupManagement from "./scenes/pickupManagment/pickupManagment";
import WorkerMap from "./components/WorkerMap";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/userManagment" element={<UserManagment />} />
              <Route path="/workerManagment" element={<WorkerManagemnt />} />
              <Route
                path="/complaintManagment"
                element={<ComplaintManagment />}
              />
              <Route path="/pickupManagment" element={<PickupManagement />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/workersTracking" element={<WorkerMap />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
