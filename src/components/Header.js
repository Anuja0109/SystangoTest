import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Optimized Navbar Component
const Header = ({ title }) => {
  const memoTitle = useMemo(() => title, []);
  return (
    <nav className="navbar navbar-expand-lg">
      <Link className="navbar-brand" to="/">
        {memoTitle}
      </Link>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active" />
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Compose Team
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/firstquarter">
              First Quarter
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

const MemoizedHeader = React.memo(Header);

export default MemoizedHeader;
