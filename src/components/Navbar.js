import React from 'react';
import { useLocation } from 'react-router';
import { NavList, LinkStyled } from './Navs.styled';

const Links = [
  { to: '/', text: 'Home' },
  { to: '/starred', text: 'Starred' },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <NavList>
      {Links.map(item => (
        <li key={item.to}>
          <LinkStyled
            to={item.to}
            className={location.pathname === item.to ? 'active' : ''}
          >
            {item.text}
          </LinkStyled>
        </li>
      ))}
    </NavList>
  );
};

export default Navbar;
