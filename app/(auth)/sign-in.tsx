import { AuthScreen } from "../../components/auth/AuthScreen";

export default function SignInScreen() {
  return (
    <AuthScreen
      title="Welcome back"
      subtitle="Continue your language journey today ✨"
      primaryLabel="Sign In"
      footerPrefix="Need an account?"
      footerActionLabel="Sign up"
      footerActionHref="/sign-up"
      showPasswordField={false}
    />
  );
}
