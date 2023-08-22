import { useAuth0 } from "@auth0/auth0-react";
import React, {useEffect, useState} from "react";

export const Profile: React.FC = ({}) => {
  const { user , isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  
  // useEffect(() => {
  //   const getUserMetadata = async () => {
  //     const domain = "dev-69uztrfh.us.auth0.com";
  
  //     try {
  //       const accessToken = await getAccessTokenSilently({
  //         authorizationParams: {
  //           audience: `https://${domain}/api/v2/`,
  //           scope: "read:current_user",
  //         },
  //       });
  
  //       const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;
  
  //       const metadataResponse = await fetch(userDetailsByIdUrl, {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       });
  
  //       const { user_metadata } = await metadataResponse.json();
  
  //       setUserMetadata(user_metadata);
  //     } catch (e: any) {
  //       console.log(e.message);
  //     }
  //   };
  
  //   getUserMetadata();
  // }, [getAccessTokenSilently, user?.sub]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!isAuthenticated || !user) {
    return <div>User not authenticated.</div>;
  }


  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

