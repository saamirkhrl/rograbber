import React from "react";

function UserInformation(props) {
  if (props.username === "") {
    return null;
  }

  const formatLastOnline = (lastOnline) => {
    if (lastOnline && typeof lastOnline === "string") {
      const regex = /^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2}):(\d{2})/;
      const match = lastOnline.match(regex);
      if (match) {
        const date = match[1];
        let hours = parseInt(match[2], 10);
        const minutes = match[3];

        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        const formattedTime = `${hours}:${minutes} ${ampm}`;

        return `${date} @ ${formattedTime}`;
      }
    }
    return "Error fetching last online data";
  };

  if (props.data.length > 0) {
    const profile_link = `https://www.roblox.com/users/${props.data[0].id}/profile`;
    return (
      <div className="flex flex-col items-center mt-8 p-6 bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
        <img
          src={props.data[0].pfp}
          alt={props.data[0].name}
          className="w-32 h-32 rounded-full mb-4"
        />
        <h2 className="text-2xl font-bold text-white mb-2">
          {props.data[0].name}
        </h2>
        <p className="text-lg font-semibold text-gray-300 mb-1">
          Display Name: {props.data[0].displayName}
        </p>
        <p className="text-lg font-semibold text-gray-300 mb-1">
          User ID: {props.data[0].id}
        </p>
        <p className="text-lg font-semibold text-gray-300 mb-1">
          Verified: {props.data[0].hasVerifiedBadge.toString()}
        </p>
        <p className="text-lg font-semibold text-gray-300 mb-1">
          Friends: {props.data[0].friend_count}
        </p>
        <p className="text-lg font-semibold text-gray-300 mb-1">
          Followers: {props.data[0].followers_count}
        </p>
        <p className="text-lg font-semibold text-gray-300 mb-1">
          Following: {props.data[0].followings_count}
        </p>
        <p className="text-lg font-semibold text-gray-300 mb-1">
          Last Online: {formatLastOnline(props.data[0].last_online)}
        </p>
        <a
          href={profile_link}
          target="_blank"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          View Profile
        </a>
        {props.error && <p className="mt-4 text-red-400">{props.error}</p>}
      </div>
    );
  }
  return null;
}

export default UserInformation;
