import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { Container } from "react-bootstrap";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps>= ({children}) => {
  return (
    <div>
      <Header />
      <Container>
        {children}
      </Container>
    </div>
  );
};
