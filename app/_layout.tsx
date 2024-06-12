import { AuthProvider, useAuth } from "./context/AuthContext";
import { useFonts } from "expo-font";
import Login from "./login";
import { Stack } from "expo-router";

export default function _layout() {
  const [fontsLoaded] = useFonts({
    InterRegular: require("./../assets/fonts/Inter-Regular.ttf"),
    InterMedium: require("./../assets/fonts/Inter-Medium.ttf"),
    InterSemiBold: require("./../assets/fonts/Inter-SemiBold.ttf"),
    InterBold: require("./../assets/fonts/Inter-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}

export const Layout = () => {
  const { authState } = useAuth();
  return authState?.authenticated ? (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  ) : (
    <Login />
  );
};
