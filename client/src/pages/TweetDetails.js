import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { EachTweet } from "../components/tweet";

const TweetDetails = () => {
  const [tweet, setTweet] = useState();
  const params = useParams();
  const tweetId = params.tweetId;
  console.log(tweetId);

  useEffect(() => {
    fetch(`/api/tweet/${tweetId}`)
      .then((res) => res.json())
      .then((res) => {
        setTweet(res.tweet);
      });
  }, []);

  console.log(tweet);

  return (
    <Wrapper>
      {tweet ? (
        <EachTweet
          key={tweet.id}
          authorHref={`/profile/${tweet.author.handle}`}
          tweetHref={`/tweet/${tweet.id}`}
          src={tweet.author.avatarSrc}
          name={tweet.author.displayName}
          handle={tweet.author.handle}
          timestamp={tweet.timestamp}
          status={tweet.status}
        />
      ) : (
        <div>loading</div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-left: 25vw;
`;

export default TweetDetails;
