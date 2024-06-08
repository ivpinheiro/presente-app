import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
  useFonts({
    InterRegular: require("./../assets/fonts/Inter-Regular.ttf"),
    InterMedium: require("./../assets/fonts/Inter-Medium.ttf"),
    InterSemiBold: require("./../assets/fonts/Inter-SemiBold.ttf"),
    InterBold: require("./../assets/fonts/Inter-Bold.ttf"),
  });
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
