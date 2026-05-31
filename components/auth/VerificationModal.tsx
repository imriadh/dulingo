import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";

type VerificationModalProps = {
  visible: boolean;
  onClose: () => void;
  code: string;
  onCodeChange: (code: string) => void;
  onSubmit: (code: string) => void;
  errorMessage: string | null;
  isSubmitting: boolean;
};

export function VerificationModal({
  visible,
  onClose,
  code,
  onCodeChange,
  onSubmit,
  errorMessage,
  isSubmitting,
}: VerificationModalProps) {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [visible]);

  const handleChangeText = (value: string) => {
    const nextCode = value.replace(/\D/g, "").slice(0, 6);
    onCodeChange(nextCode);

    if (nextCode.length === 6 && !isSubmitting) {
      Keyboard.dismiss();
      onSubmit(nextCode);
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Pressable
          className="flex-1 items-center justify-center px-6"
          style={{ backgroundColor: "rgba(13, 19, 43, 0.35)" }}
          onPress={onClose}
        >
          <Pressable
            className="w-full max-w-[420px] rounded-[32px] bg-white px-6 py-8"
            style={{
              shadowColor: "#0D132B",
              shadowOpacity: 0.14,
              shadowRadius: 24,
              shadowOffset: { width: 0, height: 12 },
              elevation: 8,
            }}
            onPress={(event) => event.stopPropagation()}
          >
            <View className="items-center">
              <View className="h-14 w-14 items-center justify-center rounded-2xl bg-[#F3F0FF]">
                <MaterialCommunityIcons
                  name="email-outline"
                  size={28}
                  color="#6C4EF5"
                />
              </View>
              <Text className="mt-4 text-[26px] font-bold text-[#0D132B]">
                Check your email
              </Text>
              <Text className="mt-3 text-center text-[15px] leading-6 text-[#6B7280]">
                We sent a 6-digit verification code to your email. Enter it to
                continue.
              </Text>
            </View>

            <Pressable
              className="mt-7 flex-row justify-between gap-2"
              onPress={() => inputRef.current?.focus()}
            >
              {Array.from({ length: 6 }).map((_, index) => {
                const digit = code[index];
                const active = index === code.length && code.length < 6;

                return (
                  <View
                    key={index}
                    className={`h-14 flex-1 items-center justify-center rounded-2xl border ${active ? "border-[#6C4EF5] bg-[#F3F0FF]" : "border-[#E5E7EB] bg-white"}`}
                  >
                    <Text className="text-2xl font-semibold text-[#0D132B]">
                      {digit ?? ""}
                    </Text>
                  </View>
                );
              })}
            </Pressable>

            <TextInput
              ref={inputRef}
              value={code}
              onChangeText={handleChangeText}
              keyboardType="number-pad"
              maxLength={6}
              textContentType="oneTimeCode"
              autoFocus={visible}
              editable={!isSubmitting}
              caretHidden
              style={{
                position: "absolute",
                opacity: 0,
                width: 1,
                height: 1,
                left: 0,
                top: 0,
              }}
            />

            <View className="mt-6 flex-row items-center justify-center gap-2">
              <Feather name="shield" size={14} color="#6B7280" />
              <Text className="text-sm text-[#6B7280]">
                Secure verification powered by email
              </Text>
            </View>

            {errorMessage ? (
              <Text className="mt-4 text-center text-[14px] text-[#E11D48]">
                {errorMessage}
              </Text>
            ) : null}
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}
