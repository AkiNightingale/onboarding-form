import { useMediaQuery } from '@mui/material';

export const useMedia = () => {
  /** Note: For cases where an exact calculation is needed */
  const isSxScreen = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const isSmScreen = useMediaQuery((theme: any) => theme.breakpoints.between('sm', 'md'));
  const isMdScreen = useMediaQuery((theme: any) => theme.breakpoints.between('md', 'lg'));
  const isLgScreen = useMediaQuery((theme: any) => theme.breakpoints.between('lg', 'xl'));
  const isXlScreen = useMediaQuery((theme: any) => theme.breakpoints.up('xl'));

  /** Note: For general cases */
  const isSmallScreen = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
  const isMediumScreen = useMediaQuery((theme: any) => theme.breakpoints.between('md', 'lg'));
  const isLargeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));

  /** Note: For extended cases */
  const useIsUp = (value: string) => useMediaQuery((theme: any) => theme.breakpoints.up(value));
  const useIsDown = (value: string) => useMediaQuery((theme: any) => theme.breakpoints.down(value));
  const useIsBetween = (value1: string, value2: string) => useMediaQuery((theme: any) => theme.breakpoints.between(value1, value2));

  return {
    isSxScreen,
    isSmScreen,
    isMdScreen,
    isLgScreen,
    isXlScreen,
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    useIsUp,
    useIsDown,
    useIsBetween,
  };
};