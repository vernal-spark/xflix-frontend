import { Card, CardContent, CardMedia, Typography, Stack } from "@mui/material";
const VideoCard = (props) => {
  let date=new Date(props.releaseDate)
  let day=date.getDate()
  let month=date.getMonth()
  let year=date.getFullYear()
  let currDate=new Date()
  let currday=currDate.getDate()
  let currmonth=currDate.getMonth()
  let curryear=currDate.getFullYear()
  let releaseYear,releaseMonth,releaseDay
  (year!==curryear)? releaseYear = curryear-year: (month!==currmonth)?releaseMonth = currmonth-month:releaseDay=currday-day;
  return (
    <Card sx={{ background: "#181818" }}>
      <CardMedia
        component="img"
        sx={{ objectFit: "cover" }}
        image={props.previewImage}
        alt="green iguana"
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          color: "#fff",
        }}
      >
        <Typography variant="h6" component="div">
          {props.title}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2">{`${releaseYear?releaseYear+` year ago`:releaseMonth?releaseMonth+` month ago`:releaseDay+` day ago`}`}</Typography>
          <Typography variant="body2">{props.viewCount}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
export default VideoCard;
