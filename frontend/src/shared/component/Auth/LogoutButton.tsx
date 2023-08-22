import { useAuth0 } from "@auth0/auth0-react";
import Cookies from 'js-cookie';
import { Button } from "react-bootstrap";

export const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    Cookies.remove('access_token');
    Cookies.remove('id_token')
    logout({ logoutParams: { returnTo: window.location.origin } })
  };
  return (
    <Button onClick={handleLogout}>
      Log Out
    </Button>
  );
};
