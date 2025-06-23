import React from "react";
import { useForm } from "react-hook-form";

const Step3 = ({ prevStep, defaultValues, handleFinalSubmit }) => {
  const { handleSubmit } = useForm({ defaultValues });

  const onSubmit = () => handleFinalSubmit(defaultValues);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-gray-100 p-4 rounded">
        <h3 className="text-lg font-semibold mb-3">Review Your Details:</h3>
        <div className="mb-2">
          <strong>Name:</strong> {defaultValues.name}
        </div>
        <div className="mb-2">
          <strong>Email:</strong> {defaultValues.email}
        </div>
        <div className="mb-2">
          <strong>Address:</strong> {defaultValues.address}
        </div>
        <div className="mb-2">
          <strong>City:</strong> {defaultValues.city}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={prevStep}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Step3;
