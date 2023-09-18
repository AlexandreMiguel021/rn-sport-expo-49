import { StyleSheet } from "react-native";

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
  pressable: {
    maxWidth: 170,
    alignSelf: "flex-end",
  },
  pressable_text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#d13a18",
  },
});
