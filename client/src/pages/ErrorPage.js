import React from "react";
import styled from "styled-components";

export const ErrorPage = () => {
  return (
    <ImgDiv>
      <img src="https://lh3.googleusercontent.com/proxy/pEFSVCvnX_2xuAlIh_2aB4KFtowJXzhzZi6CPRPGq4nDOjOQbIi6c3adFEMqx0h8jspoGW8OxghfGhG5LuIuToU" />
      <Error>Warning! Warning! an unknown error has occured</Error>
    </ImgDiv>
  );
};

const ImgDiv = styled.div`
  margin: 50px 30vw;
`;

const Error = styled.div`
  font-size: 30px;
  text-shadow: 2px 2px red;
`;
