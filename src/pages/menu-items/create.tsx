import { BaseRecord, IResourceComponentsProps, useShow } from "@refinedev/core";
import { useEffect, useState } from "react";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";
import CategoryForm from "../../components/common/Form";
import { useNavigate, useParams } from "react-router-dom";
import MenuForm from "../../components/common/MenuForm";

export const MenuItemCreate: React.FC<IResourceComponentsProps> = () => {
  const navigate = useNavigate();
  let { restaurantId } = useParams();

  const [propertyImage, setPropertyImage] = useState({ name: "", url: "" });
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm({
    refineCoreProps: {
      action: "create",
      resource: "menuitems",
    },
  });

  const onFinishHandler = async (data: FieldValues) => {
    await onFinish({
      ...data,
      restaurantId,
    });
    navigate(`/restaurants/show/${restaurantId}`);
  };

  return (
    <MenuForm
      operation="toevoegen"
      type="Menu"
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleImageChange={() => {}}
      onFinishHandler={onFinishHandler}
      propertyImage={propertyImage}
    />
  );
};
