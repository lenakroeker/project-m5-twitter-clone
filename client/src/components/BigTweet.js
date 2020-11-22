import React from "react";
import styled from "styled-components";
import moment from "moment";
import { useHistory } from "react-router-dom";
import ActionBar from "../components/ActionBar";

export const BigTweet = (props) => {
  let history = useHistory();

  console.log("props" + props);
  const {
    tweetId,
    src,
    authorHref,
    tweetHref,
    name,
    handle,
    timestamp,
    status,
    media,
    numLikes,
    tweetLiked,
  } = props;

  const time = moment(timestamp).format("MMMM DDDo YYYY, h:mm a");
  console.log(numLikes);
  return (
    <TweetBox key={tweetId}>
      <Avatar src={src} onClick={() => history.push(authorHref)} />
      <InfoDiv onClick={() => history.push(tweetHref)}>
        <Name>{name} </Name>
        <Handle> @{handle}</Handle>
        <Status>{status}</Status>
        {media?.map((img) => {
          return <Media src={img.url} />;
        })}
      </InfoDiv>
      <Timestamp>{time}</Timestamp>
      <ActionBar
        tweetLiked={tweetLiked}
        tweetId={tweetId}
        numLikes={numLikes}
      />
    </TweetBox>
  );
};

const TweetBox = styled.div`
  padding: 10px;
  margin: 50px 80px;

  border: 1px solid lightgray;
  font-size: 16px;
  display: grid;
  grid-template-columns: 80px 1fr;
  grid-template-areas:
    "avatar info"
    "time time";
`;

const Timestamp = styled.p`
  grid-area: time;
  font-size: 14px;
  color: grey;
  display: inline;
`;

const Status = styled.p`
  margin-top: 10px;
  font-size: 16px;
`;

const Avatar = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-right: 10px;
  padding: 5px;
  grid-area: avatar;
`;

const InfoDiv = styled.div`
  grid-area: info;
  padding: 5px;
`;

const Name = styled.p`
  font-weight: bold;
`;

const Handle = styled.p`
  padding: 0 10px;
`;

const Media = styled.img`
  width: 80%;
  margin: 20px 0;
  border-radius: 5%;
`;
