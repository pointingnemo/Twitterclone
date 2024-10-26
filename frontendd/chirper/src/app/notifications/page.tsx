"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import profilepic from "@/public/profilepic.svg";

interface Notification {
  _id: string;
  from: { username: string; profileImg: string | null };
  type: string;
  read: boolean;
}

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/notification/", {
        credentials: "include",
      });
      const data = await response.json();
      setNotifications(data);
      console.log(data)
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleDeleteNotification = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/notification/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      setNotifications(notifications.filter((notification) => notification._id !== id));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const handleClearAllNotifications = async () => {
    try {
      await fetch("http://localhost:5000/api/notification/", {
        method: "DELETE",
        credentials: "include",
      });
      setNotifications([]);
    } catch (error) {
      console.error("Error clearing notifications:", error);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/notification/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ read: true }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to mark notification as read");
      }
  
      const updatedNotification = await response.json();
  
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === id ? { ...notification, read: updatedNotification.read } : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  

  return (
    <div className="p-6 bg-neutral-800 rounded-lg shadow-md max-w-lg mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Notifications</h2>
        <button
          onClick={handleClearAllNotifications}
          className="text-sm text-red-600 hover:underline"
        >
          Clear All
        </button>
      </div>

      {notifications.length === 0 ? (
        <p className="text-gray-900">No notifications.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li
              key={notification._id}
              className={`p-4 flex items-center justify-between rounded-lg shadow-sm cursor-pointer ${
                notification.read
                  ? "bg-gradient-to-tr from-slate-950 to-gray-800"
                  : "bg-gradient-to-r from-blue-500 to-blue-400"
              }`}
              onClick={() => handleMarkAsRead(notification._id)}
            >
              <div className="flex items-center space-x-4">
                <Image
                  src={notification.from.profileImg || profilepic}
                  width={24}
                  height={24}
                  alt="Profile Picture"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium">
                    <span className="font-semibold">{notification.from.username}</span>{" "}
                    {notification.type === "follow" ? "followed you" : "liked your post"}
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteNotification(notification._id);
                }}
                className="text-red-500 text-xs hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationsPage;
