import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Layout } from "./shared/component/Layout/Layout";
import { Todo } from "./pages/Todo";
import {  ToastContainer } from 'react-toastify';
import { Route, Routes } from "react-router-dom";
import { AuthenticationGuard } from "./shared/Auth/AuthenticationGuard";

export const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        Route
        <Route path="/" element={<AuthenticationGuard component={Todo} />} />
      </Routes>
      <ToastContainer />
    </Layout>
  );
};

export default App;
