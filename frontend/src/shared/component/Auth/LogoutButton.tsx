import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

export const LogoutButton: React.FC = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };
  return <Button onClick={handleLogout} className="m-1">Log Out</Button>;
};
