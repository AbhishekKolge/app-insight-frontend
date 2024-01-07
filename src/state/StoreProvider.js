'use client';
import { Provider } from 'react-redux';

import AuthChecker from './AuthChecker';

import store from './store';

const StoreProvider = (props) => {
  const { children } = props;

  return (
    <Provider store={store}>
      <AuthChecker />
      {children}
    </Provider>
  );
};

export default StoreProvider;
