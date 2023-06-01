import { Box, Card, CardContent, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { React, useState, useEffect } from "react";
import axios from "axios";

export default function LikedSongs(props) {
  const [likedSongs, setLikedSongs] = useState(null);
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    getLikedSongs();
    getUsername();
    // eslint-disable-next-line
  }, []);

  const getLikedSongs = () => {
    let url = "https://api.spotify.com/v1/me/tracks?limit=50";

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      })
      .then((result) => setLikedSongs(result.data.items));
  };

  const getUsername = () => {
    let url = "https://api.spotify.com/v1/me";

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      })
      .then((result) => {
        setDisplayName(result.data.display_name);
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
        <Box width={"42.5%"} marginLeft={"5%"}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5">Liked Songs</Typography>
              {likedSongs &&
                likedSongs.map((obj, index) => {
                  return (
                    <SongCard
                      song={obj.track.name}
                      artist={obj.track.artists[0].name}
                      rank={index + 1}
                    />
                  );
                })}
            </CardContent>
          </Card>
        </Box>
      </div>
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
      </CardContent>
    </Card>
  );
}
