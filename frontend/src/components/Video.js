import { Box ,Stack,Typography,Button} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import axios from "axios";
import "./Video.css";
import { useSnackbar } from "notistack";
const Video = ({video,upVote,downVote,setUpVote,setDownVote}) => {
  const {enqueSnackbar}=useSnackbar()
    const upvote={
        color:'white',
        borderRadius:'10px'
      }
      const downvote={
        color:'grey',
        background:'#202020',
        borderRadius:'10px'
      }
      const handleUpVote=async()=>{
        try{
          const body={
            "vote": "upVote",
            "change": "increase"
        }
          await axios.patch(`https://xflix-backend-0qye.onrender.com/v1/videos/${video._id}/votes`,body)
          setUpVote(upVote+1)
        }catch(e){
          enqueSnackbar(e.response.data.message,{variant:"error"})
        }
        
      }
      const handleDownVote=async()=>{
        try{
          const body={
            "vote": "downVote",
            "change": "increase"
        }
          await axios.patch(`https://xflix-backend-0qye.onrender.com/v1/videos/${video._id}/votes`,body)
          setDownVote(downVote+1)
        }catch(e){
          enqueSnackbar(e.response.data.message,{variant:"error"})
        }        
      }
  return (
    <Stack sx={{px:4}} spacing={2}>
    <Box className="container">
      <iframe
        className="iframe"
        title={video.title}
        src={video.videoLink}
      />
    </Box>
    <Box sx={{py:-5}}>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Stack spacing={1} direction='column' alignItems='flex-start' justifyContent='flex-start'>
            <Typography variant='h5' color='white'>{video.title}</Typography>
            <Typography variant='body2' color='grey'>{video.contentRating}&nbsp;&nbsp;&bull;&nbsp;&nbsp;{video.releaseDate}</Typography>
          </Stack>
          <Stack spacing={1} direction='row' alignItems='center' justifyContent='flex-end'>
            <Button variant='contained' sx={upvote} onClick={handleUpVote}><ThumbUpIcon/>&nbsp;{upVote}</Button>
            <Button variant='text' sx={downvote} onClick={handleDownVote}><ThumbDownIcon/>&nbsp;{downVote}</Button>
          </Stack>
        </Stack>
    </Box>
    </Stack>
  );
};

export default Video;