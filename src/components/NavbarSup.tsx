import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useUserAuth } from "../context/UserAuthContext";

interface MobileMenuProps {
    isOpen: boolean;
  }

const Button = styled.button`
  border: none;
  border-radius: 0.8rem;
  background-color: #3a75f4;
  color: white;
  font-size: 1.2rem;
  padding: 0.8rem 2rem;
  cursor: pointer;
  margin-left: 1rem;

  @media screen and (max-width: 480px) {
    font-size: 1rem;
    padding: 0.6rem 1.5rem;
  }
`;

const ListItem = styled.li`
  list-style: none;
  margin-left: 2rem;
  font-size: 1.2rem;

  @media screen and (max-width: 480px) {
    font-size: 1rem;
    margin-left: 1rem;
  }
`;

const UnList = styled.ul`
  display: flex;

  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0 0.5rem 0;

  @media screen and (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem 0;
  }
`;

const NavH2 = styled.h2`
  color: #08087f;
  font-size: 1.8rem;

  @media screen and (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  @media screen and (max-width: 1024px) {
    padding: 0 2rem;
  }
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;
  font-size: 1.5rem;

  @media screen and (max-width: 767px) {
    display: block;
    text-align: right;
    margin: -2rem 0 0 0;
    /* border: 2px solid red; */
    width: 100%;
  }
`;

const MobileMenu = styled.div`
  display: none;

  @media screen and (max-width: 767px) {
    display: ${({ isOpen }: any) => (isOpen ? "block" : "none")};
    padding: 1rem 0;
  }
`;

const DesktopMenu = styled.div`
  display: none;

  @media screen and (min-width: 768px) {
    display: flex;
    padding: 1rem 0;
  }
`;



// Example usage
const NavbarSup = () => {
    const { logOut } = useUserAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
    
    const handleLogOut = async () => {
        try {
          await logOut();
        } catch (err: any) {
          console.log(err.message);
        }
    
        localStorage.removeItem("user");
        window.location.reload();
      };
    //   const Navbar = () => {
    //     const [isMenuOpen, setIsMenuOpen] = useState(false);
      
    //     const toggleMenu = () => {
    //       setIsMenuOpen(!isMenuOpen);
    //     };
      
        return (
          <NavContainer>
            <Nav>
              <NavH2>
                <a href="#home">CareFinder</a>
              </NavH2>
      
              <Hamburger onClick={toggleMenu}>
                <span>&#9776;</span>
              </Hamburger>
      
              <UnList>
                <MobileMenu isOpen={isMenuOpen}>
                  <ListItem>
                    <Link to="/">Home</Link>
                  </ListItem>
                  <ListItem>
                    <a href="#about">About</a>
                  </ListItem>
                  <ListItem>
                    <Link to="/hospital-list">Hospitals</Link>
                  </ListItem>
                  <div className="nav-btns">
                <Button onClick={handleLogOut}>Log Out</Button>
              </div>
                </MobileMenu>
              </UnList>

              <UnList>
                <DesktopMenu isOpen={isMenuOpen}>
                  <ListItem>
                    <Link to="/">Home</Link>
                  </ListItem>
                  <ListItem>
                    <a href="#about">About</a>
                  </ListItem>
                  <ListItem>
                    <Link to="/hospital-list">Hospitals</Link>
                  </ListItem>
                </DesktopMenu>
              </UnList>
      
              <DesktopMenu><div className="nav-btns">
                <Button onClick={handleLogOut}>Log Out</Button>
              </div></DesktopMenu>
            </Nav>
          </NavContainer>
        );
    //   };
    }

    

export default NavbarSup;