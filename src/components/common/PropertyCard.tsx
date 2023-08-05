import React from "react";
import { Place } from "@mui/icons-material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import foodLogo from "../../assets/food-logo.png";
import {
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Stack,
  Button,
} from "@mui/material";
import { PropertyCardProps } from "../../interfaces/property";
const PropertyCard = ({
  id,
  title,
  location,
  price,
  photo,
  type,
}: PropertyCardProps) => {
  const navigate = useNavigate();
  return (
    <Card
      component={Link}
      to={
        type === "category"
          ? `/categories/show/${id}`
          : `/restaurants/show/${id}`
      }
      sx={{
        maxWidth: "330px",
        padding: "10px",
        "&:hover": { boxShadow: "0 22px 45px 2px rgba(176,176,176,0.1)" },
        cursor: "pointer",
        textDecoration: "none",
      }}
      elevation={0}
    >
      <CardMedia
        component="img"
        width="100%"
        height={210}
        image={photo == "" ? foodLogo : photo}
        alt="card image"
        sx={{ borderRadius: "10px" }}
      ></CardMedia>
      <CardContent
        sx={{
          display: "flex ",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "10px",
          paddingX: "5px",
        }}
      >
        <Stack direction="column" gap={1}>
          <Box display="flex">
            <Typography fontSize={16} fontWeight={500} color="#11142d">
              {title}
            </Typography>
          </Box>

          <Stack direction="row" gap={0.5} alignItems="flex-start">
            <Place sx={{ fontSize: 18, color: "#11142d", marginTop: 0.5 }} />
            <Typography fontSize={14} color="#808191">
              {location}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
