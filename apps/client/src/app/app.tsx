import { Route, Routes } from "react-router-dom";
import { Home, NotFoundPage, SignIn, SignUp } from "../pages";
import { FooterLayout, ProtectedRoute, PublicOnlyRoute } from "../layouts";
export function App() {
  return (
    <div>
      <Routes>
        <Route element={<FooterLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<PublicOnlyRoute />}>
            <Route path="/auth/sign-in" element={<SignIn />} />
            <Route path="/auth/sign-up" element={<SignUp />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
