import { IconButton } from '@mui/material';
import { Brightness4 as DarkIcon, Brightness7 as LightIcon } from '@mui/icons-material';

const DarkModeToggle = ({ darkMode, handleDarkModeChange }) => {
  const icon = darkMode ? <LightIcon /> : <DarkIcon />;
  const label = darkMode ? 'Włącz tryb jasny' : 'Włącz tryb ciemny';

  return (
    <IconButton onClick={handleDarkModeChange} aria-label={label} color="inherit">
      {icon}
    </IconButton>
  );
};

export default DarkModeToggle;

  