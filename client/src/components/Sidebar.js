import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { COLORS } from "../constants";
import { FiHome, FiUser, FiBell, FiBookmark } from "react-icons/fi";
import { CurrentUserContext } from "../components/CurrentUserContext";

const Sidebar = () => {
  const { currentUser, status, setStatus } = useContext(CurrentUserContext);

  return (
    <Wrapper>
      <svg width="100px">
        <Logo />
      </svg>
      <ul>
        <ListItem>
          <NavigationLink exact to="/">
            <IconSpan>
              <FiHome />
            </IconSpan>
            Home
          </NavigationLink>
        </ListItem>
        <ListItem>
          {currentUser ? (
            <NavigationLink to={`/profile/${currentUser?.handle}`}>
              <IconSpan>
                <FiUser />
              </IconSpan>
              Profile
            </NavigationLink>
          ) : (
            <div>
              <IconSpan>
                <FiUser />
              </IconSpan>
              Profile
            </div>
          )}
        </ListItem>
        <ListItem>
          <NavigationLink to="/notifications">
            <IconSpan>
              <FiBell />
            </IconSpan>
            Notifications
          </NavigationLink>
        </ListItem>
        <ListItem>
          <NavigationLink to="/bookmarks">
            <IconSpan>
              <FiBookmark />
            </IconSpan>
            Bookmarks
          </NavigationLink>
        </ListItem>
      </ul>
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = styled.div`
  position: fixed;
  border-right: 1px solid lightgrey;
  width: 25vw;
  height: 100vh;
  padding: 20px 50px;
  &:hover {
    border-right: none;
  }
`;

const ListItem = styled.li`
  font-size: 20px;
  font-weight: bold;
  color: black;
  line-height: 2.5em;
`;

const NavigationLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  padding: 10px 15px;
  border-radius: 30px;

  &:hover {
    color: ${COLORS.primary};
    background: ${COLORS.secondary};
  }
  &.active {
    color: ${COLORS.primary};
  }
`;

const IconSpan = styled.span`
  padding-right: 12px;
`;
