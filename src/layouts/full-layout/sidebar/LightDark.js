import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Switch, Card } from '@mui/material';

import { setDarkMode } from '../../../redux/customizer/Action';

const LightDark = () => {
  const [activeMode, setActiveMode] = useState(true);
  const customizer = useSelector((state) => state.CustomizerReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (customizer.activeMode === 'dark') {
      setActiveMode(true);
    } else {
      setActiveMode(false);
    }
  }, [customizer.activeMode]);

  function handleDarkMode() {
    if (customizer.activeMode === 'dark') {
      dispatch(setDarkMode("light"));
    } else {
      dispatch(setDarkMode("dark"));
    }
  }
  // const customizer = useSelector((state)=> state.CustomizerReducer);

  return (
    <Box pb={5} mt={5}>
      <Box
        sx={{
          borderRadius: '10px',
          overflow: 'hidden',
          textAlign: 'center',
        }}
        style={{ position: 'relative' }}
      >
        <Card p={0}>
          <Typography variant="h4" fontWeight="700" mb={2}>
            Light / Dark
          </Typography>
          <Switch checked={activeMode} onClick={handleDarkMode} />
        </Card>
      </Box>
    </Box>
  )
};
export default LightDark;
