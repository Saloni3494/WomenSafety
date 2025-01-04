import { useEffect, useRef } from "react";
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { Link } from 'react-router-dom';
import "./Header.css";
import { NavLink } from "react-router-dom";

import {
  selectUserName,
  selectUserPhoto,
  setSignOutState,
  setUserLoginDetails,
} from "../features/user/userSlice";

const Header = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null); // Ref for the menu box

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenuOnMobile = () => {
    if (window.innerWidth <= 1150) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showMenu]);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        navigate("/home");
      }
    });
  }, [userName]);

  const handleAuth = () => {
    if (!userName) {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          setUser(result.user);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (userName) {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOutState());
          navigate("/");
        })
        .catch((err) => alert(err.message));
    }
  };

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  return (
    <Nav>
      <span className="siteLogo">
        <img src="/images/logo.png" alt="Disney" />
      </span>

      {!userName ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <header className="header">
            <nav className="nav container" ref={menuRef}>
              <div
                className={`nav__menu ${showMenu ? "show-menu" : ""}`}
                id="nav-menu"
              >
                <ul className="nav__list">
                  <li className="nav__item">
                    <NavLink
                      to="/home"
                      className="nav__link"
                      onClick={closeMenuOnMobile}
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav__item">
                    <NavLink
                      to="/contacts"
                      className="nav__link"
                      onClick={closeMenuOnMobile}
                    >
                      Contacts
                    </NavLink>
                  </li>
                  <li className="nav__item">
                    <NavLink
                      to="/customMessage"
                      className="nav__link"
                      onClick={closeMenuOnMobile}
                    >
                      Custom Message
                    </NavLink>
                  </li>
                  <li className="nav__item">
                    <NavLink
                      to="/aboutUs"
                      className="nav__link"
                      onClick={closeMenuOnMobile}
                    >
                      About Us
                    </NavLink>
                  </li>
                </ul>
                <div
                  className="nav__close"
                  id="nav-close"
                  onClick={toggleMenu}
                >
                  <i className="fa-solid fa-xmark closeButton"></i>
                </div>
              </div>

              <div
                className="nav__toggle hamburger"
                id="nav-toggle"
                onClick={toggleMenu}
              >
                <i className="fa-solid fa-bars"></i>
              </div>
            </nav>
          </header>

          <SignOut>
            <UserImg src={userPhoto} alt={userName} />
            <DropDown>
              <span onClick={handleAuth}>Sign Out</span>
            </DropDown>
          </SignOut>
        </>
      )}
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #C30E59;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;
  letter-spacing: 5px;
  font-weight: bold;
  z-index: 3;
`;

const Login = styled.a`
  background-color: rgb(244, 232, 232);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  color: #C30E59;
  font-weight: bold;

  &:hover {
    background-color: #f9f9f9;
    color: #C30E59;
    border-color: transparent;
  }
`;

const UserImg = styled.img`
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(244, 232, 232);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 9px;
  font-size: 13px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

export default Header;
