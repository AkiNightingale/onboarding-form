import axios from 'axios';
import { useState } from 'react';

export interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  corporationNumber: string;
}

export const useOnboardingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await axios.post('https://fe-hometask-api.qa.vault.tryvault.com/profile-details', data);
      return { success: true };
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || 'Submission failed' };
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitForm, isSubmitting };
};