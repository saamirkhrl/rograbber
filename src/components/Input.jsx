import React, { useState } from "react";
import UserInformation from "./UserInformation";
import "/src/App.css";

function Input() {
  const [input, setInput] = useState("");
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState("");

  const getUserIdData = async () => {
    if (!input) {
      setError("Please enter a username!");
      return;
    }
    setError("");

    try {
      const response = await fetch(
        "rograbber.vercel.app/api/v1/usernames/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ usernames: [input] }),
        }
      );

      const data = await response.json();
      if (data.data && data.data.length > 0) {
        setUserData(data.data);
        await getPFP(data.data[0].id);
        await getRelation(data.data[0].id);
        await getLastOnline(data.data[0].id);
      } else {
        setUserData([]);
        setError("No user data found.");
      }
    } catch (error) {
      console.log(error);
      setError("Error fetching user data.");
    }
  };

  const getPFP = async (userId) => {
    try {
      const response = await fetch(
        `rograbber.vercel.app/pfp/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png&isCircular=false`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const PFPdata = await response.json();

      if (PFPdata.data && PFPdata.data.length > 0) {
        setUserData((prevUserData) =>
          prevUserData.map((user) => ({
            ...user,
            pfp: PFPdata.data[0].imageUrl,
          }))
        );
      }
    } catch (error) {
      console.log(error);
      setError("Error fetching user profile picture");
    }
  };

  const getRelation = async (userId) => {
    try {
      const friends_res = await fetch(
        `rograbber.vercel.app/users/v1/users/${userId}/friends/count`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const followers_res = await fetch(
        `rograbber.vercel.app/users/v1/users/${userId}/followers/count`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const followings_res = await fetch(
        `rograbber.vercel.app/users/v1/users/${userId}/followings/count`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const friendsData = await friends_res.json();
      const followersData = await followers_res.json();
      const followingsData = await followings_res.json();
      setUserData((prevUserData) =>
        prevUserData.map((user) => ({
          ...user,
          friend_count: friendsData.count,
          followers_count: followersData.count,
          followings_count: followingsData.count,
        }))
      );
    } catch (error) {
      console.log(error);
      setError("Error fetching user relations, please try again later.");
    }
  };

  const getLastOnline = async (UserId) => {
    try {
      const lastOnlineRes = await fetch(
        "rograbber.vercel.app/presence/v1/presence/last-online",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userIds: [UserId] }),
        }
      );
      const lastOnlineData = await lastOnlineRes.json();
      setUserData((prevUserData) =>
        prevUserData.map((user) => ({
          ...user,
          last_online: lastOnlineData.lastOnlineTimestamps[0].lastOnline,
        }))
      );
    } catch (error) {
      console.log(error);
      setError("Error fetching last online, please try again");
    }
  };

  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      getUserIdData();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-4xl font-bold text-white mb-2">RoGrabber</h1>
      <p className="text-lg text-gray-300 mb-6 text-center">
        Get information about a Roblox user with a simple search.
      </p>
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md">
        <label
          htmlFor="input"
          className="block mb-2 text-lg font-medium text-white"
        >
          Enter the Roblox username:
        </label>
        <div className="flex">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            id="input"
            type="text"
            placeholder="Enter Roblox username.."
            className="w-full px-4 py-2 border rounded-l-lg border-gray-700 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={handleEnterKey}
          />
          <button
            onClick={getUserIdData}
            className="px-4 py-2 bg-blue-700 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="25"
              height="25"
              viewBox="0 0 50 50"
            >
              <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
            </svg>
          </button>
        </div>
        {error && <h1 className="mt-4 text-red-400">{error}</h1>}
      </div>
      <UserInformation data={userData} error={error} />
      <div className="flex space-x-2 mt-4">
        <a
          href="https://github.com/saamirkhrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://img.icons8.com/?size=50&id=12599&format=png&color=FFFFFF"
            className="w-12 h-12"
            alt="GitHub"
          />
        </a>
        <a
          href="https://instagram.com/samirkharel28"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://img.icons8.com/?size=50&id=32309&format=png&color=FFFFFF"
            className="w-12 h-12"
            alt="Instagram"
          />
        </a>
      </div>
    </div>
  );
}

export default Input;
