import React from "react";
import styled from "styled-components";
import moment from "moment";
import { useHistory } from "react-router-dom";
import ActionBar from "../components/ActionBar";

export const EachTweet = (props) => {
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
    isRetweeted,
    retweetedFrom,
  } = props;

  console.log(isRetweeted);
  console.log(retweetedFrom);

  const time = moment(timestamp).format("MMM Do");
  console.log(numLikes);
  return (
    <TweetBox key={tweetId}>
      <Avatar
        src={src}
        onClick={() => {
          history.push(authorHref);
        }}
      />
      <InfoDiv onClick={() => history.push(tweetHref)}>
        <Name
          onClick={(ev) => {
            ev.stopPropagation();
            history.push(authorHref);
          }}
        >
          {name}{" "}
        </Name>
        <Handle
          onClick={(ev) => {
            ev.stopPropagation();
            history.push(authorHref);
          }}
        >
          {" "}
          @{handle}
        </Handle>
        <Timestamp>{time}</Timestamp>
        <Status>{status}</Status>
        {media?.map((img) => {
          return <Media src={img.url} />;
        })}
      </InfoDiv>
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
  margin-right: 50px;
  border: 1px solid lightgray;
  font-size: 16px;
  display: grid;
  grid-template-columns: 80px 1fr;
  grid-template-areas: "avatar info";
`;

const Timestamp = styled.p`
  font-size: 16px;
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
  display: inline;
`;

const Handle = styled.p`
  display: inline;
  padding: 0 10px;
`;

const Media = styled.img`
  width: 80%;
  margin: 20px 0;
  border-radius: 5%;
`;

const Retweeted = styled.p`
  background-color: lightgrey;
`;
