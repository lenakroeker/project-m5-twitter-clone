import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "../components/CurrentUserContext";
import { EachTweet } from "../components/tweet";
import { SendTweet } from "../pages/SendTweet";
import { ErrorPage } from "../pages/ErrorPage";

const HomeFeed = () => {
  const [homeTweets, setHomeTweets] = useState();
  const { currentUser, status } = useContext(CurrentUserContext);
  const [fetchHomeFeed, setFetchHomeFeed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetch("/api/me/home-feed")
      .then((response) => response.json())
      .then((response) => setHomeTweets(response.tweetsById))
      .catch((error) => {
        console.log(error);
        setErrorMsg("error");
      });
  }, [fetchHomeFeed]);

  return (
    <>
      {errorMsg === "error" ? (
        <ErrorPage />
      ) : (
        <Wrapper>
          <Head>Home</Head>
          {currentUser ? (
            <MyAvatar src={currentUser.avatarSrc} />
          ) : (
            <div>loading</div>
          )}
          <SendTweet setFetchHomeFeed={setFetchHomeFeed} />
          {homeTweets ? (
            Object.values(homeTweets)
              .sort((a, b) => {
                if (b.timestamp > a.timestamp) {
                  return 1;
                } else {
                  return -1;
                }
              })
              .map((tweet) => {
                console.log(tweet);
                return (
                  <EachTweet
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
                    isRetweeted={tweet.isRetweeted}
                  />
                );
              })
          ) : (
            <div>loading</div>
          )}
        </Wrapper>
      )}
    </>
  );
};

export default HomeFeed;

const Wrapper = styled.div`
  margin-left: 25vw;
  font-size: 40px;
`;
const Head = styled.h2`
  text-align: left;
  padding: 20px;
  font-size: 20px;
  font-weight: bold;
  color: black;
  border-bottom: 1px solid lightgray;
  margin-bottom: 20px;
`;

const MyAvatar = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  position: absolute;
  left: calc(25vw + 10px);
`;
