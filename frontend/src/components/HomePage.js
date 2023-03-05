import { Box,Grid } from "@mui/material";
import axios from 'axios'
import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Header from "./Header";
import Filter from './Filter'
import VideoCard from './VideoCard'
import {ClimbingBoxLoader} from 'react-spinners'
import {useSnackbar} from 'notistack'
// export const FilterContext=createContext()
const HomePage = ({videopage}) => {
  const {enqueSnackbar}=useSnackbar()
  const [videos,setVideos]=useState([]);
  const [search,setSearch]=useState('')
  const [genreFilter,updateGenreFilter]=useState(['All']);
  const [ageFilter,updateAgeFilter]=useState('Anyone');
  const [sortFilter,updateSortFilter]=useState('releaseDate')
  const [isLoading,setIsLoading]=useState(false)
  const performAPICall=async()=>{
    let url;
    if(genreFilter.length===0){
      if(search!==''){
        url=`https://xflix-backend-0qye.onrender.com/v1/videos?title=${search}&contentRating=${ageFilter}&sortBy=${sortFilter}`
      }
      else{
        url=`https://xflix-backend-0qye.onrender.com/v1/videos?contentRating=${ageFilter}&sortBy=${sortFilter}`
      }
    }
    else{
    if(search!==''){
      url=`https://xflix-backend-0qye.onrender.com/v1/videos?title=${search}&genres=${genreFilter}&contentRating=${ageFilter}&sortBy=${sortFilter}`
    }
    else{
      url=`https://xflix-backend-0qye.onrender.com/v1/videos?genres=${genreFilter}&contentRating=${ageFilter}&sortBy=${sortFilter}`
    }
  }
  setIsLoading(true)
    axios.get(url)
    .then((res)=>{
      console.log(res.data.videos)
      setVideos(res.data.videos)
      setIsLoading(false)
    })
    .catch((e)=>{
      console.log(e)
      setIsLoading(false)
      if(e.response && e.response.status===500){
        enqueSnackbar(e.response.data.message,{variant:"error"})
      }
      else{
        enqueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.",{variant:"error"})
      }
    })
  }

  useEffect(()=>{
    performAPICall()
  },[])

  useEffect(()=>{
    console.log(search)
    performAPICall()
  },[genreFilter,ageFilter,sortFilter,search])

  
  return (
    <Box minHeight='100vh' maxHeight='max-content' sx={{  background:'#181818'}}>
      {!videopage &&
      <>
    <Header search={search} setSearch={setSearch}/>
    <Filter genreFilter={genreFilter} updateGenreFilter={updateGenreFilter} ageFilter={ageFilter} updateAgeFilter={updateAgeFilter} sortFilter={sortFilter} updateSortFilter={updateSortFilter}/>
    </>}
    {isLoading?(
      <Box sx={{position:'relative',left:'45%' ,top:'90%'}}>
      <ClimbingBoxLoader color="#fff" />
      </Box>
    ):(
      <Box sx={{  padding:'3rem 5rem'}} >
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
            <Link style={{textDecoration:'none'}} to={`/video/${ele._id}`}>
            <VideoCard {...ele} />
            </Link>
          </Grid>
        ))}
      </Grid>
      </Box>
    )}
  </Box>
  );
};
export default HomePage;
