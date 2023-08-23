import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Layout } from "./shared/component/Layout/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Profile } from "./pages/Profile";
import { Todo } from "./pages/Todo";
import { ToastContainer, } from 'react-toastify';
import { Route, Routes } from "react-router-dom";
import { AuthenticationGuard } from "./shared/Auth/AuthenticationGuard";

export const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard/>}  />
        <Route path="/todo" element={<AuthenticationGuard component={Todo} />} />
        <Route path="/profile" element={<AuthenticationGuard component={Profile} />} />
      </Routes>
      <ToastContainer position="top-right"/>
    </Layout>
  );
};

export default App;
