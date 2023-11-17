import { Box, Button,FormControl,InputLabel,Select,MenuItem } from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import "./Filter.css";
const Filter = ({updateGenreFilter,genreFilter,ageFilter,updateAgeFilter,sortFilter,updateSortFilter}) => {

  const updateGenre=(genre)=>{
    if(genre==='All'){
      updateGenreFilter(['All'])
    }
    else{
      if(genreFilter.includes('All')){
        
        updateGenreFilter(prev=>{
          const index=prev.indexOf(genre)
        prev.splice(index,1)
          return [...prev]
        })
      }
      if(genreFilter.includes(genre)){
        const index=genreFilter.indexOf(genre)
        genreFilter.splice(index,1)
        if(genreFilter.length===0){
          updateGenreFilter(['All']);
        }
        else{
          updateGenreFilter([...genreFilter])
        }
      }
      else{
        updateGenreFilter(prev=>[...prev,genre])
      }
    }
  }

  const updateAge=(age)=>{
    if(ageFilter===age){
      updateAgeFilter('')
    }
    else{
      updateAgeFilter(age)
    }
  }


  const selected={
    borderRadius:'15px',
    height:'2rem',
    color:'black',
    backgroundColor:'white'
  }
  const not_selected ={
    borderRadius:'15px',
    height:'2rem',
    color:'white',
    backgroundColor:'#202020'
  }
  return (
    <Box className="filter">
      <Box className="c2">
        <Box className="c1">
          <Button value='All' sx={genreFilter.includes('All')?selected:not_selected} onClick={(e)=>updateGenre(e.target.value)}>All</Button>
          <Button value='Education' sx={genreFilter.includes('Education')?selected:not_selected} onClick={(e)=>updateGenre(e.target.value)}>Education</Button>
          <Button value='Sports' sx={genreFilter.includes('Sports')?selected:not_selected} onClick={(e)=>updateGenre(e.target.value)}>Sports</Button>
          <Button value='Comedy' sx={genreFilter.includes('Comedy')?selected:not_selected} onClick={(e)=>updateGenre(e.target.value)}>Comedy</Button>
          <Button value='Lifestyle' sx={genreFilter.includes('Lifestyle')?selected:not_selected} onClick={(e)=>updateGenre(e.target.value)}>Lifestyle</Button>
        </Box>
        <Box>
        <Box sx={{color:'white'}}>
          Sort by<SwapVertIcon/>:
                <select
                  sx={dropdown}
                  value={sortFilter}
                  onChange={(e) => updateSortFilter(e.target.value)}
                  label='Sort By'
                  required
                >
                  <option value=''>None</option>
                  <option value='releaseDate'>Release Date</option>
                  <option value='viewCount'>View Count</option>
                </select>
              </Box>
        </Box>
      </Box>
      <Box className="c1">
        <Button value='Anyone' sx={ageFilter==='Anyone'?selected:not_selected} onClick={(e)=>updateAge(e.target.value)}>Anyone</Button>
        <Button value='7%252B' sx={ageFilter==='7%252B'?selected:not_selected} onClick={(e)=>updateAge(e.target.value)}>7+</Button>
        <Button value='12%252B' sx={ageFilter==='12%252B'?selected:not_selected} onClick={(e)=>updateAge(e.target.value)}>12+</Button>
        <Button value='16%252B' sx={ageFilter==='16%252B'?selected:not_selected} onClick={(e)=>updateAge(e.target.value)}>16+</Button>
        <Button value='18%252B' sx={ageFilter==='18%252B'?selected:not_selected} onClick={(e)=>updateAge(e.target.value)}>18+</Button>
      </Box>
    </Box>
  );
};

export default Filter;
