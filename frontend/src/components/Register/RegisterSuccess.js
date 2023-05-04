import { CheckCircle } from '@mui/icons-material';
import { Box, IconButton, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';


function RegisterSuccess() {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate('/components/login');
  }, 10000);

  
  return (
    <Box display="flex" flexDirection="column" alignItems="center" position="relative" textAlign="center" className="fade-in-out">
            <IconButton>
              <CheckCircle style={{ fontSize: 150 }} />
            </IconButton>
            <Typography variant="h5" >
            Dziękujemy za dokonanie rejestracji. Wysłaliśmy wiadomość e-mail z linkiem aktywacyjnym na Twój adres e-mail. Prosimy postępować zgodnie z instrukcjami zawartymi w wiadomości e-mail w celu dalszej aktywacji Twojego konta.
            </Typography>
    </Box>
  );
}

export default RegisterSuccess;