import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import { React, useState, useEffect } from "react";
import axios from "axios";

export default function LikedSongs(props) {
  const [likedSongs, setLikedSongs] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [finishedGetting, setFinishedGetting] = useState(null);
  let offset = 0;

  useEffect(() => {
    getLikedSongs();
    getUsername();
    // eslint-disable-next-line
  }, []);

  const getLikedSongs = () => {
    let url = "http://localhost:9000/statistics/likes/" + props.token;

    axios
      .get(url)
      .then((result) => {
        setLikedSongs(result.data);
      })
      .catch((err) => console.log(err));
  };

  const getUsername = () => {
    let url = "http://localhost:9000/statistics/name/" + props.token;

    axios.get(url).then((result) => {
      setDisplayName(result.data.display_name);
    });
  };

  const loadMoreSongs = () => {
    offset += 50;
    let url =
      "http://localhost:9000/statistics/likes/" + offset + "/" + props.token;

    axios.get(url).then((result) => {
      let test = likedSongs;
      if (result.data.items.length === 0) {
        setFinishedGetting(true);
      } else {
        setFinishedGetting(false);
      }
      for (let i = 0; i < result.data.items.length; i++) {
        test[i + offset] = result.data.items[i];
      }
      setLikedSongs(test);
    });
  };

  return (
    <>
      <Typography
        variant="h3"
        sx={{ fontWeight: "bold", marginBottom: "0.7%", marginTop: "0.5%" }}
      >
        Liked Songs
      </Typography>
      <Typography
        fontSize={"26px"}
        color="#827b7a"
        marginTop={"-15px"}
        marginBottom={"15px"}
      >
        {displayName}
      </Typography>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box width={"85%"} marginLeft={"7.5%"}>
          <Card variant="outlined" sx={{ border: 1, borderColor: "white" }}>
            <CardContent>
              {likedSongs &&
                likedSongs.map((obj, index) => {
                  return (
                    <SongCard
                      song={obj.track.name}
                      artist={obj.track.artists[0].name}
                      rank={index + 1}
                      imageLink={obj.track.album.images[2].url}
                    />
                  );
                })}
            </CardContent>
          </Card>
        </Box>
      </div>
      {!finishedGetting && (
        <Button
          variant="contained"
          style={{ marginBottom: "50px", backgroundColor: "#1DB954" }}
          onClick={() => loadMoreSongs()}
        >
          Load More
        </Button>
      )}
    </>
  );
}

function SongCard(props) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h4">{props.rank}</Typography>
        <Box marginLeft={"34%"} marginBottom={"1.2%"}>
          <Divider width={"45%"} />
        </Box>
        <Typography variant="h5">{props.song}</Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.artist}
        </Typography>
        <img src={props.imageLink} alt={"Album cover for " + props.song} />
      </CardContent>
    </Card>
  );
}
