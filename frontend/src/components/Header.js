import { Box, InputAdornment, Button, TextField, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../logo.svg";
import "./Header.css";
import VideoUpload from "./VideoUpload";
import { Link } from "react-router-dom";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "grey",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});
const Header = ({ search, setSearch, videoPage }) => {
  return (
    <>
      <Box className="header">
        <Link to="/">
          <img src={logo} alt="logo-img"></img>
        </Link>
        {!videoPage && (
          <>
            <CssTextField
              placeholder="Search"
              className='search-desktop'
              InputProps={{
                style: {
                  fontFamily: "Arial",
                  border: "1px solid grey",
                  background: "#121212",
                  color: "grey",
                  borderColor: "white",
                  width: "100%",
                  height: "29px",
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <Button sx={{ color: "white", height: "29px" }}>
                      <SearchIcon color="white" />
                    </Button>
                  </InputAdornment>
                ),
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <VideoUpload />
          </>
        )}
      </Box>
      {!videoPage &&
      <CssTextField
        placeholder="Search"
        className='search-mobile'
        fullWidth
        InputProps={{
          style: {
            fontFamily: "Arial",
            border: "1px solid grey",
            background: "#121212",
            color: "grey",
            borderColor: "white",
            width: "100%",
            height: "29px",
          },
          endAdornment: (
            <InputAdornment position="end">
              <Button sx={{ color: "white", height: "29px" }}>
                <SearchIcon color="white" />
              </Button>
            </InputAdornment>
          ),
        }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />}
    </>
  );
};
export default Header;
