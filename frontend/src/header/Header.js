import {
  AppBar,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import HikingIcon from "@mui/icons-material/Hiking";
import { useSelector } from "react-redux";

const pages = ["Home", "Diaries", "Auth"];
const LoggedInLinks = ["Home", "Diaries", "Add" , "Profile"];

function AppBarExample() {

  const isLoggedIn = useSelector( (state) => state.isLoggedIn );

  return (
    <div className="App">
      <Box sx={{ display: 'flex' }} >
        <AppBar position="static" component="nav" >
          <Toolbar >

              <HikingIcon />

              <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    ml: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  TrekTracker
              </Typography>

            <Box sx={{flexGrow: 1,  
                      display: { md: "flex", xs: "none", sm: "block" },
                      justifyContent: "flex-end", }}
            >
              { isLoggedIn ?  
                LoggedInLinks.map((page) => (
                <Button
                  key={page}
                  component={Link}
                  to={`/${page === "Home" ? "" : page}`}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))
                : pages.map((page) => (
                <Button
                  key={page}
                  component={Link}
                  to={`/${page === "Home" ? "" : page}`}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

          </Toolbar>
        </AppBar>
      </Box>

    </div>
  );
}

export default AppBarExample;
