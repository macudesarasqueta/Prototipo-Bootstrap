import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  const inputClasses =
    "px-6 py-3.5 rounded-full bg-white border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition placeholder:text-gray-400";
  const buttonClasses =
    "py-3.5 px-6 bg-cyan-500 text-white rounded-full font-medium tracking-wide shadow-lg transform transition-all hover:bg-cyan-600 hover:scale-105 active:scale-95";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-4 w-full"
    >
      <input
        type="text"
        placeholder="Nombre Completo"
        value={formData.name}
        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
        className={`${inputClasses} w-full sm:w-100`}  // Input más largo en pantallas grandes
        required
      />
      <input
        type="email"
        placeholder="@ mail"
        value={formData.email}
        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
        className={`${inputClasses} w-full sm:w-100`}
        required
      />
      <button type="submit" className={`${buttonClasses} w-full sm:w-auto`}>
        Enviar
      </button>
    </form>
  );
};

export default ContactForm;
