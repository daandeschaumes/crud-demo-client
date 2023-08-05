import { IResourceComponentsProps } from "@refinedev/core";
import { useGetIdentity } from "@refinedev/core";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";
import CategoryForm from "../../components/common/Form";

export const RestaurantCreate: React.FC<IResourceComponentsProps> = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [propertyImage, setPropertyImage] = useState({ name: "", url: "" });

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
    try {
      // console.log(propertyImage);
      // if (!propertyImage.name) return alert("Please select an image");
      await onFinish({
        ...data,
        categoryId,
        photo: propertyImage.url ?? "",
      });
      //@ts-ignore
      navigate(`/categories/show/${categoryId}`);
    } catch (error) {
      //@ts-ignore
      console.log(error);
    }
  };
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();
  return (
    <CategoryForm
      operation="aanmaken"
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
