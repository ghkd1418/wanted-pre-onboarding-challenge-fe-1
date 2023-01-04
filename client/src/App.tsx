import { SignUp } from "./pages/sign-up/SignUp";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/auth" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
