import { Button } from '@mui/material';
import { Box, useMediaQuery } from '@mui/system';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Google from 'assets/images/icons/social-google.svg';
import { useTheme } from '@emotion/react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const GoogleAuthLogin = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

    const signIn = useGoogleLogin({
        onSuccess: (response) => {
            console.log(response);
            /* TODO:
             *  서버에 response.access_token 전달하여 서버에서 Google Api로 회원정보 요청..
             *  서버에서 회원정보 요청 성공 시, 프론트로 회원정보 확인 후 전달 > 로그인 처리
             */
            localStorage.setItem('user', JSON.stringify({ id: 'Social@email.com', name: 'Slave Social User' }));
            navigate('/dashboard/default');
        },
        onError: (error) => {
            console.log(error);
        }
    });

    return (
        <AnimateButton>
            <Button
                disableElevation
                fullWidth
                onClick={signIn}
                size="large"
                variant="outlined"
                sx={{
                    color: 'grey.700',
                    backgroundColor: theme.palette.grey[50],
                    borderColor: theme.palette.grey[100]
                }}
            >
                <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                    <img src={Google} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
                </Box>
                Sign in with Google
            </Button>
        </AnimateButton>
    );
};

export default GoogleAuthLogin;
