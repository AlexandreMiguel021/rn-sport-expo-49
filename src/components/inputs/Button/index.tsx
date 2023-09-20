import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { styles } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  isLoading?: boolean;
  title: string;
}

export function Button({ isLoading, title, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity disabled={isLoading} style={[styles.button]} {...rest}>
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={styles.button_text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
