import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface TextFieldProps extends TextInputProps {
  label?: string;
  error?: string;
}

const TextField: React.FC<TextFieldProps> = ({ label, error, ...props }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholderTextColor="#aaa"
        {...props}
        accessible
        accessibilityLabel={label}
        accessibilityHint="Enter the required information"
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#fefbf9",
    marginBottom: 6,
  },
  input: {
    padding: 14,
    borderRadius: 8,
    borderColor: "#aaa",
    borderWidth: 1,
    fontSize: 16,
    color: "#fefbf9",
  },
  inputError: {
    borderColor: "#ff4c4c",
    borderWidth: 1,
  },
  errorText: {
    color: "#ff4c4c",
    marginTop: 4,
    fontSize: 12,
  },
});

export default TextField;
