import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { ErrorPage } from "../pages/ErrorPage";

export const SendTweet = (props) => {
  const { setFetchHomeFeed } = props;
  const [value, setValue] = useState("");
  const [charCount, setCharCount] = useState();
  const [errorMsg, setErrorMsg] = useState("");

  // const submitTweet = () => {
  //   window.alert(value);
  // };

  const submitTweet = (ev) => {
    ev.preventDefault();
    if (value.length <= 280) {
      fetch("/api/tweet", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          status: value,
        }),
      })
        .then((res) => {
          console.log(res);
          if (res.status >= 200 && res.status < 400) {
            console.log("hello from in if");
            setFetchHomeFeed((state) => !state);
          } else if (res.status >= 400) {
            window.alert("error:" + res.error);
          }
          return res.json();
        })
        .catch((error) => {
          console.log(error);
          setErrorMsg("error");
        });
    } else {
      window.alert("maximum meow length exceeded!");
    }
  };

  return (
    <>
      {errorMsg === "error" ? (
        <ErrorPage />
      ) : (
        <Wrapper>
          <form onSubmit={submitTweet}>
            <Input
              placeholder="what's happening?"
              value={value}
              onChange={(ev) => setValue(ev.target.value)}
              onKeyDown={(ev) => {
                if (ev.key === "Backspace") {
                  setCharCount(value.length);
                } else {
                  setCharCount(value.length + 1);
                }
              }}
            />
            <NumCount
              style={
                charCount >= 280
                  ? { color: "red" }
                  : charCount >= 200
                  ? { color: "orange" }
                  : { color: "grey" }
              }
            >
              {charCount ? 280 - charCount : 280}
            </NumCount>
            <Submit type="submit">Meow</Submit>
          </form>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  font-size: 40px;
`;

const Input = styled.textarea`
  width: calc(100% - 180px);
  margin-left: 100px;
  margin-right: 80px;
  height: 100px;
  margin-bottom: 50px;
  border: none;
`;

const Submit = styled.button`
  border-radius: 20px;
  background: blue;
  padding: 7px 13px;
  border: none;
  font-size: 18px;
  cursor: pointer;
  position: absolute;
  right: 80px;
  top: 190px;
`;

const NumCount = styled.div`
  font-size: 20px;
  position: absolute;
  right: 200px;
  top: 190px;
`;
