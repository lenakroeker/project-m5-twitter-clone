import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { ErrorPage } from "../pages/ErrorPage";

import { BigTweet } from "../components/BigTweet";

const TweetDetails = () => {
  const [errorMsg, setErrorMsg] = useState("");

  const [tweet, setTweet] = useState();
  const params = useParams();
  const tweetId = params.tweetId;
  console.log(tweetId);

  useEffect(() => {
    fetch(`/api/tweet/${tweetId}`)
      .then((res) => res.json())
      .then((res) => {
        setTweet(res.tweet);
        console.log(tweet);
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg("error");
      });
  }, []);

  console.log(tweet);

  return (
    <>
      {errorMsg === "error" ? (
        <ErrorPage />
      ) : (
        <Wrapper>
          {tweet ? (
            <BigTweet
              key={tweet.id}
              tweetId={tweet.id}
              authorHref={`/profile/${tweet.author.handle}`}
              tweetHref={`/tweet/${tweet.id}`}
              src={tweet.author.avatarSrc}
              name={tweet.author.displayName}
              handle={tweet.author.handle}
              timestamp={tweet.timestamp}
              status={tweet.status}
              media={tweet.media}
              tweetLiked={tweet.isLiked}
              numLikes={tweet.numLikes}
            />
          ) : (
            <div>loading</div>
          )}
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  margin-left: 25vw;
`;

export default TweetDetails;
