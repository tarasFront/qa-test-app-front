import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';
import UserMenu from '../../UserMenu/UserMenu';

import { getIsLoggedIn } from '../../../redux/authorization/authorization-selectors';

export default function Navigation() {
  const isLoggedIn = useSelector(getIsLoggedIn);

  return (
    <nav>
      {isLoggedIn ? (
        <UserMenu />
      ) : (
        <>
          <NavLink exact to="/contacts" className={s.link}>
            Contacts
          </NavLink>
        </>
      )}
    </nav>
  );
}
