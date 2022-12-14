import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import { CssBaseline } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { deepOrange } from '@mui/material/colors';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Copyright } from '../common/Copyright';
import { eventTargetSelector as target, preventDefault } from '../common/utils';
import { updateField } from '../rtk-files/accountSlice';
import { useGetTokenQuery, useLogInMutation } from '../rtk-files/authApi';
import { toggleSignUp } from '../rtk-files/signUpSlice';
import { SignUpForm } from './SignUpForm';


const theme = createTheme();

export function LoginForm() {

  const { data: token, isLoading: tokenLoading } = useGetTokenQuery();
  const dispatch = useDispatch();
  const { username, password } = useSelector(state => state.account);
  const [logIn] = useLogInMutation();
  const field = useCallback(
    e => dispatch(updateField({ field: e.target.name, value: e.target.value })),
    [dispatch],
  );
  const { signUp } = useSelector(state => state.signUp);


  return (
    <>
      {signUp ?
        <SignUpForm /> :
        tokenLoading ?
          <></> :
          token ?
            "You're already logged in, silly!" :
            <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: deepOrange[500] }}>
                    <LocalFireDepartmentOutlinedIcon />
                  </Avatar>
                  <Box
                    component="form"
                    method="post"
                    onSubmit={preventDefault(logIn, target)}
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
                      autoFocus />
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
                      variant="outlined" />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, bgcolor: deepOrange[500] }}>
                      Log In
                    </Button>
                    <Grid container>
                      <Grid item>
                        <Link onClick={() => dispatch(toggleSignUp())} variant="body2">
                          {"Don't have an account? Sign up"}
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
