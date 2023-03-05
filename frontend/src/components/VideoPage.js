import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box,Divider} from "@mui/material";
import axios from "axios";
import HomePage from "./HomePage";
import Header from "./Header";
import Video from './Video'
import { useSnackbar } from "notistack";
import {ClimbingBoxLoader} from 'react-spinners'

const VideoPage = () => {
  const {enqueSnackbar}=useSnackbar()
  const [selectVideo, setSelectVideo] = useState({});
  const [loading, setLoading] = useState(false);
  const [upVote, setUpVote] = useState(0);
  const [downVote, setDownVote] = useState(0);
  const { id } = useParams();

  const fetchVideoById=async()=>{
    try{
      setLoading(true)
    const res=await axios.get(`https://xflix-backend-0qye.onrender.com/v1/videos/${id}`)
    console.log(res.data)
    setSelectVideo(res.data)
    setUpVote(res.data.votes.upVotes)
    setDownVote(res.data.votes.downVotes)
    setLoading(false)
    }catch(e){
      setLoading(false)
      enqueSnackbar(e.response.data.message,{variant:"error"})
      console.log(e)
    }
  }
  const updateViews = async () => {
    try{
    await axios.patch(`https://xflix-backend-0qye.onrender.com/v1/videos/${id}/views`);
    }catch(e){
      enqueSnackbar(e.response.data.message,{variant:"error"})
    }
  };
  useEffect(()=>{
    fetchVideoById();
    updateViews();
  },[id])
  
  return(
    <Box minHeight='100vh' maxHeight='max-content' sx={{background:'#181818'}}>
    <Header videoPage/>
    {loading?(
      <Box sx={{position:'relative',left:'45%' ,top:'90%'}}>
      <ClimbingBoxLoader color="#fff" />
      </Box>
    ):(
      <Box sx={{pt:3,px:18}}>
      <Video video={selectVideo} upVote={upVote} downVote={downVote} setUpVote={setUpVote} setDownVote={setDownVote}/>
      <Divider sx={{background:'grey'}} variant="middle" />
    <HomePage videopage/>
    </Box>
    )}
    
    </Box>
  )
}

export default VideoPage;