import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const NavContainer = styled.div`
  background-color: #f8f9fa;
`;

const MainNav = styled.nav`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  gap: 2rem;
  border-bottom: 1px solid #eee;

  a {
    text-decoration: none;
    color: black;
    font-weight: bold;
    padding: 0.5rem 1rem;
    position: relative;

    &.active {
      &:after {
        content: '';
        position: absolute;
        bottom: -1rem;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: black;
      }
    }
  }
`;

const SubNav = styled.nav`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  gap: 2rem;
  border-bottom: 1px solid #eee;

  a {
    text-decoration: none;
    color: black;
    position: relative;

    &.active {
      color: blue;
      font-weight: bold;
    }
  }
`;

const Navigation = () => {
  const location = useLocation();

  // Show SubNav on home (/), shop, and thrift — but not on /ai
  const showSubNav =
    location.pathname === '/' ||
    location.pathname.startsWith('/shop') ||
    location.pathname.startsWith('/thrift');

  return (
    <NavContainer>
      <MainNav>
        <Link to="/shop" className={location.pathname.includes('/shop') ? 'active' : ''}>
          SHOP
        </Link>
        <Link to="/ai" className={location.pathname.includes('/ai') ? 'active' : ''}>
          FITVERSE AI
        </Link>
        <Link to="/thrift" className={location.pathname.includes('/thrift') ? 'active' : ''}>
          THRIFT STORE
        </Link>
      </MainNav>

      {showSubNav && (
        <SubNav>
          <Link to="/shop/all" className={location.pathname.includes('/all') ? 'active' : ''}>
            All
          </Link>
          <Link to="/shop/men" className={location.pathname.includes('/men') ? 'active' : ''}>
            MEN
          </Link>
          <Link to="/shop/women" className={location.pathname.includes('/women') ? 'active' : ''}>
            WOMEN
          </Link>
          <Link to="/shop/kids" className={location.pathname.includes('/kids') ? 'active' : ''}>
            KIDS
          </Link>
        </SubNav>
      )}
    </NavContainer>
  );
};

export default Navigation;
