"use client";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "./hooks/useAuth";
import { useRouter } from "next/navigation";

const defaultTheme = createTheme();

const AuthForm = ({ title, fields, signup }) => {
  const router = useRouter();
  const { formError, setFormError, authSubmit } = useAuth(signup);

  return (
    <ThemeProvider theme={defaultTheme}>
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          <Typography>{formError}</Typography>
          <Box component="form" noValidate onSubmit={authSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {fields.map((field) => (
                <Grid item xs={12} key={field.id}>
                  <TextField
                    required
                    fullWidth
                    id={field.id}
                    label={field.label}
                    name={field.name}
                    autoComplete={field.autoComplete}
                    type={field.type || "text"}
                    onFocus={() => setFormError("")}
                  />
                </Grid>
              ))}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {title}
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  href="#"
                  onClick={() => router.push(signup ? "/login" : "/register")}
                  variant="body2"
                >
                  {signup
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AuthForm;
