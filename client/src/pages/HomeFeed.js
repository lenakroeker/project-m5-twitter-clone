import React, { useEffect, useState } from "react";
import styled from "styled-components";

const HomeFeed = () => {
  const [homeTweets, setHomeTweets] = useState([]);
  useEffect(() => {
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((res) => setHomeTweets(res.data));
  }, []);
  console.log(homeTweets);

  return <Wrapper>Home Page</Wrapper>;
};

export default HomeFeed;

const Wrapper = styled.div`
  text-align: center;
  padding-top: 30px;
  font-size: 40px;
`;
