import React from 'react';
import useUser from '../../store/useUser';

function login() {
  const isLogin = useUser((state) => state.isLogin);

  console.log(isLogin);
  return (
    <React.Fragment>
      <div>login</div>
      <div>isLogin : {isLogin ? 'yess' : 'no'}</div>
    </React.Fragment>
  );
}

export default login;
