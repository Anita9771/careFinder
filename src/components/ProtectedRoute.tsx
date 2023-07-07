import React from 'react'
import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';

function ProtectedRoute({ children }: any) {
    const { user } = useUserAuth();
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  }

export default ProtectedRoute



// import React, { ReactNode } from 'react';
// import { Redirect, Route, useLocation } from 'react-router-dom';

// interface ProtectedRouteProps  {
//   isAuthenticated: boolean;
//   authenticationPath: string;
//   children: ReactNode;
// }



// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
//   isAuthenticated,
//   authenticationPath,
//   children,
//   ...rest
// }) => {
//     const location = useLocation();
//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         isAuthenticated ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: authenticationPath,
//               state: { from: location },
//             }}
//           />
//         )
//       }
//     />
//   );
// };

// export default ProtectedRoute;
