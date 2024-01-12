import LandingPage from './pages/LandingPage'
import { DynamicIsland } from "./components/DynamicIsland/index";

import {
  Routes,
  Route,
} from "react-router-dom";

function App() {
return(
  <div className="App">
  <Routes>
    <Route path="/" element={<LandingPage />} />
    {/* <Route path="/login" element={<LoginPage />} /> */}
  </Routes>
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <DynamicIsland />
  </div>
</div>
)
}

export default App
