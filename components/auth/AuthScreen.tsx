import { useSignIn, useSignUp } from "@clerk/expo";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { Link, useRouter, type Href } from "expo-router";
import { useState, type ReactNode } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants/images";
import { VerificationModal } from "./VerificationModal";

type AuthScreenProps = {
  flow: "sign-in" | "sign-up";
  title: string;
  subtitle: string;
  primaryLabel: string;
  footerPrefix: string;
  footerActionLabel: string;
  footerActionHref: Href;
};

function SocialButton({
  label,
  icon,
  onPress,
  disabled,
}: {
  label: string;
  icon: ReactNode;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <TouchableOpacity
      className="flex-row items-center rounded-[18px] border border-[#E5E7EB] bg-white px-5 py-4"
      activeOpacity={0.85}
      disabled={disabled}
      onPress={onPress}
    >
      <View className="w-8 items-center justify-center">{icon}</View>
      <Text className="flex-1 text-center text-[17px] font-medium text-[#0D132B]">
        {label}
      </Text>
      <View className="w-8" />
    </TouchableOpacity>
  );
}

export function AuthScreen({
  flow,
  title,
  subtitle,
  primaryLabel,
  footerPrefix,
  footerActionLabel,
  footerActionHref,
}: AuthScreenProps) {
  const router = useRouter();
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [verificationVisible, setVerificationVisible] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isSignUp = flow === "sign-up";
  const showPasswordField = isSignUp;

  const getErrorMessage = (error: unknown) => {
    if (typeof error === "string") {
      return error;
    }

    if (error && typeof error === "object") {
      const clerkError = error as {
        message?: string;
        errors?: { longMessage?: string; message?: string }[];
      };

      const firstError = clerkError.errors?.[0];
      return (
        firstError?.longMessage ??
        firstError?.message ??
        clerkError.message ??
        "Something went wrong."
      );
    }

    return "Something went wrong.";
  };

  const openVerification = () => {
    setErrorMessage(null);
    setVerificationCode("");
    setVerificationVisible(true);
  };

  const closeVerification = () => {
    if (isBusy) {
      return;
    }

    setVerificationVisible(false);
    setVerificationCode("");
  };

  const completeSession = async (
    finalize: () => Promise<{ error: { message?: string } | null }>,
  ) => {
    const { error } = await finalize();
    if (error) {
      throw error;
    }
    router.replace("/");
  };

  const handlePrimaryPress = async () => {
    if (!signIn || !signUp || isBusy) {
      return;
    }

    setIsBusy(true);
    setErrorMessage(null);

    try {
      const emailAddress = email.trim();

      if (isSignUp) {
        const { error } = await signUp.password({
          emailAddress,
          password,
        });

        if (error) {
          throw error;
        }

        await signUp.verifications.sendEmailCode();
        openVerification();
        return;
      }

      await signIn.create({ identifier: emailAddress });

      const { error } = await signIn.emailCode.sendCode({
        emailAddress,
      });

      if (error) {
        throw error;
      }

      openVerification();
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsBusy(false);
    }
  };

  const handleVerificationSubmit = async (code: string) => {
    if (!signIn || !signUp || isBusy) {
      return;
    }

    setIsBusy(true);
    setErrorMessage(null);

    try {
      if (isSignUp) {
        const { error } = await signUp.verifications.verifyEmailCode({ code });
        if (error) {
          throw error;
        }

        if (signUp.status === "complete") {
          await completeSession(() => signUp.finalize());
        }
        return;
      }

      const { error } = await signIn.emailCode.verifyCode({ code });

      if (error) {
        throw error;
      }

      if (signIn.status === "complete") {
        await completeSession(() => signIn.finalize());
      }
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsBusy(false);
    }
  };

  const handleSocialAuth = async (
    strategy: "oauth_google" | "oauth_facebook" | "oauth_apple",
  ) => {
    setErrorMessage(
      `Social ${strategy.replace("oauth_", "")} sign-in needs a development build with native modules. Use email sign-in for now.`,
    );
  };

  if (!signIn || !signUp) {
    return <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }} />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView
        className="flex-1"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 px-6 pb-7 pt-4">
          <TouchableOpacity
            className="h-11 w-11 items-start justify-center"
            activeOpacity={0.8}
            onPress={() => router.back()}
          >
            <Feather name="chevron-left" size={32} color="#0D132B" />
          </TouchableOpacity>

          <View className="mt-5">
            <Text className="text-[32px] font-bold tracking-[-0.5px] text-[#0D132B]">
              {title}
            </Text>
            <Text className="mt-3 text-[16px] leading-6 text-[#6B7280]">
              {subtitle}
            </Text>
          </View>

          <View className="mt-6 items-center">
            <View className="relative h-[190px] w-full max-w-[360px] items-center justify-end">
              <Image
                source={images.mascotAuth}
                resizeMode="contain"
                style={{ width: 250, height: 170 }}
              />
              <Text className="absolute left-10 top-9 text-[20px] text-[#FF9F1C]">
                ✦
              </Text>
              <Text className="absolute right-16 top-11 text-[18px] text-[#67A8FF]">
                ✦
              </Text>
              <Text className="absolute right-12 top-24 text-[16px] text-[#FFD35C]">
                ✦
              </Text>
            </View>
          </View>

          <View className="mt-2 space-y-4">
            <View className="rounded-[22px] border border-[#E5E7EB] bg-white px-5 py-[18px]">
              <Text className="text-[13px] font-medium text-[#6B7280]">
                Email
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                className="mt-3 text-[18px] font-medium text-[#0D132B]"
                placeholder="alex@gmail.com"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {showPasswordField ? (
              <View className="rounded-[22px] border border-[#E5E7EB] bg-white px-5 py-[18px]">
                <Text className="text-[13px] font-medium text-[#6B7280]">
                  Password
                </Text>
                <View className="mt-3 flex-row items-center">
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!passwordVisible}
                    autoCapitalize="none"
                    autoCorrect={false}
                    className="flex-1 text-[18px] font-medium text-[#0D132B]"
                    placeholder="••••••••"
                    placeholderTextColor="#9CA3AF"
                  />
                  <TouchableOpacity
                    className="ml-3 h-10 w-10 items-center justify-center"
                    activeOpacity={0.75}
                    onPress={() => setPasswordVisible((current) => !current)}
                  >
                    <Feather
                      name={passwordVisible ? "eye-off" : "eye"}
                      size={22}
                      color="#7C8294"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}

            <TouchableOpacity
              className="mt-2 h-[80px] items-center justify-center rounded-[24px] bg-[#6C4EF5]"
              activeOpacity={0.9}
              disabled={isBusy}
              onPress={handlePrimaryPress}
            >
              <Text className="text-[20px] font-semibold text-white">
                {primaryLabel}
              </Text>
            </TouchableOpacity>

            {errorMessage ? (
              <Text className="px-1 text-[14px] text-[#E11D48]">
                {errorMessage}
              </Text>
            ) : null}

            <View className="mt-4 flex-row items-center">
              <View className="h-px flex-1 bg-[#E5E7EB]" />
              <Text className="px-3 text-[15px] text-[#6B7280]">
                or continue with
              </Text>
              <View className="h-px flex-1 bg-[#E5E7EB]" />
            </View>

            <View className="mt-3 space-y-3">
              <SocialButton
                label="Continue with Google"
                icon={<FontAwesome name="google" size={22} color="#EA4335" />}
                disabled={isBusy}
                onPress={() => handleSocialAuth("oauth_google")}
              />
              <SocialButton
                label="Continue with Facebook"
                icon={<FontAwesome name="facebook" size={24} color="#1877F2" />}
                disabled={isBusy}
                onPress={() => handleSocialAuth("oauth_facebook")}
              />
              <SocialButton
                label="Continue with Apple"
                icon={<FontAwesome name="apple" size={24} color="#0D132B" />}
                disabled={isBusy}
                onPress={() => handleSocialAuth("oauth_apple")}
              />
            </View>
          </View>

          <View className="mt-auto items-center pt-8">
            <View className="flex-row flex-wrap items-center justify-center">
              <Text className="text-[15px] text-[#6B7280]">
                {footerPrefix}{" "}
              </Text>
              <Link href={footerActionHref} asChild>
                <Text className="text-[15px] font-semibold text-[#6C4EF5]">
                  {footerActionLabel}
                </Text>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>

      <VerificationModal
        visible={verificationVisible}
        code={verificationCode}
        errorMessage={errorMessage}
        isSubmitting={isBusy}
        onClose={closeVerification}
        onCodeChange={setVerificationCode}
        onSubmit={handleVerificationSubmit}
      />

      {isSignUp ? (
        <View nativeID="clerk-captcha" style={{ height: 0, width: 0 }} />
      ) : null}
    </SafeAreaView>
  );
}
