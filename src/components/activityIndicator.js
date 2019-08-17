import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export const ActivityIndicator = () => (
  <div>
    <CircularProgress size={60} thickness={7} color = 'primary'/>
  </div>
)