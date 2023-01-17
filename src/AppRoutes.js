import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Analytics from "./pages/Analytics";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/analytics" />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  );
};
