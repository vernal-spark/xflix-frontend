import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Divider } from "@mui/material";
import axios from "axios";
import HomePage from "./HomePage";
import Header from "./Header";
import Video from "./Video";
import { useSnackbar } from "notistack";
import { ClimbingBoxLoader } from "react-spinners";
import { config } from "../App";

const VideoPage = () => {
  const { enqueSnackbar } = useSnackbar();
  const [selectVideo, setSelectVideo] = useState({});
  const [loading, setLoading] = useState(false);
  const [upVote, setUpVote] = useState(0);
  const [downVote, setDownVote] = useState(0);
  let { videoId } = useParams();

  const fetchVideoById = async () => {
    try {
      setLoading(true);
      console.log(videoId);
      const res = await axios.get(`${config.endpoint}v1/videos/${videoId}`);
      console.log(res.data);
      setSelectVideo(res.data);
      setUpVote(res.data.votes.upVotes);
      setDownVote(res.data.votes.downVotes);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      enqueSnackbar(e.response.data.message, { variant: "error" });
      console.log(e);
    }
  };
  const updateViews = async () => {
    try {
      await axios.patch(`${config.endpoint}v1/videos/${videoId}/views`);
    } catch (e) {
      enqueSnackbar(e.response.data.message, { variant: "error" });
    }
  };
  useEffect(() => {
    fetchVideoById();
    updateViews();
  }, []);

  return (
    <Box
      minHeight="100vh"
      maxHeight="max-content"
      sx={{ background: "#181818" }}
    >
      <Header videoPage />
      {loading ? (
        <Box sx={{ position: "relative", left: "45%", top: "90%" }}>
          <ClimbingBoxLoader color="#fff" />
        </Box>
      ) : (
        <>
          <Box sx={{ pt: 2, px: 10 ,'@media screen and (max-width: 1092px)': {px: 0,pt:0}}}>
            <Video
              video={selectVideo}
              upVote={upVote}
              downVote={downVote}
              setUpVote={setUpVote}
              setDownVote={setDownVote}
            />
          </Box>

          <Box sx={{ pt: 3, px: 5 ,'@media screen and (max-width: 1092px)': {px: 0,pt:0}}}>
            <Divider sx={{ background: "grey" }} variant="middle" />
            <HomePage videopage />
          </Box>
        </>
      )}
    </Box>
  );
};

export default VideoPage;
