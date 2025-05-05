import * as Yup from 'yup';

export const onboardingSchema = Yup.object({
  firstName: Yup.string()
    .max(50, 'First name must be 50 characters or less')
    .required('First name is required'),
  lastName: Yup.string()
    .max(50, 'Last name must be 50 characters or less')
    .required('Last name is required'),
  phone: Yup.string()
    .matches(/^\+1\d{10}$/, 'Must be a valid Canadian phone number (e.g., +12345678901)')
    .required('Phone number is required'),
  corporationNumber: Yup.string()
    .length(9, 'Corporation number must be exactly 9 characters')
    .required('Corporation number is required')
});

export const validateCorporationNumber = async (value: string | undefined): Promise<string | undefined> => {
  if (!value || value.length !== 9) return undefined;
  try {
    const response = await fetch(`https://fe-hometask-api.qa.vault.tryvault.com/corporation-number/${value}`);
    const data = await response.json();
    return data.valid ? undefined : 'Invalid corporation number';
  } catch {
    return 'Invalid corporation number';
  }
};