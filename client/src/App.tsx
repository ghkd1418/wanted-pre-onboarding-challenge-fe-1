import { Route, Routes } from "react-router-dom";
import { Todo } from "./pages/todo/Todo";
import { Detail } from "./pages/todo/Detail";
import { Auth } from "./pages/auth/Auth";
import { checkToken } from "./utils/check";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Todo />}>
          <Route path=":id" element={<Detail />} />
        </Route>
        <Route path="/auth/:state" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
