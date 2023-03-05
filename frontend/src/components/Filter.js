import { Box, Button } from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import "./Filter.css";
const Filter = ({updateGenreFilter,genreFilter,ageFilter,updateAgeFilter,sortFilter,updateSortFilter}) => {
  const updateGenre=(genre)=>{
    if(genreFilter.includes(genre)){
      const index=genreFilter.indexOf(genre)
      console.log(genreFilter)
      genreFilter.splice(index,1)
      console.log(genreFilter)
      updateGenreFilter([...genreFilter])
      console.log(genreFilter)
    }
    else{
      // console.log(genreFilter)
      updateGenreFilter([...genreFilter,genre])
      // console.log(genreFilter)
    }
  }

  const selected={
    borderRadius:'15px',
    height:'32px',
    color:'black',
    backgroundColor:'white'
  }
  const not_selected ={
    borderRadius:'15px',
    height:'32px',
    color:'white',
    backgroundColor:'#202020'
  }
  return (
    <Box className="filter">
      <Box className="c2">
        <Box className="c1">
          <Button value='All' sx={genreFilter.includes('All')?selected:not_selected} onClick={(e)=>updateGenre(e.target.value)}>All Genre</Button>
          <Button value='Education' sx={genreFilter.includes('Education')?selected:not_selected} onClick={(e)=>updateGenre(e.target.value)}>Education</Button>
          <Button value='Sports' sx={genreFilter.includes('Sports')?selected:not_selected} onClick={(e)=>updateGenre(e.target.value)}>Sports</Button>
          <Button value='Comedy' sx={genreFilter.includes('Comedy')?selected:not_selected} onClick={(e)=>updateGenre(e.target.value)}>Comedy</Button>
          <Button value='Lifestyle' sx={genreFilter.includes('Lifestyle')?selected:not_selected} onClick={(e)=>updateGenre(e.target.value)}>Lifestyle</Button>
        </Box>
        <Box>
          <Button sx={selected} onClick={(e)=>updateSortFilter(sortFilter==='releaseDate'?'viewCount':'releaseDate')}>
            <SwapVertIcon />
            Sort By:{sortFilter==='releaseDate'?'Release Date':'View Count'}
          </Button>
        </Box>
      </Box>
      <Box className="c1">
        <Button value='Anyone' sx={ageFilter==='Anyone'?selected:not_selected} onClick={(e)=>updateAgeFilter(e.target.value)}>Any age group</Button>
        <Button value='7%2B' sx={ageFilter==='7%2B'?selected:not_selected} onClick={(e)=>updateAgeFilter(e.target.value)}>7+</Button>
        <Button value='12%2B' sx={ageFilter==='12%2B'?selected:not_selected} onClick={(e)=>updateAgeFilter(e.target.value)}>12+</Button>
        <Button value='16%2B' sx={ageFilter==='16%2B'?selected:not_selected} onClick={(e)=>updateAgeFilter(e.target.value)}>16+</Button>
        <Button value='18%2B' sx={ageFilter==='18%2B'?selected:not_selected} onClick={(e)=>updateAgeFilter(e.target.value)}>18+</Button>
      </Box>
    </Box>
  );
};

export default Filter;
