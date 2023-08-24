import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

export const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/todo",
      },
      authorizationParams: {
        prompt: "login",
        scope: 'openid profile',
      },
    });
  };

  return <Button onClick={handleLogin} className="m-1">Log In</Button>;
};