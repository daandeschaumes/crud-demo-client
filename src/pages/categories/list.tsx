import {
  IResourceComponentsProps,
  useTable,
  useGetIdentity,
} from "@refinedev/core";
import {
  Typography,
  Box,
  Stack,
  TextField,
  Select,
  MenuItem,
  Button,
  Modal,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PropertyCard, CustomButton } from "../../components";
import { Add } from "@mui/icons-material";
import { useMemo, useState } from "react";

export const CategoryList: React.FC<IResourceComponentsProps> = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const { data: user } = useGetIdentity<{
  //   _id: number;
  //   email: string;
  // }>();

  const {
    tableQueryResult: { data, isLoading, isError },
  } = useTable({ resource: "categories" });
  const allCategories = data?.data ?? [];

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
  // const currentPrice = sorters.find((item) => item.field === "price")?.order;
  // const toggleSort = (field: string) => {
  //   setSorters([{ field, order: currentPrice === "asc" ? "desc" : "asc" }]);
  // };

  // const currentFilterValues = useMemo(() => {
  //   const logicalFilters = filters.flatMap((item) =>
  //     "field" in item ? item : []
  //   );
  //   console.log("filters", filters);
  //   return {
  //     title: logicalFilters.find((item) => item.field === "title")?.value || "",
  //     propertyType:
  //       logicalFilters.find((item) => item.field === "propertyType")?.value ||
  //       "",
  //   };
  // }, [filters]);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error...</Typography>;
  return (
    <Box>
      <Box mt="20px" sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography fontSize={25} fontWeight={700} color="#11142d">
          {!allCategories.length
            ? "Geen categorieën gevonden"
            : "Alle categorieën"}
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
          <CustomButton
            title="Nieuwe categorie"
            handleClick={() => navigate("/categories/create")}
            backgroundColor="#7ed957"
            color="#fcfcfc"
            icon={<Add />}
          />
          <Button
            sx={{ marginLeft: "15px", color: "black" }}
            onClick={handleOpen}
          >
            Show JSON
          </Button>
        </Box>
      </Box>

      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {allCategories.map((category: any) => (
          <PropertyCard
            key={category._id}
            id={category._id}
            title={category.title}
            location={category.description}
            price=""
            photo={category.photo}
            creator=""
            type="category"
          />
        ))}
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
            {JSON.stringify(allCategories)}
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};
