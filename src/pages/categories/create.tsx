import { IResourceComponentsProps } from "@refinedev/core";
import { useGetIdentity } from "@refinedev/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";
import Form from "../../components/common/Form";

export const CategoryCreate: React.FC<IResourceComponentsProps> = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity<{
    email: string;
  }>();
  console.log(user);
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
      console.log("on finish", user?.email);
      await onFinish({
        ...data,
        photo: propertyImage.url ?? "",
      });
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
    <Form
      operation="aanmaken"
      type="Categorie"
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
