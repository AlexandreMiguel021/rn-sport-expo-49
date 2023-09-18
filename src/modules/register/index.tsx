import { router } from "expo-router";
import { useCallback, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { ZodError } from "zod";

import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

import { userSchema } from "./schema";
import { registerService } from "./service";
import { styles } from "./styles";

export default function RegisterModule() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const userCreatedSuccessfullyFeedback = useCallback(() => {
    setSuccessMessage("Conta criada com sucesso!");
    setErrorMessage("");
    setTimeout(() => {
      router.back();
    }, 500);
  }, []);

  async function handleCreateUserButtonSubmit() {
    try {
      setIsLoading(true);
      await userSchema.safeParseAsync({ email, password });
      await registerService.createUser({ email, password });
      userCreatedSuccessfullyFeedback();
    } catch (err) {
      if (err instanceof ZodError) setErrorMessage(err.issues[0].message);
      else setErrorMessage(err as string);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <View style={styles.main}>
        <Text style={styles.description}>
          Crie sua conta com email e senha para começar a utilzar o aplicativo
        </Text>
        <TextInput
          style={styles.inputext}
          placeholder="Seu email"
          textContentType="emailAddress"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.inputext}
          placeholder="Sua senha"
          textContentType="password"
          secureTextEntry
          keyboardType="number-pad"
          value={password}
          onChangeText={setPassword}
        />
        {successMessage && (
          <Text style={styles.success_text}>{successMessage}</Text>
        )}
        {errorMessage && <Text style={styles.error_text}>{errorMessage}</Text>}
        <Button
          title="Criar conta"
          isLoading={isLoading}
          onPress={handleCreateUserButtonSubmit}
        />
      </View>
    </Container>
  );
}
