import React from "react";
import { Button, Form, Spinner, View, Input, H6, YStack } from "tamagui";
import { useAuthStore } from "@/store/useAuth";
import { Sun, Moon, Eye, EyeOff } from "@tamagui/lucide-icons";
import { useThemeStore } from "@/store";
import { LoginSchema, loginSchema } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "@/components/CustomInput";

const Signin = () => {
  const { signIn, isSigningIn } = useAuthStore();
  const [showPassword, setShowPassword] = React.useState(false);
  const { storageTheme, setTheme } = useThemeStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleTheme = () => {
    if (storageTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const onSubmit = (data: LoginSchema) => {
    signIn(data.email, data.password);
  };

  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <Button
        alignSelf="center"
        icon={storageTheme === "dark" ? Moon : Sun}
        borderRadius="$20"
        size="$2"
        borderWidth={1}
        borderColor="$borderColor"
        position="absolute"
        top="$4"
        right="$4"
        onPress={handleTheme}
      />
      <Form
        minWidth={300}
        gap="$3"
        onSubmit={handleSubmit(onSubmit)}
        borderWidth={1}
        borderRadius="$4"
        backgroundColor="$background"
        borderColor="$borderColor"
        padding="$5"
      >
        <H6 alignSelf="center">Login</H6>
        <CustomInput
          control={control}
          errors={errors}
          name="email"
          placeholder="Email"
        />
        <CustomInput
          control={control}
          errors={errors}
          name="password"
          placeholder="Password"
          secureTextEntry={!showPassword}
          icon={showPassword ? <EyeOff size="$1" /> : <Eye size="$1" />}
          onPress={() => setShowPassword(!showPassword)}
        />
        <Form.Trigger asChild disabled={isSigningIn}>
          <Button
            icon={isSigningIn ? <Spinner /> : undefined}
            variant="outlined"
          >
            Submit
          </Button>
        </Form.Trigger>
      </Form>
    </View>
  );
};

export default Signin;
