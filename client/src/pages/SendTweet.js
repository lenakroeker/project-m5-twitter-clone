import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "../components/CurrentUserContext";

export const SendTweet = () => {
  const [value, setValue] = useState("");
  const [charCount, setCharCount] = useState();

  const submitTweet = () => {
    window.alert(value);
  };

  return (
    <Wrapper>
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
      <Submit onClick={submitTweet}>Meow</Submit>
    </Wrapper>
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
