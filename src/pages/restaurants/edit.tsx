import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { useState } from "react";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";
import CategoryForm from "../../components/common/Form";
import { useParams } from "react-router-dom";
import logo from "../../assets/food-logo.png";

export const RestaurantEdit: React.FC<IResourceComponentsProps> = () => {
  let { id } = useParams();
  const { queryResult } = useShow();

  const { data, isLoading, isError } = queryResult;
  const restaurantDetails = data?.data ?? {};
  console.log(restaurantDetails);
  const [propertyImage, setPropertyImage] = useState({ name: "", url: "" });
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm({
    refineCoreProps: { action: "edit", resource: "restaurants", id: id },
  });

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) =>
      setPropertyImage({ name: file?.name, url: result })
    );
  };

  const onFinishHandler = async (data: FieldValues) => {
    await onFinish({
      ...data,
      photo: propertyImage.url
        ? propertyImage.url
        : restaurantDetails.photo
        ? restaurantDetails.photo
        : "",
    });
  };

  return (
    <CategoryForm
      operation="bewerken"
      type="Restaurant"
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      propertyImage={propertyImage}
    />
  );
};
