import { Box, Card, CardContent, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";

export default function Statistics() {
  return (
    <>
      <h1>Statistics</h1>
      <Typography color="#827b7a" marginTop={"-15px"} marginBottom={"15px"}>
        Username
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
              <Typography variant="h5">Top Songs</Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Last week/month/year
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
                Last week/month/year
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
