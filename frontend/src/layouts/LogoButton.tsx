import React from "react";
import { NavLink } from "react-router-dom";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
// import SvgIcon from "@mui/material/SvgIcon";

// import KendoIcon from "../icons/kendoicon.svg";

interface Props {
  logoName: string;
}

const LogoButton: React.FC<Props> = (props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <IconButton component={NavLink} to="/">
        {/* <SvgIcon>
          https://mui.com/material-ui/icons/#svgicon
        </SvgIcon> */}
        {props.logoName}
      </IconButton>
    </Box>
  );
};

export default LogoButton;
