import React from 'react';
import { Link } from 'react-router-dom';

const Links = [
  { to: '/', text: 'Home' },
  { to: '/starred', text: 'Starred' },
];

const Navbar = () => {
  return (
    <ul>
      {Links.map(item => (
        <li key={item.to}>
          <Link to={item.to}>{item.text}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
