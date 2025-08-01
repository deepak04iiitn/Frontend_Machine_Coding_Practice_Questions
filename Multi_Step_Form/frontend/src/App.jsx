import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check, User, MapPin, Eye } from 'lucide-react';

const Simple3StepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    firstName: '',
    lastName: '',
    email: '',
    
    // Step 2: Address Information
    street: '',
    city: '',
    state: '',
    country: ''
  });

  const [errors, setErrors] = useState({});
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [isInitialized, setIsInitialized] = useState(false);

  // Load data from memory on component mount
  useEffect(() => {
    const savedData = window.formData;
    const savedStep = window.currentFormStep;
    const savedCompletedSteps = window.completedFormSteps;
    
    if (savedData && Object.keys(savedData).length > 0) {
      setFormData(savedData);
    }
    if (savedStep && savedStep > 1) {
      setCurrentStep(savedStep);
    }
    if (savedCompletedSteps && Array.isArray(savedCompletedSteps) && savedCompletedSteps.length > 0) {
      setCompletedSteps(new Set(savedCompletedSteps));
    }
    
    setIsInitialized(true);
  }, []);

  // Save data to memory whenever it changes (but only after initialization)
  useEffect(() => {
    if (isInitialized) {
      // Only save if there's actual form data
      const hasFormData = Object.values(formData).some(value => value.trim() !== '');
      
      if (hasFormData || currentStep > 1 || completedSteps.size > 0) {
        window.formData = formData;
        window.currentFormStep = currentStep;
        window.completedFormSteps = Array.from(completedSteps);
      }
    }
  }, [formData, currentStep, completedSteps, isInitialized]);

  const steps = [
    { id: 1, title: 'Personal Info', icon: User },
    { id: 2, title: 'Address', icon: MapPin },
    { id: 3, title: 'Review', icon: Eye }
  ];

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Email is invalid';
        }
        break;

      case 2:
        if (!formData.street.trim()) newErrors.street = 'Street address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.country.trim()) newErrors.country = 'Country is required';
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleStepClick = (stepId) => {
    if (stepId < currentStep || completedSteps.has(stepId)) {
      setCurrentStep(stepId);
    }
  };

  const handleSubmit = () => {
    alert('Form submitted successfully! Check console for form data.');
    console.log('Form Data:', formData);
    
    // Clear saved data after successful submission
    delete window.formData;
    delete window.currentFormStep;
    delete window.completedFormSteps;
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      street: '',
      city: '',
      state: '',
      country: ''
    });
    setCurrentStep(1);
    setCompletedSteps(new Set());
  };

  const clearSavedData = () => {
    delete window.formData;
    delete window.currentFormStep;
    delete window.completedFormSteps;
    
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      street: '',
      city: '',
      state: '',
      country: ''
    });
    setCurrentStep(1);
    setCompletedSteps(new Set());
    setErrors({});
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Personal Information</h2>
        <p className="text-gray-600">Please provide your basic information</p>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your first name"
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your last name"
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your email address"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Address Information</h2>
        <p className="text-gray-600">Please provide your address details</p>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Street Address *
          </label>
          <input
            type="text"
            value={formData.street}
            onChange={(e) => handleInputChange('street', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.street ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your street address"
          />
          {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.city ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your city"
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State *
            </label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.state ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your state"
            />
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country *
          </label>
          <select
            value={formData.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.country ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select your country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="UK">United Kingdom</option>
            <option value="AU">Australia</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            <option value="IN">India</option>
            <option value="JP">Japan</option>
            <option value="BR">Brazil</option>
            <option value="MX">Mexico</option>
          </select>
          {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Review Information</h2>
        <p className="text-gray-600">Please review your information before submitting</p>
      </div>
      
      <div className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">First Name:</span>
              <span className="text-gray-800">{formData.firstName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Last Name:</span>
              <span className="text-gray-800">{formData.lastName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Email:</span>
              <span className="text-gray-800">{formData.email}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Address Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Street Address:</span>
              <span className="text-gray-800">{formData.street}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">City:</span>
              <span className="text-gray-800">{formData.city}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">State:</span>
              <span className="text-gray-800">{formData.state}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Country:</span>
              <span className="text-gray-800">{formData.country}</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Please review all information carefully. Once submitted, changes may not be possible.
          </p>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      default: return renderStep1();
    }
  };

  // Check if there's any saved data to show persistence status
  const hasSavedData = window.formData && Object.values(window.formData || {}).some(value => String(value).trim() !== '');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Step Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = completedSteps.has(step.id);
              const isCurrent = currentStep === step.id;
              const isAccessible = step.id <= currentStep || completedSteps.has(step.id);
              
              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-200 ${
                      isAccessible ? 'cursor-pointer' : 'cursor-not-allowed'
                    } ${
                      isCompleted
                        ? 'bg-green-500 border-green-500 text-white'
                        : isCurrent
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : isAccessible
                        ? 'bg-white border-gray-300 text-gray-500 hover:border-blue-300'
                        : 'bg-gray-100 border-gray-200 text-gray-400'
                    }`}
                    onClick={() => isAccessible && handleStepClick(step.id)}
                  >
                    {isCompleted ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p className={`text-sm font-medium ${
                      isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      Step {step.id}
                    </p>
                    <p className={`text-sm ${
                      isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-24 h-0.5 mx-4 ${
                      completedSteps.has(step.id) ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Data Persistence Info */}
        <div className={`mb-6 p-4 rounded-lg border ${
          hasSavedData 
            ? 'bg-green-50 border-green-200' 
            : 'bg-yellow-50 border-yellow-200'
        }`}>
          <div className="flex justify-between items-start">
            <p className={`text-sm ${
              hasSavedData ? 'text-green-800' : 'text-yellow-800'
            }`}>
              <strong>Data Persistence:</strong> {
                hasSavedData 
                  ? 'Your form data has been restored from your previous session. You can continue where you left off.'
                  : 'Your form data is automatically saved and will be preserved even if you refresh the page.'
              }
            </p>
            {hasSavedData && (
              <button
                onClick={clearSavedData}
                className="ml-4 px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
              >
                Clear Saved Data
              </button>
            )}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {renderCurrentStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </button>

            {currentStep < steps.length ? (
              <button
                onClick={handleNext}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                <Check className="w-4 h-4 mr-2" />
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simple3StepForm;






// import React, { useState } from 'react';

// export default function MultiStepForm() {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     age: '',
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const nextStep = () => setStep((prev) => prev + 1);
//   const prevStep = () => setStep((prev) => prev - 1);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Submitted Data:', formData);
//     alert('Form submitted!');
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
//       <h2 className="text-2xl font-bold mb-4">Multi-Step Form</h2>

//       <form onSubmit={handleSubmit}>
//         {step === 1 && (
//           <div>
//             <label className="block mb-2">Name:</label>
//             <input
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded"
//               required
//             />
//           </div>
//         )}

//         {step === 2 && (
//           <div>
//             <label className="block mb-2">Email:</label>
//             <input
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded"
//               required
//             />
//           </div>
//         )}

//         {step === 3 && (
//           <div>
//             <label className="block mb-2">Age:</label>
//             <input
//               name="age"
//               type="number"
//               value={formData.age}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded"
//               required
//             />
//           </div>
//         )}

//         {/* Navigation Buttons */}
//         <div className="flex justify-between mt-6">
//           {step > 1 && (
//             <button
//               type="button"
//               onClick={prevStep}
//               className="px-4 py-2 bg-gray-300 rounded"
//             >
//               Previous
//             </button>
//           )}
//           {step < 3 && (
//             <button
//               type="button"
//               onClick={nextStep}
//               className="ml-auto px-4 py-2 bg-blue-500 text-white rounded"
//             >
//               Next
//             </button>
//           )}
//           {step === 3 && (
//             <button
//               type="submit"
//               className="ml-auto px-4 py-2 bg-green-600 text-white rounded"
//             >
//               Submit
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// }
