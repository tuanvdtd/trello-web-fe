import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import GroupIcon from "@mui/icons-material/Group";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import AttachmentIcon from "@mui/icons-material/Attachment";

function TrelloCard({ isHideCardMedia }) {
  if (isHideCardMedia) {
    return (
      <>
        <Card
          sx={{
            cursor: "pointer",
            boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
            overflow: "unset",
          }}
        >
          <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
            <Typography>Lizard</Typography>
          </CardContent>
        </Card>
      </>
    );
  }
  return (
    <>
      <Card
        sx={{
          cursor: "pointer",
          boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
          overflow: "unset",
        }}
      >
        <CardMedia
          sx={{ height: 140 }}
          image="https://creapills.com/wp-content/uploads/2022/10/dall-e-gratuit-intelligence-artificielle-2.jpg"
          title="green iguana"
        />
        <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
          <Typography>Lizard</Typography>
        </CardContent>
        <CardActions sx={{ p: "0 4px 8px 4px" }}>
          <Button size="small" startIcon={<GroupIcon />}>
            20
          </Button>
          <Button size="small" startIcon={<ModeCommentIcon />}>
            15
          </Button>
          <Button size="small" startIcon={<AttachmentIcon />}>
            10
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default TrelloCard;
