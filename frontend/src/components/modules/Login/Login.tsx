import React, { useRef } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { type LoginRequest } from "types/requests";
import useToast from "hooks/useToast";
import { useAuth } from "context/AuthContext";
import { type LocationState } from "types/global";
import {
  FormContainer,
  PasswordElement,
  TextFieldElement,
  useForm
} from "react-hook-form-mui";
import routePaths from "routes/route-paths";
import Link from "@mui/material/Link";
import { useTranslation } from "react-i18next";
import useMediaQuery from "@mui/material/useMediaQuery";

interface LoginFormData {
  email: string;
  password: string;
}

const defaultValues: LoginFormData = {
  email: "",
  password: ""
};

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation() as LocationState;
  const showToast = useToast();
  const { isAuthenticated, login } = useAuth();
  const { homeRoute } = routePaths;
  const from = location.state?.from?.pathname ?? homeRoute;
  const { t } = useTranslation();
  const isFirstRender = useRef(true);
  const mobile = useMediaQuery("(max-width:600px)");

  /* Checks if the user
   * was redirected due to being unauthenticated */
  React.useEffect(() => {
    // Only runs on the initial render since the toast renders twice otherwise
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (!isAuthenticated && from !== homeRoute) {
        showToast(t("messages.unauthenticated_warning"), "warning");
      }
    }
  }, [from, isAuthenticated]);

  const formContext = useForm<LoginFormData>({
    defaultValues,
    mode: "onBlur"
  });

  const onSubmit = async (data: LoginFormData): Promise<void> => {
    try {
      await login(data as LoginRequest);
      navigate(from, { replace: true });
    } catch (error) {
      showToast(error, "error");
    }
  };

  return (
    <Grid container display="flex" justifyContent="center">
      <Box
        sx={{
          padding: "1em",
          width: "500px"
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          fontWeight="bold"
          alignSelf="start"
        >
          {t("titles.login")}
        </Typography>

        <FormContainer
          defaultValues={defaultValues}
          formContext={formContext}
          onSuccess={onSubmit}
        >
          <TextFieldElement
            required
            name="email"
            label={t("user_info_labels.email_address")}
            type="text"
            fullWidth
            margin="normal"
            validation={{
              required: t("login_form.required_text")
            }}
          />

          <PasswordElement
            required
            name="password"
            label={t("user_info_labels.password_label")}
            fullWidth
            margin="normal"
            validation={{
              required: t("login_form.required_text")
            }}
          />

          <Box margin="auto" width="200px">
            <Button
              type="submit"
              id="btn-login"
              variant="contained"
              color="primary"
              className="login-button"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              {t("buttons.login_button")}
            </Button>
          </Box>
        </FormContainer>

        {/* With mobile device, the items stack, 
          with desktop they are next to each other */}
        <Grid container gap="10px">
          {mobile ? (
            <Grid item xs={12}>
              <Typography variant="body2" align="center">
                <Link component={RouterLink} to={routePaths.passwordReset}>
                  {t("login_form.forgot_password")}
                </Link>
              </Typography>
            </Grid>
          ) : (
            <Grid item xs>
              <Typography variant="body2" align="center">
                <Link component={RouterLink} to={routePaths.passwordReset}>
                  {t("login_form.forgot_password")}
                </Link>
              </Typography>
            </Grid>
          )}
          {mobile ? (
            <Grid item xs={12}>
              <Typography variant="body2" align="center">
                <Link component={RouterLink} to={routePaths.register}>
                  {t("login_form.sign_up")}
                </Link>
              </Typography>
            </Grid>
          ) : (
            <Grid item>
              <Typography variant="body2">
                <Link component={RouterLink} to={routePaths.register}>
                  {t("login_form.sign_up")}
                </Link>
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Grid>
  );
};

export default LoginForm;
