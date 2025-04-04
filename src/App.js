import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form from "./Componenets/Form";
import  AdminPanel from "./Componenets/AdminPanel"



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
