import * as React from 'react';
import { useState } from 'react';
import { ErrorNotification } from '../common/ErrorNotification';
import { Copyright } from '../common/Copyright';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { CssBaseline } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import { deepOrange } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSignUpMutation } from '../rtk/authApi';
import { preventDefault } from '../common/utils';
import { updateField } from '../rtk/accountSlice';
import { setSignUp } from '../rtk/signUpSlice';
import CircularProgress from '@mui/material/CircularProgress';

// TODO
// add error handling
    // not same password
    // already exists

const theme = createTheme();

export function SignUpForm(props) {

    const dispatch = useDispatch();
    const {username, email, password } = useSelector(state => state.account);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [signUp, { error, isLoading: signUpLoading }] = useSignUpMutation();
    const field = useCallback(
      e => dispatch(updateField({field: e.target.name, value: e.target.value})),
      [dispatch],
    );

    return (
        <>
        {signUpLoading ?
        <CircularProgress /> :
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                <Avatar sx={{ m: 1, bgcolor: deepOrange[500] }}>
                    <LocalFireDepartmentOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <ErrorNotification error={error} />
                <Box
                    component="form"
                    method="post"
                    onSubmit={preventDefault(signUp, () => ({ username, email, password }))}
                    noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="username"
                            label="Username"
                            value={username}
                            onChange={field}
                            variant="outlined"
                            autoFocus
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="email"
                            label="Email"
                            value={email}
                            onChange={field}
                            variant="outlined"
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            value={password}
                            onChange={field}
                            type="password"
                            autoComplete="current-password"
                            variant="outlined"
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            type="password"
                            variant="outlined"
                        />


                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, bgcolor: deepOrange[500] }}
                    >
                    Sign up
                    </Button>
                <Grid container>
                    <Grid item>
                        <Link onClick={() => dispatch(setSignUp())} variant="body2">
                        {"Already have an account? Log in"}
                        </Link>
                    </Grid>
                </Grid>
                </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
        }
        </>
      );
}