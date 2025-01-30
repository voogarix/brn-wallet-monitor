// src/utils/validation.js
export const isValidAddress = (address) => {
    const regex = /^[a-zA-Z0-9]{34}$/;  // Example regex for BRN address
    return regex.test(address);
  };
  