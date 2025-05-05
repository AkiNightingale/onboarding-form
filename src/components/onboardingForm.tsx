import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useSnackbar } from 'notistack';

import { onboardingSchema, validateCorporationNumber } from '@/components/utils/validation';
import { useMedia } from '@/shared/hooks/use-media.ts';
import { FormData, useOnboardingForm } from '@/shared/hooks/useOnboardingForm';

const initialFormValues: FormData = {
  firstName: '',
  lastName: '',
  phone: '',
  corporationNumber: '',
};

export const OnboardingForm = () => {
  const { isSxScreen } = useMedia();
  const { submitForm, isSubmitting: isApiSubmitting } = useOnboardingForm();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (
    values: FormData,
    { resetForm }: FormikHelpers<FormData>,
  ) => {
    const result = await submitForm(values);
    if (result.success) {
      enqueueSnackbar({
        message: 'Form submitted successfully!',
        variant: 'success',
      });
      resetForm();
    } else {
      enqueueSnackbar({
        message: result.message,
        variant: 'error',
      });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100vh',
        flexDirection: 'column',
        py: 4,
        backgroundColor: 'grey.200',
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant='subtitle1'>Step 1 of 5</Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Stack
          gap={3}
          sx={{
            width: '100%',
            maxWidth: '50rem',
            backgroundColor: 'white',
            p: 3,
            borderRadius: 4,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography textAlign='center' variant='h4' component='h1'>
            Onboarding Form
          </Typography>

          <Formik<FormData>
            initialValues={initialFormValues}
            validationSchema={onboardingSchema}
            onSubmit={handleSubmit}
            validateOnBlur
            enableReinitialize
          >
            {({ isSubmitting: formikIsSubmitting, errors, touched, setFieldTouched, setFieldError, values }) => {
              const isFormDisabled = formikIsSubmitting || isApiSubmitting;

              return (
                <Form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <Stack
                    gap={2}
                    flexDirection={isSxScreen ? 'column' : 'row'}
                    justifyContent='space-between'
                    width='100%'
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography variant='subtitle2' fontWeight='bold' gutterBottom>
                        First Name
                      </Typography>
                      <Field
                        as={TextField}
                        name='firstName'
                        variant='outlined'
                        fullWidth
                        helperText={<ErrorMessage name='firstName' />}
                        error={Boolean(touched.firstName && errors.firstName)}
                        inputProps={{ maxLength: 50 }}
                        InputProps={{ 'aria-label': 'firstName' }}
                        disabled={isFormDisabled}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant='subtitle2' fontWeight='bold' gutterBottom>
                        Last Name
                      </Typography>
                      <Field
                        as={TextField}
                        name='lastName'
                        variant='outlined'
                        fullWidth
                        helperText={<ErrorMessage name='lastName' />}
                        error={Boolean(touched.lastName && errors.lastName)}
                        inputProps={{ maxLength: 50 }}
                        disabled={isFormDisabled}
                        InputProps={{ 'aria-label': 'lastName' }}
                      />
                    </Box>
                  </Stack>
                  <Box>
                    <Typography variant='subtitle2' fontWeight='bold' gutterBottom>
                      Phone Number
                    </Typography>
                    <Field
                      as={TextField}
                      name='phone'
                      variant='outlined'
                      fullWidth
                      helperText={<ErrorMessage name='phone' />}
                      error={Boolean(touched.phone && errors.phone)}
                      disabled={isFormDisabled}
                      InputProps={{ 'aria-label': 'phone' }}
                    />
                  </Box>
                  <Box>
                    <Typography variant='subtitle2' fontWeight='bold' gutterBottom>
                      Corporation Number
                    </Typography>
                    <Field
                      as={TextField}
                      name='corporationNumber'
                      variant='outlined'
                      fullWidth
                      helperText={<ErrorMessage name='corporationNumber' />}
                      error={Boolean(touched.corporationNumber && errors.corporationNumber)}
                      inputProps={{ maxLength: 9 }}
                      disabled={isFormDisabled}
                      InputProps={{ 'aria-label': 'corporationNumber' }}
                      onBlur={async () => {
                        await setFieldTouched('corporationNumber', true, true);

                        const asyncError = await validateCorporationNumber(values.corporationNumber);
                        if (asyncError) {
                          setFieldError('corporationNumber', asyncError);
                        }
                      }}
                    />
                  </Box>
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    disabled={isFormDisabled}
                    endIcon={<ArrowForwardIcon />}
                    fullWidth
                    sx={{
                      mt: 1,
                      py: 1.5,
                      fontSize: '1rem',
                      backgroundColor: 'black',
                      '&:hover': { backgroundColor: 'grey.800' },
                    }}
                  >
                    Submit
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </Stack>
      </Box>
    </Box>
  );
};