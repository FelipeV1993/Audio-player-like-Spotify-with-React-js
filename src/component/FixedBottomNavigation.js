import * as React from 'react';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import Paper from '@mui/material/Paper';
import PauseIcon from '@mui/icons-material/Pause';


export default function FixedBottomNavigation({playing,pause,back,next,state}) {


  return (

      
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation>
          <BottomNavigationAction onClick={back} label="Recents" icon={<SkipPreviousIcon />} />
          {!state?(<BottomNavigationAction onClick={playing} label="Favorites" icon={<PlayArrowIcon />} />)
          :(<BottomNavigationAction onClick={pause} label="Favorites" icon={<PauseIcon />} />)}
          <BottomNavigationAction onClick={next} label="Archive" icon={<SkipNextIcon />} />
        </BottomNavigation>
      </Paper>

  );
}

