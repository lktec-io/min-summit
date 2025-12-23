import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScanPage from "./ScanPage";
import CreateGuest from "./pages/CreateGuest";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ScanPage />} />
        <Route path="/create" element={<CreateGuest />} />
      </Routes>
    </BrowserRouter>
  );
}
