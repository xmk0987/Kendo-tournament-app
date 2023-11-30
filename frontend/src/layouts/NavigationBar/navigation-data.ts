/*
  This data is used when displaying a text and a corresponding URL to move to.
  It's used in navbar, but it's probably of general importance.
*/

import { type NavigationData } from "./navigation-bar";

// Text to display and the corresponding link
export const unAuthenticatedNavItems: NavigationData = [
  {
    text: "Login",
    link: "/login"
  },
  {
    text: "Register",
    link: "/register"
  }
];

export const authenticatedNavItems: NavigationData = [
  {
    text: "Profile",
    link: "/profile"
  },
  {
    text: "Tournaments",
    link: "/tournaments"
  }
];

export const settings: NavigationData = [
  {
    text: "Profile",
    link: "/profile"
  },
  {
    text: "Logout",
    link: "/"
  }
];
