import React, { useState, useRef, useEffect } from "react";
import FixedBottomNavigation from './FixedBottomNavigation'



const Audio = () => {
  let urlApi = "http://assets.breatheco.de/apis/sound/";
  let songRef = useRef(null);
  const [songs,setSongs]=useState(null)
  const [playing, setPlaying] = useState(false);
  const [actualSong,setActualSong]=useState(0)
  const [limit,setLimit]=useState(0)

  const setSongsREf =({ id, src }) => {
    songRef.current.id = id;
    songRef.current.src = src;
  }
  const playOrPause = () => {
    setPlaying(!playing);
  };
  const insertSong = (url) => {
    setSongsREf({ src: urlApi+url });
  };

  const getSongs = (url) => {
    fetch(`${urlApi}songs`, {
      method: "GET",
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        setSongs(data);
        setLimit(data)

      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getSongs(urlApi);
  }, []);
  useEffect(() => {
    (actualSong)?songRef.current.play():console.log();
  }, [actualSong]);

  useEffect(() => {
   (playing) ? songRef.current.play():songRef.current.pause();
  }, [playing]);


  const warningUp =()=>{

    if((songs.length)==actualSong){
      setActualSong(0)
    }else{}
  }
  const warningDown =()=>{
    if(actualSong<1){
      setActualSong(songs.length-1)
    }else{}
  }
  const testData =()=>{
    console.log(songs.length)
  }
  const testActualSong =()=>{
    console.log(actualSong)
  }
  const playNext =()=>{
    warningUp()
    console.log(actualSong)
    insertSong(songs[actualSong].url)
    setActualSong(actualSong+1)
  }
  const playBack =()=>{
    warningDown()
    console.log(actualSong)
    insertSong(songs[actualSong].url)
    setActualSong(actualSong-1)
  }
  
  return(
    <div className="bg-dark">
      <ul className="bg-dark nobull" >
        {(songs)?songs.map((song,i)=>{
          return(
            <li className="text-light " key={i} onClick={() => {
              playOrPause();
              insertSong(song.url);
              setActualSong(song.id);
            }}>
             {song.id} {song.name}
            </li>
          )
        }
        ):<div>el get no resulto</div>}
      </ul>
      <audio src={songRef} ref={songRef}></audio>
      <button onClick={testData}>test data</button>
      <button onClick={testActualSong}>actual song</button>
      <FixedBottomNavigation 
      state={playing}
      playing={playOrPause}
      pause={playOrPause}
      back={playBack}
      next={playNext}/>
    </div>
  )
};

export default Audio;