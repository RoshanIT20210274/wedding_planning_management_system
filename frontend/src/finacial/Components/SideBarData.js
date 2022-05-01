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
    {
        title: "Payment Details",
        path: "/paymentdetails",
        icon: <AiIcons.AiOutlineSearch />,
        cName: "nav-text",
    },

    {
        title: "Add Payments",
        path: "/addpayment",
        icon: <AiIcons.AiOutlineUserAdd />,
        cName: "nav-text",
    },
    ];