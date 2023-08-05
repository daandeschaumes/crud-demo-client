import {
  IResourceComponentsProps,
  useDelete,
  useGetIdentity,
  useShow,
} from "@refinedev/core";
import { Typography, Box, Stack, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChatBubble,
  Delete,
  Edit,
  Phone,
  Place,
  Star,
  Add,
} from "@mui/icons-material";

import { CustomButton } from "../../components";
import { PropertyCard } from "../../components";

function checkImage(url: any) {
  const img = new Image();
  img.src = url;
  return img.width !== 0 && img.height !== 0;
}

export const CategoryShow: React.FC<IResourceComponentsProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { mutate } = useDelete();
  const { queryResult } = useShow();

  const { data, isLoading, isError } = queryResult;
  const categoryDetails = data?.data ?? {};

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  console.log(categoryDetails);

  const handleDeleteCategory = () => {
    const response = confirm(
      "Ben je zeker dat je deze categorie wil verwijderen (de restaurants voor deze categorie worden bijgevolg ook verwijderd)?"
    );
    if (response) {
      mutate(
        {
          resource: "categories",
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

  return (
    <Box>
      <Box mt="20px" sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography fontSize={25} fontWeight={700} color="#11142d">
          {categoryDetails.title}
        </Typography>

        {/* <Box
          mb={2}
          mt={3}
          display="flex"
          width="84%"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Box
            display="flex"
            gap={2}
            flexWrap="wrap"
            mb={{ xs: "20px", sm: 0 }}
          >
            <CustomButton
              title={`Sort price ${currentPrice === "asc" ? "↑" : "↓"}`}
              handleClick={() => toggleSort("price")}
              backgroundColor="#475be8"
              color="#fcfcfc"
            />
            <TextField
              variant="outlined"
              color="info"
              placeholder="Search by title"
              value={currentFilterValues.title}
              onChange={(e) =>
                setFilters([
                  {
                    field: "title",
                    operator: "contains",
                    value: e.currentTarget?.value
                      ? e.currentTarget.value
                      : undefined,
                  },
                ])
              }
            ></TextField>
            <Select
              variant="outlined"
              color="info"
              displayEmpty
              required
              inputProps={{ "aria-label": "Without label" }}
              defaultValue=""
              value={currentFilterValues.propertyType}
              onChange={(e) =>
                setFilters(
                  [
                    {
                      field: "propertyType",
                      operator: "eq",
                      value: e.target.value,
                    },
                  ],
                  "replace"
                )
              }
            >
              <MenuItem value="">All</MenuItem>
              {[
                "Apartment",
                "Villa",
                "Farmhouse",
                "Condos",
                "Townhouse",
                "Duplex",
                "Studio",
                "Chalet",
              ].map((type) => (
                <MenuItem key={type} value={type.toLowerCase()}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box> */}
        <Box>
          <Button
            sx={{ color: "black" }}
            onClick={() => navigate(`/categories/edit/${id}`)}
          >
            <Edit /> Categorie aanpassen
          </Button>
          <Button sx={{ color: "red" }} onClick={handleDeleteCategory}>
            <Delete /> Categorie verwijderen
          </Button>
          <CustomButton
            title="Nieuw restaurant"
            handleClick={() => navigate(`/restaurants/create/${id}`)}
            backgroundColor="#7ed957"
            color="#fcfcfc"
            icon={<Add />}
          />
        </Box>
      </Box>

      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {categoryDetails.allRestaurants.map((restaurant: any) => (
          <PropertyCard
            key={restaurant._id}
            id={restaurant._id}
            title={restaurant.title}
            location={restaurant.description}
            price=""
            photo={restaurant.photo}
            creator=""
            type="restaurant"
          />
        ))}
      </Box>
    </Box>
  );
};
