import { Box, Card, CardContent, Typography } from "@mui/material";

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
            </CardContent>
          </Card>
        </Box>
      </div>
    </>
  );
}
