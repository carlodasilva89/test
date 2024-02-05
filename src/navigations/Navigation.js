import React from 'react';
import { useSelector } from 'react-redux';
import UserRoutes from './auth/users';
import AdminRoutes from './auth/admin';
import NotAuthRoutes from './not-auth';

const Navigation = () => {
  const { isAuth, isAdmin } = useSelector((state) => state.user);

  if (isAuth) {
    if (isAdmin) {
      return <AdminRoutes />;
    } else {
      return <UserRoutes />;
    }
  } else {
    return <NotAuthRoutes />;
  }
};

export default Navigation;