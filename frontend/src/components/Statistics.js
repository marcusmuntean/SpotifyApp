import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { React, useState, useEffect } from "react";
import axios from "axios";

export default function Statistics(props) {
  const [filterLength, setFilterLength] = useState("All Time");
  const [topSongData, setTopSongData] = useState(null);
  const [topArtistData, setTopArtistData] = useState(null);
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    getSongData();
    getArtistData();
    getUsername();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getSongData();
    getArtistData();
    // eslint-disable-next-line
  }, [filterLength]);

  const handleChange = (event) => {
    setFilterLength(event.target.value);
  };

  const getSongData = () => {
    let term;

    if (filterLength === "All Time") {
      term = "long_term";
    } else if (filterLength === "Last 6 Months") {
      term = "medium_term";
    } else if (filterLength === "Last Month") {
      term = "short_term";
    }

    let url =
      "http://localhost:9000/statistics/songs/" + term + "/" + props.token;

    axios.get(url).then((result) => setTopSongData(result.data.items));
  };

  const getArtistData = () => {
    let term;

    if (filterLength === "All Time") {
      term = "long_term";
    } else if (filterLength === "Last 6 Months") {
      term = "medium_term";
    } else if (filterLength === "Last Month") {
      term = "short_term";
    }

    let url =
      "http://localhost:9000/statistics/artists/" + term + "/" + props.token;

    axios.get(url).then((result) => setTopArtistData(result.data.items));
  };

  const getUsername = () => {
    let url = "http://localhost:9000/statistics/name/" + props.token;

    axios.get(url).then((result) => {
      setDisplayName(result.data.display_name);
    });
  };

  return (
    <>
      <Typography
        variant="h3"
        sx={{ fontWeight: "bold", marginBottom: "0.7%", marginTop: "0.5%" }}
      >
        Statistics
      </Typography>
      <Typography
        fontSize={"26px"}
        color="#827b7a"
        marginTop={"-15px"}
        marginBottom={"15px"}
      >
        {displayName}
      </Typography>
      <Box
        sx={{
          width: "6%",
          minWidth: "150px",
          marginLeft: "5%",
          marginTop: "-1%",
          marginBottom: "1%",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Filter</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filterLength}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={"Last Month"}>Last Month</MenuItem>
            <MenuItem value={"Last 6 Months"}>Last 6 Months</MenuItem>
            <MenuItem value={"All Time"}>All Time</MenuItem>
          </Select>
        </FormControl>
      </Box>
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
              <Typography variant="h5">Top Songs</Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {filterLength}
              </Typography>
              {topSongData &&
                topSongData.map((obj, index) => {
                  return (
                    <SongCard
                      song={obj.name}
                      artist={obj.artists[0].name}
                      rank={index + 1}
                    />
                  );
                })}
            </CardContent>
          </Card>
        </Box>
        <Box width={"42.5%"} marginRight={"5%"}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5">Top Artists</Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {filterLength}
              </Typography>
              {topArtistData &&
                topArtistData.map((obj, index) => {
                  return <ArtistCard artist={obj.name} rank={index + 1} />;
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
    <Card variant="outlined" sx={{ height: "150px" }}>
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

function ArtistCard(props) {
  return (
    <Card variant="outlined" sx={{ height: "150px" }}>
      <CardContent>
        <Typography variant="h4">{props.rank}</Typography>
        <Box marginLeft={"34%"} marginBottom={"1.2%"}>
          <Divider width={"45%"} />
        </Box>
        <Typography variant="h5">{props.artist}</Typography>
      </CardContent>
    </Card>
  );
}
