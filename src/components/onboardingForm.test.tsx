import '@testing-library/jest-dom';

import { screen, waitFor } from '@testing-library/dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SnackbarProvider } from 'notistack';

import { OnboardingForm } from './onboardingForm';

global.fetch = jest.fn();

const mockSubmitForm = jest.fn();

jest.mock(
  '@/shared/hooks/useOnboardingForm',
  () => (
    {
      useOnboardingForm: () => (
        {
          submitForm: mockSubmitForm,
          isSubmitting: false,
        }
      ),
    }
  ),
);

jest.mock(
  '@/shared/hooks/use-media.ts',
  () => (
    {
      useMedia: () => (
        {
          isSxScreen: false,
        }
      ),
    }
  ),
);

describe('OnboardingForm', () => {
  beforeEach(() => {
    mockSubmitForm.mockReset();
    (
      global.fetch as jest.Mock
    ).mockReset();
    (
      global.fetch as jest.Mock
    ).mockResolvedValue({
      json: () => Promise.resolve({ valid: true, corporationNumber: '826417395' }),
    });
    render(
      <SnackbarProvider>
        <OnboardingForm />
      </SnackbarProvider>,
    );
  });

  it('renders form fields and labels', async () => {
    // Check for header and title
    expect(screen.getByText(/Step 1 of 5/i)).toBeInTheDocument();
    expect(screen.getByText(/Onboarding Form/i)).toBeInTheDocument();

    // Check for static labels
    expect(screen.getByText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByText(/Corporation Number/i)).toBeInTheDocument();

    // Check for input fields
    const firstNameInput = screen.getByLabelText(/firstName/i);
    const lastNameInput = screen.getByLabelText(/lastName/i);
    const phoneInput = screen.getByLabelText(/phone/i);
    const corporationNumberInput = screen.getByLabelText(/corporationNumber/i);

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
    expect(corporationNumberInput).toBeInTheDocument();

    // Check for submit button with icon
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveStyle('background-color: black');
    expect(screen.getByTestId('ArrowForwardIcon')).toBeInTheDocument(); // Check for the icon
  });

  it('displays validation errors on blur for empty fields', async () => {
    // Test First Name validation
    const firstNameInput = screen.getByLabelText(/firstName/i);
    await userEvent.click(firstNameInput);
    await userEvent.tab(); // Trigger blur
    await waitFor(() => {
      expect(screen.getByText(/First name is required/i)).toBeInTheDocument();
    });

    // Test Last Name validation
    const lastNameInput = screen.getByLabelText(/lastName/i);
    await userEvent.click(lastNameInput);
    await userEvent.tab(); // Trigger blur
    await waitFor(() => {
      expect(screen.getByText(/Last name is required/i)).toBeInTheDocument();
    });

    // Test Phone Number validation
    const phoneInput = screen.getByLabelText(/phone/i);
    await userEvent.click(phoneInput);
    await userEvent.tab(); // Trigger blur
    await waitFor(() => {
      expect(screen.getByText(/Phone number is required/i)).toBeInTheDocument();
    });

    // Test Corporation Number validation
    const corpNumberInput = screen.getByLabelText(/corporationNumber/i);
    await userEvent.click(corpNumberInput);
    await userEvent.tab(); // Trigger blur
    await waitFor(() => {
      expect(screen.getByText(/Corporation number is required/i)).toBeInTheDocument();
    });
  });

  it('displays validation errors for invalid input', async () => {
    // Test invalid Phone Number format
    const phoneInput = screen.getByLabelText(/phone/i);
    await userEvent.type(phoneInput, 'invalid-phone');
    await userEvent.tab(); // Trigger blur
    await waitFor(() => {
      expect(screen.getByText(/Must be a valid Canadian phone number/i)).toBeInTheDocument();
    });

    // Test Corporation Number with wrong length
    const corpNumberInput = screen.getByLabelText(/corporationNumber/i);
    await userEvent.type(corpNumberInput, '12345'); // Less than 9 characters
    await userEvent.tab(); // Trigger blur
    await waitFor(() => {
      expect(screen.getByText(/Corporation number must be exactly 9 characters/i)).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    mockSubmitForm.mockResolvedValueOnce({ success: true });

    await userEvent.type(screen.getByLabelText(/firstName/i), 'Hello');
    await userEvent.type(screen.getByLabelText(/lastName/i), 'World');
    await userEvent.type(screen.getByLabelText(/phone/i), '+13062776103');
    await userEvent.type(screen.getByLabelText(/corporationNumber/i), '826417395');

    await userEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(mockSubmitForm).toHaveBeenCalledWith({
        firstName: 'Hello',
        lastName: 'World',
        phone: '+13062776103',
        corporationNumber: '826417395',
      });
    });

    // Check for success notification
    await waitFor(() => {
      expect(screen.getByText(/Form submitted successfully/i)).toBeInTheDocument();
    });
  });

  it('displays error message on failed submission', async () => {
    mockSubmitForm.mockResolvedValueOnce({ success: false, message: 'Submission failed' });

    await userEvent.type(screen.getByLabelText(/firstName/i), 'Hello');
    await userEvent.type(screen.getByLabelText(/lastName/i), 'World');
    await userEvent.type(screen.getByLabelText(/phone/i), '+12345678901');
    await userEvent.type(screen.getByLabelText(/corporationNumber/i), '123456789');

    await userEvent.click(screen.getByRole('button', { name: /Submit/i }));

    // Check if submitForm was called
    await waitFor(() => {
      expect(mockSubmitForm).toHaveBeenCalled();
    });

    // Check for error notification
    await waitFor(() => {
      expect(mockSubmitForm).toHaveBeenCalled();
      expect(screen.getByText(/Submission failed/i)).toBeInTheDocument();
    });
  });
});