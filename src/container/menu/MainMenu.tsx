import { Apartment } from "@mui/icons-material";
import { ListItemIcon, MenuItem, MenuList, Typography } from "@mui/material";
import { Link } from "react-router-dom";

type Props = {};

const MainMenu = (props: Props) => {
  return (
    <MenuList>
      {[{ name: "Department", icon: <Apartment />, link: "/department" }].map((item) => {
        return (
          <Link to={item.link}>
            <MenuItem>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <Typography>{item.name}</Typography>
            </MenuItem>
          </Link>
        );
      })}
    </MenuList>
  );
};

export default MainMenu;
