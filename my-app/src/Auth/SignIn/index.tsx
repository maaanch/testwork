import * as React from "react";
import {
  CssBaseline,
  Link,
  Box,
  Typography,
  Container,
  Stack,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthLogin } from "../AuthLogin";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

function Copyright(props: any) {
  const { getaccessToken } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const token = getaccessToken();
  const navigate = useNavigate();
  React.useEffect(() => {
    console.log(token);
    if (token) {
      {
        navigate(from, { replace: true });
      }
    }
  }, [token]);

  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://users.com">
        User Managment System
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const theme = createTheme();
export default function SignIn() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box>
            <Stack direction="row">
              <img
                width="190"
                height="87"
                src="https://miro.medium.com/v2/resize:fit:1400/0*sHiJRWIiIAcA8D_V"
                className="attachment-full size-full entered lazyloaded"
                alt=""
                data-lazy-src="https://ibb.co/BKMxjX6"
                data-ll-status="loaded"
              />
            </Stack>
          </Box>
          <AuthLogin />
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
