import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./auth";
import { LoginPage } from "./LoginPage";
import { BoardPage } from "./BoardPage";
import { ProtectedRoute } from "./ProtectedRoute";

function AuthenticatedRedirectToBoard() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/board" replace />;
  }
  return <LoginPage />;
}

function RootRedirect() {
  const { isAuthenticated } = useAuth();
  return (
    <Navigate to={isAuthenticated ? "/board" : "/login"} replace />
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/login" element={<AuthenticatedRedirectToBoard />} />
      <Route
        path="/board"
        element={
          <ProtectedRoute>
            <BoardPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<RootRedirect />} />
    </Routes>
  );
}

export default App;
