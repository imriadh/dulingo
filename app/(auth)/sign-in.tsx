import { AuthScreen } from "../../components/auth/AuthScreen";

export default function SignInScreen() {
  return (
    <AuthScreen
      flow="sign-in"
      title="Welcome back"
      subtitle="Continue your language journey today ✨"
      primaryLabel="Sign In"
      footerPrefix="Need an account?"
      footerActionLabel="Sign up"
      footerActionHref="/sign-up"
    />
  );
}
