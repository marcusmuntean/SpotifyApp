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
import { React, useState } from "react";

export default function Statistics() {
  const [filterLength, setFilterLength] = useState("All Time");

  const handleChange = (event) => {
    setFilterLength(event.target.value);
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
        USERNAME
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
            <MenuItem value={"Last Year"}>Last Year</MenuItem>
            <MenuItem value={"All Time"}>All Time</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {console.log(filterLength)}
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
              <SongCard />
              <SongCard />
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
              <ArtistCard />
              <ArtistCard />
            </CardContent>
          </Card>
        </Box>
      </div>
    </>
  );
}

function SongCard() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h4">1</Typography>
        <Box marginLeft={"34%"} marginBottom={"1.2%"}>
          <Divider width={"45%"} />
        </Box>
        <Typography variant="h5">Power Trip</Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          J. Cole
        </Typography>
      </CardContent>
    </Card>
  );
}

function ArtistCard() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h4">1</Typography>
        <Box marginLeft={"34%"} marginBottom={"1.2%"}>
          <Divider width={"45%"} />
        </Box>
        <Typography variant="h5">Jermaine Cole</Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Hrs?
        </Typography>
      </CardContent>
    </Card>
  );
}
