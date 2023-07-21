import React from 'react';
import {HiHome} from 'react-icons/hi';
import {GiOpenBook} from 'react-icons/gi';
import {MdFeedback} from 'react-icons/md';
import {BiLogIn} from 'react-icons/bi';

export const SidebarData = [
    {
        title: "Home",
        icon: <HiHome/>,
        link: "/home"
    },
    {
        title: "Community",
        icon: <GiOpenBook/>,
        link: "/community"
    },
    {
        title: "SignUp",
        icon: <BiLogIn/>,
        link: "/signup"
    },
    {
        title: "Feedback",
        icon: <MdFeedback/>,
        link: "/feedback"
    }
]