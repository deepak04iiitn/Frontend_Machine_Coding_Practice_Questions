import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
});

const Step2 = ({ nextStep, prevStep, defaultValues }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => nextStep(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Address:</label>
        <input {...register("address")} />
        <p className="text-red-500 text-sm">{errors.address?.message}</p>
      </div>
      <div>
        <label>City:</label>
        <input {...register("city")} />
        <p className="text-red-500 text-sm">{errors.city?.message}</p>
      </div>
      <div className="flex gap-2 mt-4">
        <button type="button" onClick={prevStep}>Back</button>
        <button type="submit">Next</button>
      </div>
    </form>
  );
};

export default Step2;
