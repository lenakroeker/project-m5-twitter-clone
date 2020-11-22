import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import { EachTweet } from "../components/tweet";
import { GrLocation } from "react-icons/gr";
import { AiOutlineCalendar } from "react-icons/ai";
import { ErrorPage } from "../pages/ErrorPage";

const Profile = () => {
  const [user, setUser] = useState();
  const [userTweetFeed, setUserTweetFeed] = useState();
  const [following, setFollowing] = useState(user?.isBeingFollowedByYou);
  const [errorMsg, setErrorMsg] = useState("");

  console.log(user);
  const dateJoined = moment(user?.joined).format("MMMM YYYY");

  const follow = () => {
    setFollowing(!following);
  };

  const params = useParams();
  const profileId = params.profileId;

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
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg("error");
      });
  }, []);

  return (
    <>
      {errorMsg === "error" ? (
        <ErrorPage />
      ) : (
        <Wrapper>
          {user ? (
            <>
              <Banner src={user.bannerSrc} />
              <Avatar src={user.avatarSrc} />
              <UserInfo>
                <Name>{user.displayName}</Name>
                <Handle>@{user.handle}</Handle>
                <Bio>{user.bio}</Bio>
                <Info>
                  <GrLocation /> {user.location}
                  <Spacer></Spacer>
                  <AiOutlineCalendar /> Joined {dateJoined}
                </Info>
                <Fbutton onClick={follow}>
                  {following ? "Follow" : "Following"}
                </Fbutton>
                <div>
                  {user.numFollowers} <Grey>Followers</Grey>
                  <Spacer></Spacer>
                  {user.numFollowing} <Grey>Following</Grey>
                </div>
              </UserInfo>
            </>
          ) : (
            <div>loading</div>
          )}
          {userTweetFeed ? (
            Object.values(userTweetFeed)
              .sort((a, b) => {
                if (b.timestamp > a.timestamp) {
                  return 1;
                } else {
                  return -1;
                }
              })
              .map((tweet) => {
                // console.log(tweet.author.avatarSrc);
                console.log(tweet.retweetFrom);
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
                    retweetedFrom={tweet.retweetFrom}
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

export default Profile;

const Wrapper = styled.div`
  margin-left: 25vw;
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border: 5px solid white;
  border-radius: 50%;
  position: absolute;
  left: 27vw;
  top: calc(19vw - 15px);
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
  font-size: 16px;
  padding: 10px 0;
  color: grey;
`;
const Bio = styled.p`
  font-size: 18px;
  padding: 10px 0;
`;

const Handle = styled.p`
  color: grey;
`;

const UserInfo = styled.div`
  padding: 20px;
`;

const Fbutton = styled.button`
  border-radius: 20px;
  background: blue;
  padding: 7px 13px;
  border: none;
  font-size: 18px;
  cursor: pointer;
  position: absolute;
  right: 80px;
  top: calc(26vw);
`;

const Spacer = styled.span`
  margin: 15px;
`;

const Grey = styled.span`
  color: grey;
`;
