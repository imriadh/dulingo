import { AuthScreen } from "../../components/auth/AuthScreen";

export default function SignUpScreen() {
  return (
    <AuthScreen
      flow="sign-up"
      title="Create your account"
      subtitle="Start your language journey today ✨"
      primaryLabel="Sign Up"
      footerPrefix="Already have an account?"
      footerActionLabel="Log in"
      footerActionHref="/sign-in"
    />
  );
}
