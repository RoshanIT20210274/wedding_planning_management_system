import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Home",
    path: "/home",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },

  // {
  //   title: "Customer Details",
  //   path: "/customer-details",
  //   icon: <AiIcons.AiOutlineSearch />,
  //   cName: "nav-text",
  // },
  {
    title: "Register",
    path: "/register",
    icon: <AiIcons.AiOutlineUserAdd />,
    cName: "nav-text",
  },
  {
    title: "Employee Details",
    path: "/edetails",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
  {
    title: "Request Details",
    path: "/requestdetails",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
  {
    title: "Request",
    path: "/request",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
  },
];
