import React from "react";
import { Input, YStack, SizableText, View, InputProps } from "tamagui";
import {
  Control,
  Controller,
  FieldPath,
  FieldErrors,
  FieldValues,
} from "react-hook-form";

interface CustomInputProps<T extends FieldValues> extends InputProps {
  control: Control<T>;
  errors: FieldErrors<T>;
  name: FieldPath<T>;
  placeholder: string;
  onPress?: () => void;
  icon?: React.ReactNode;
}

const CustomInput = <T extends FieldValues>({
  control,
  errors,
  name,
  placeholder,
  onPress,
  icon: Icon,
  ...props
}: CustomInputProps<T>) => {
  const error = errors[name];
  const color = React.useMemo(() => {
    return error ? "$red10" : "$borderColor";
  }, [error]);

  return (
    <YStack>
      <YStack position="relative">
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, ...field } }) => {
            return (
              <Input
                borderColor={color}
                focusStyle={{
                  borderColor: color,
                }}
                placeholder={placeholder}
                onChangeText={onChange}
                {...props}
                {...field}
              />
            );
          }}
        />
        <View
          position="absolute"
          right="$1"
          top="50%"
          padding={0}
          transform="translate(-50%, -50%)"
          onPress={onPress}
        >
          {Icon}
        </View>
      </YStack>
      {error && (
        <SizableText color="$red10" size="$1" padding="$1">
          {error.message}
        </SizableText>
      )}
    </YStack>
  );
};

export default CustomInput;
