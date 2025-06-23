import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
});

const Step1 = ({ nextStep, defaultValues }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => nextStep(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <input {...register("name")} />
        <p className="text-red-500 text-sm">{errors.name?.message}</p>
      </div>
      <div>
        <label>Email:</label>
        <input {...register("email")} />
        <p className="text-red-500 text-sm">{errors.email?.message}</p>
      </div>
      <button type="submit" className="mt-4 btn btn-primary">Next</button>
    </form>
  );
};

export default Step1;
