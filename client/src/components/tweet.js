import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

export const EachTweet = (props) => {
  let history = useHistory();

  console.log("props" + props);
  const {
    id,
    src,
    authorHref,
    tweetHref,
    name,
    handle,
    timestamp,
    status,
  } = props;

  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const time = new Date(timestamp);
  const month = time.getMonth();
  const date = time.getDate();
  const formattedTime = monthNames[month] + " " + date;
  console.log(formattedTime);

  return (
    <TweetBox key={id}>
      <Avatar src={src} onClick={() => history.push(authorHref)} />
      <InfoDiv onClick={() => history.push(tweetHref)}>
        <Name>{name} </Name>
        <Handle> @{handle}</Handle>
        <Timestamp>{formattedTime}</Timestamp>
        <Status>{status}</Status>
      </InfoDiv>
    </TweetBox>
  );
};

const TweetBox = styled.div`
  padding: 10px;
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
