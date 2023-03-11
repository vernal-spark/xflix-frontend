import { Box, Grid } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "./Header";
import Filter from "./Filter";
import VideoCard from "./VideoCard";
import { ClimbingBoxLoader } from "react-spinners";
import { useSnackbar } from "notistack";
import {config} from '../App'
// export const FilterContext=createContext()
const HomePage = ({ videopage }) => {
  const { enqueSnackbar } = useSnackbar();
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [genreFilter, updateGenreFilter] = useState([]);
  const [ageFilter, updateAgeFilter] = useState("");
  const [sortFilter, updateSortFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const defaultApiCall=async()=>{
    let url=`${config.endpoint}v1/videos`
    setIsLoading(true)
    axios.get(url)
    .then(res=>{
      setVideos(res.data.videos)
      setIsLoading(false);
    })
    .catch(e=>{
      setIsLoading(false);
        if (e.response && e.response.status === 500) {
          enqueSnackbar(e.response.data.message, { variant: "error" });
        } else {
          enqueSnackbar(
            "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
            { variant: "error" }
          );
        }
    })
  }
  const performAPICall = async () => {
    let url;
    
    if(genreFilter.length===0 && ageFilter==='' && sortFilter==='' && search===''){
      url=`${config.endpoint}v1/videos`
    }
    else{
      if(sortFilter!=='' && genreFilter.length===0 && ageFilter==='' && search===''){
        url=`${config.endpoint}v1/videos?sortBy=${sortFilter}`
      }
      else if(sortFilter==='' && genreFilter.length!==0 && ageFilter!=='' && search!==''){
        url=`${config.endpoint}v1/videos?title=${search}&genres=${genreFilter}&contentRating=${ageFilter}`
      }
      else if(sortFilter==='' && genreFilter.length!==0 && ageFilter==='' && search===''){
        url=`${config.endpoint}v1/videos?genres=${genreFilter}`
      }
      else if(sortFilter==='' && genreFilter.length===0 && ageFilter==='' && search!==''){
        url=`${config.endpoint}v1/videos?title=${search}`
      }
      else if(sortFilter==='' && genreFilter.length===0 && ageFilter!=='' && search===''){
        url=`${config.endpoint}v1/videos?contentRating=${ageFilter}`
      }
      else{
        url=`${config.endpoint}v1/videos?title=${search}&genres=${genreFilter}&contentRating=${ageFilter}&sortBy=${sortFilter}`
      }
    }

    setIsLoading(true);
    axios
      .get(url)
      .then((res) => {
        console.log(res.data.videos);
        setVideos(res.data.videos);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
        if (e.response && e.response.status === 500) {
          enqueSnackbar(e.response.data.message, { variant: "error" });
        } else {
          enqueSnackbar(
            "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
            { variant: "error" }
          );
        }
      });
  };

  useEffect(() => {
    defaultApiCall();
  }, []);

  useEffect(() => {
    performAPICall();
  }, [genreFilter, ageFilter, sortFilter, search]);

  return (
    <Box
      minHeight="100vh"
      maxHeight="max-content"
      sx={{ background: "#181818" }}
    >
      {!videopage && (
        <>
          <Header search={search} setSearch={setSearch} />
          <Filter
            genreFilter={genreFilter}
            updateGenreFilter={updateGenreFilter}
            ageFilter={ageFilter}
            updateAgeFilter={updateAgeFilter}
            sortFilter={sortFilter}
            updateSortFilter={updateSortFilter}
          />
        </>
      )}
      {isLoading ? (
          <ClimbingBoxLoader color="#fff" />
      ) : (
        <Box sx={{ pt: 2,px:1,'@media screen and (min-width: 1073px)': {px: 10,}}}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            // sx={{background:'#181818'}}
          >
            {videos.map((ele) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={ele._id}>
                  <VideoCard video={ele} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};
export default HomePage;
