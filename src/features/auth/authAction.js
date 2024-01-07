import toast from 'react-hot-toast';

import { authActions } from './authSlice';
import { checkTimeIsExpired, calculateRemainingTime } from '../../utils/time';

import {
  saveAuthCookie,
  getAuthCookie,
  removeAuthCookie,
} from '../../utils/storage';

const logoutHandler = (config) => {
  return (dispatch) => {
    removeAuthCookie();
    dispatch(authActions.logout());
    !config?.isSession && toast.error('Logged out');
  };
};

const checkLoginStatus = () => {
  return (dispatch) => {
    const authDetails = getAuthCookie();

    if (authDetails) {
      const accessExpired = checkTimeIsExpired(
        authDetails.accessExpirationTime
      );

      if (accessExpired) {
        removeAuthCookie();
        dispatch(authActions.logout());
        toast.error('Session Expired');
        return;
      }

      dispatch(authActions.login(authDetails));

      const autoLogoutTime = calculateRemainingTime(
        authDetails.accessExpirationTime
      );
      setTimeout(() => {
        removeAuthCookie();
        dispatch(authActions.logout());
        toast.error('Session Expired');
      }, autoLogoutTime);
      return;
    }

    removeAuthCookie();
    dispatch(authActions.logout());
  };
};

const loginHandler = ({ name, profileImage }) => {
  return (dispatch) => {
    const accessExpirationTime =
      Date.now() + +process.env.ACCESS_TOKEN_EXPIRATION_TIME;

    saveAuthCookie({
      accessExpirationTime,
      name,
      profileImage,
    });
    dispatch(
      authActions.login({
        accessExpirationTime,
        name,
        profileImage,
      })
    );

    toast.success('Logged in successfully');

    const autoLogoutTime = calculateRemainingTime(accessExpirationTime);
    setTimeout(() => {
      removeAuthCookie();
      dispatch(authActions.logout());
      toast.error('Session Expired');
    }, autoLogoutTime);
  };
};

const updateUserInfoHandler = (updatedInfo) => {
  return (dispatch) => {
    const authDetails = getAuthCookie();

    Object.entries(updatedInfo).forEach(([key, value]) => {
      authDetails[key] = value;
    });

    saveAuthCookie(authDetails);

    dispatch(authActions.updateUserInfo(authDetails));
  };
};

export { checkLoginStatus, loginHandler, logoutHandler, updateUserInfoHandler };
