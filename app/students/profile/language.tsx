import { router } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const LanguageSelectionScreen = () => {
  const changeLanguage = (lang: string) => {
    // (I18n as any).locale = lang;

    router.back();
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>{(I18n as any).t("selectLanguage")}</Text> */}
      <Text style={styles.title}>{"Select language"}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => changeLanguage("en")}
      >
        {/* <Text style={styles.buttonText}>{(I18n as any).t("english")}</Text> */}
        <Text style={styles.buttonText}>{"English"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => changeLanguage("fr")}
      >
        {/* <Text style={styles.buttonText}>{(I18n as any).t("french")}</Text> */}
        <Text style={styles.buttonText}>{"French"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#1976d2",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default LanguageSelectionScreen;
