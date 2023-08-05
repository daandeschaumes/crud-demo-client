import {
  IResourceComponentsProps,
  useDelete,
  useGetIdentity,
  useShow,
} from "@refinedev/core";
import {
  Typography,
  Box,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Modal,
  Button,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChatBubble,
  Delete,
  Add,
  Edit,
  Phone,
  Place,
  Star,
  ExpandMore,
} from "@mui/icons-material";
import { FieldValues } from "react-hook-form";
import { useForm } from "@refinedev/react-hook-form";

import { CustomButton } from "../../components";
import { useState } from "react";
import CategoryForm from "../../components/common/Form";
import logo from "../../assets/food-logo.png";

function checkImage(url: any) {
  const img = new Image();
  img.src = url;
  return img.width !== 0 && img.height !== 0;
}

export const RestaurantShow: React.FC<IResourceComponentsProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { mutate } = useDelete();
  const { queryResult } = useShow();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data, isLoading, isError } = queryResult;
  const restaurantDetails = data?.data ?? {};

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const handleDeleteRestaurant = () => {
    const response = confirm("Are you sure you want to delete this property?");
    if (response) {
      mutate(
        {
          resource: "restaurants",
          id: id as string,
        },
        {
          onSuccess: () => {
            navigate("/");
          },
        }
      );
    }
  };

  const handleDeleteMenuItem = (menuItemId: string) => {
    const response = confirm(
      "Ben je zeker dat je dit menu-item wil verwijderen?"
    );
    if (response) {
      mutate(
        {
          resource: "menuitems",
          id: menuItemId,
        },
        {
          onSuccess: (event: any) => {
            window.location.reload();
          },
        }
      );
    }
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box borderRadius="15px" padding="20px" bgcolor="#fcfcfc">
      <Box display="flex" justifyContent="space-between">
        <Typography fontSize={25} fontWeight={700} color="#11142d">
          Details
        </Typography>

        <Box>
          <Button
            sx={{ color: "black" }}
            onClick={() =>
              navigate(`/restaurants/edit/${restaurantDetails._id}`)
            }
          >
            <Edit /> Restaurant aanpassen
          </Button>
          <Button onClick={handleDeleteRestaurant} sx={{ color: "red" }}>
            <Delete /> Restaurant verwijderen
          </Button>
        </Box>
      </Box>

      <Box
        mt="20px"
        display="flex"
        flexDirection={{ xs: "column", lg: "row" }}
        gap={4}
      >
        <Box flex={1}>
          <img
            src={restaurantDetails.photo != "" ? restaurantDetails.photo : logo}
            alt="property_details-img"
            height={546}
            style={{ objectFit: "cover", borderRadius: "10px" }}
            className="property_details-img"
          />

          <Box mt="15px">
            <Stack
              direction="row"
              justifyContent="space-between"
              flexWrap="wrap"
              alignItems="center"
            >
              <Typography
                fontSize={18}
                fontWeight={500}
                color="#11142D"
                textTransform="capitalize"
              >
                {restaurantDetails.propertyType}
              </Typography>
              <Box>
                {[1, 2, 3, 4, 5].map((item) => (
                  <Star key={`star-${item}`} sx={{ color: "#F2C94C" }} />
                ))}
              </Box>
            </Stack>

            <Stack
              direction="row"
              flexWrap="wrap"
              justifyContent="space-between"
              alignItems="center"
              gap={2}
            >
              <Box>
                <Typography
                  fontSize={22}
                  fontWeight={600}
                  mt="10px"
                  color="#11142D"
                >
                  {restaurantDetails.title}
                </Typography>
                <Stack mt={0.5} direction="row" alignItems="center" gap={0.5}>
                  <Place sx={{ color: "#808191" }} />
                  <Typography fontSize={14} color="#808191">
                    {restaurantDetails.location}
                  </Typography>
                </Stack>
              </Box>

              <Box>
                <Typography
                  fontSize={16}
                  fontWeight={600}
                  mt="10px"
                  color="#11142D"
                >
                  Price
                </Typography>
                <Stack direction="row" alignItems="flex-end" gap={1}>
                  <Typography fontSize={25} fontWeight={700} color="#475BE8">
                    ${restaurantDetails.price}
                  </Typography>
                  <Typography fontSize={14} color="#808191" mb={0.5}>
                    for one day
                  </Typography>
                </Stack>
              </Box>
            </Stack>

            <Stack mt="25px" direction="column" gap="10px">
              <Typography fontSize={18} color="#11142D">
                Description
              </Typography>
              <Typography fontSize={14} color="#808191">
                {restaurantDetails.description}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography fontSize={18} color="#11142D">
                  Menu
                </Typography>
                <CustomButton
                  title="Menuitem toevoegen"
                  handleClick={() =>
                    navigate(`/menu-items/create/${restaurantDetails._id}`)
                  }
                  backgroundColor="#7ed957"
                  color="#fcfcfc"
                  icon={<Add />}
                />
              </Box>
              {restaurantDetails.allMenuItems.length
                ? restaurantDetails.allMenuItems.map((i: any) => (
                    <Accordion>
                      <Box display="flex" justifyContent="space-between">
                        <Box>
                          <AccordionSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography>{i.title}</Typography>
                          </AccordionSummary>
                        </Box>
                        <Box>
                          <Button
                            onClick={() =>
                              navigate(`/menu-items/edit/${i._id}`)
                            }
                          >
                            <Edit />
                          </Button>
                          <Button onClick={() => handleDeleteMenuItem(i._id)}>
                            <Delete />
                          </Button>
                        </Box>
                      </Box>

                      {/* <AccordionDetails>
                        <Typography>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Suspendisse malesuada lacus ex, sit amet blandit
                          leo lobortis eget.
                        </Typography>
                      </AccordionDetails> */}
                    </Accordion>
                  ))
                : []}
            </Stack>
          </Box>
        </Box>
        <Box
          width="100%"
          flex={1}
          maxWidth={326}
          display="flex"
          flexDirection="column"
          gap="20px"
        >
          <Stack>
            <img
              src="https://serpmedia.org/scigen/images/googlemaps-nyc-standard.png?crc=3787557525"
              width="100%"
              height={306}
              style={{ borderRadius: 10, objectFit: "cover" }}
            />
          </Stack>

          <Box>
            <CustomButton
              title="Show JSON"
              backgroundColor="#475BE8"
              color="#FCFCFC"
              handleClick={handleOpen}
              fullWidth
            />
          </Box>
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            JSON-content
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {JSON.stringify(restaurantDetails)}
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};
