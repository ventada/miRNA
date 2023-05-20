import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
export default function UserInfo() {
  const username = useSelector((state) => state.user.username);
  const [user, setUser] = useState("");
  const [rank, setRank] = useState(0);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const isScoreChanged = useSelector((state) => state.user.isScoreChanged);
  // const score = useSelector((state) => state.user.userScore);
  const getUserScore_Rank = async () => {
    let { data } = await axios.get("/actions/userrank", {
      withCredentials: true,
    });

    setRank(data.rank);
    setScore(data.score);
    setBestScore(data.bestScore);
  };
  useEffect(() => {
    setUser(username);
    getUserScore_Rank();
  }, [isScoreChanged]);
  return (
    <div className="userinfo">
      <div>userName: {user}</div>
      <div>user rank: {rank}</div>
      <div>user score: {score}</div>
      <div>best match socre: {bestScore}</div>
    </div>
  );
}
