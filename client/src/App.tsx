import { Route, Routes } from "react-router-dom";

import { SignUp } from "./pages/sign-up/SignUp";
import { Login } from "./pages/login/Login";
import { Todo } from "./pages/todo/Todo";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/auth" element={<SignUp />} />
        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
