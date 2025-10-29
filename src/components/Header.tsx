import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { HiOutlineSearch } from 'react-icons/hi';
import { AiOutlineHeart, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import logoImg from '../assets/logo.jpg';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  border-bottom: 1px solid #eee;
`;

const Logo = styled(Link)`
  font-size: 2.2rem;
  font-weight: bold;
  color: black;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.7rem;
`;

const LogoImage = styled.img`
  height: 2.8rem;
  width: 2.8rem;
  position: relative;
  top: -6px;
  object-fit: contain;
  display: block;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border: 2px solid black;
  border-radius: 25px;
  padding: 0.5rem 1rem;
  width: 400px;

  input {
    border: none;
    outline: none;
    width: 100%;
    margin-right: 0.5rem;
    font-size: 1rem;
  }

  svg {
    color: #666;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: black;
    }
  }
`;

const IconsContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  a {
    color: black;
    text-decoration: none;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    border-radius: 50%;
    transition: all 0.2s ease;

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
      color: #444;
      transform: scale(1.1);
    }

    svg {
      display: block;
    }
  }
`;

const LogoText = styled.span`
  font-family: 'Mokoto', sans-serif; /* Apply Mokoto font here */
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo to="/">
        <LogoImage src={logoImg} alt="Fitverse Logo" />
        <LogoText>FITVERSE</LogoText>
      </Logo>
      <SearchBar>
        <input type="text" placeholder="Search" />
        <HiOutlineSearch size={20} />
      </SearchBar>
      <IconsContainer>
        <Link to="/wishlist"><AiOutlineHeart size={24} /></Link>
        <Link to="/cart"><AiOutlineShoppingCart size={24} /></Link>
        <Link to="/profile"><AiOutlineUser size={24} /></Link>
      </IconsContainer>
    </HeaderContainer>
  );
};

export default Header;
