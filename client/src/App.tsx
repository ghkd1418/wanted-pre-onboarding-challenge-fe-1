import { Route, Routes } from "react-router-dom";
import { Todo } from "./pages/todo/Todo";
import { Detail } from "./pages/todo/Detail";
import { Auth } from "./pages/auth/Auth";
import { Suspense } from "react";
import { Loading } from "./pages/Loading";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Todo />}>
            <Route path=":id" element={<Detail />} />
          </Route>
          <Route path="/auth/:state" element={<Auth />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
