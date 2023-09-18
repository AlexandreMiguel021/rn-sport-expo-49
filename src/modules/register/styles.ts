import {
  StyleSheet
} from "react-native";

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    gap: 16,
    justifyContent: "center",
    marginHorizontal: "auto",
  },
  description: {
    fontSize: 20,
    fontWeight: "400",
    marginBottom: 12,
  },
  inputext: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: "#dad9d9",
    fontSize: 18,
    borderRadius: 6,
  },
  button: {
    backgroundColor: "#DE6449",
    padding: 12,
    borderRadius: 6,
  },
  button_text: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  success_text: {
    backgroundColor: "#c6f5a094",
    fontWeight: "600",
    color: "#158a11",
    padding: 8,
    borderRadius: 6,
    fontSize: 16,
  },
  error_text: {
    backgroundColor: "#f3b1ae93",
    fontWeight: "600",
    color: "#b92815",
    padding: 8,
    borderRadius: 6,
    fontSize: 16,
  },
});
