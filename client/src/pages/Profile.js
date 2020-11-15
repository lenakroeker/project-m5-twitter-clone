import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { CurrentUserContext } from "../components/CurrentUserContext";
import { EachTweet } from "../components/tweet";
import { GrLocation } from "react-icons/gr";

const Profile = () => {
  const [user, setUser] = useState();
  const [userTweetFeed, setUserTweetFeed] = useState();
  const params = useParams();
  const profileId = params.profileId;
  // console.log(user);
  // console.log(profileId);

  useEffect(() => {
    fetch(`/api/${profileId}/feed`)
      .then((res) => res.json())
      .then((res) => {
        setUserTweetFeed(res.tweetsById);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/${profileId}/profile`)
      .then((res) => res.json())
      .then((res) => {
        setUser(res.profile);
      });
  }, []);
  // console.log(userTweetFeed);
  // console.log(user);

  return (
    <Wrapper>
      {user ? (
        <>
          <Banner src={user.bannerSrc} />
          <Avatar src={user.avatarSrc} />
          <UserInfo>
            <Name>{user.displayName}</Name>
            <Handle>@{user.handle}</Handle>
            <Info>{user.bio}</Info>
            <Info>
              <GrLocation /> {user.location}
            </Info>
          </UserInfo>
        </>
      ) : (
        <div>loading</div>
      )}
      {userTweetFeed ? (
        Object.values(userTweetFeed).map((tweet) => {
          // console.log(tweet.author.avatarSrc);
          return (
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
          );
        })
      ) : (
        <div>loading</div>
      )}
    </Wrapper>
  );
};

export default Profile;

const Wrapper = styled.div`
  margin-left: 25vw;
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border: 3px solid white;
  border-radius: 50%;
  position: absolute;
  left: 340px;
  top: 240px;
`;

const Name = styled.p`
  margin-top: 70px;
  font-size: 20px;
  font-weight: bold;
`;

const Banner = styled.img`
  width: 100%;
`;

const Info = styled.p`
  font-size: 18px;
  padding: 10px 0;
`;

const Handle = styled.p`
  color: grey;
`;

const UserInfo = styled.div`
  padding: 20px;
`;
