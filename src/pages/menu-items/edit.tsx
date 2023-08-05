import { BaseRecord, IResourceComponentsProps, useShow } from "@refinedev/core";
import { useEffect, useState } from "react";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";
import CategoryForm from "../../components/common/Form";
import { useParams } from "react-router-dom";
import MenuForm from "../../components/common/MenuForm";

export const MenuItemEdit: React.FC<IResourceComponentsProps> = () => {
  let { id } = useParams();

  const [propertyImage, setPropertyImage] = useState({ name: "", url: "" });
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm({
    refineCoreProps: {
      action: "edit",
      resource: "menuitems",
      id: id,
    },
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
    });
  };

  return (
    <MenuForm
      operation="aanpassen"
      type="Menu"
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
