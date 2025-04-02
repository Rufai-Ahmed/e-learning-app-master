import React, { useState } from "react";
import { View, Platform, StyleSheet, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";

const tawkToHTML = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tawk.to Chat</title>
    <style>
      body, html {
        margin: 0;
        padding: 0;
        height: 100%;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <script type="text/javascript">
      (function(global){
        global.$_Tawk_AccountKey='679a8c543a8427326076f3df';
        global.$_Tawk_WidgetId='1iipr8avd';
        global.$_Tawk_Unstable=false;
        global.$_Tawk = global.$_Tawk || {};
        (function (w){
          function l() {
            if (window.$_Tawk.init !== undefined) {
              return;
            }
            window.$_Tawk.init = true;
            var files = [
              'https://embed.tawk.to/_s/v4/app/67e61092c05/js/twk-main.js',
              'https://embed.tawk.to/_s/v4/app/67e61092c05/js/twk-vendor.js',
              'https://embed.tawk.to/_s/v4/app/67e61092c05/js/twk-chunk-vendors.js',
              'https://embed.tawk.to/_s/v4/app/67e61092c05/js/twk-chunk-common.js',
              'https://embed.tawk.to/_s/v4/app/67e61092c05/js/twk-runtime.js',
              'https://embed.tawk.to/_s/v4/app/67e61092c05/js/twk-app.js'
            ];
            if (typeof Promise === 'undefined') {
              files.unshift('https://embed.tawk.to/_s/v4/app/67e61092c05/js/twk-promise-polyfill.js');
            }
            if (typeof Symbol === 'undefined' || typeof Symbol.iterator === 'undefined') {
              files.unshift('https://embed.tawk.to/_s/v4/app/67e61092c05/js/twk-iterator-polyfill.js');
            }
            if (typeof Object.entries === 'undefined') {
              files.unshift('https://embed.tawk.to/_s/v4/app/67e61092c05/js/twk-entries-polyfill.js');
            }
            if (!window.crypto) {
              window.crypto = window.msCrypto;
            }
            if (typeof Event !== 'function') {
              files.unshift('https://embed.tawk.to/_s/v4/app/67e61092c05/js/twk-event-polyfill.js');
            }
            if (!Object.values) {
              files.unshift('https://embed.tawk.to/_s/v4/app/67e61092c05/js/twk-object-values-polyfill.js');
            }
            if (typeof Array.prototype.find === 'undefined') {
              files.unshift('https://embed.tawk.to/_s/v4/app/67e61092c05/js/twk-arr-find-polyfill.js');
            }
            var s0 = document.getElementsByTagName('script')[0];
            for (var i = 0; i < files?.length; i++) {
              var s1 = document.createElement('script');
              s1.src = files[i];
              s1.charset = 'UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1, s0);
            }
          }
          if (document.readyState === 'complete') {
            l();
          } else if (w.attachEvent) {
            w.attachEvent('onload', l);
          } else {
            w.addEventListener('load', l, false);
          }
        })(window);
      })(window);
    </script>
  </body>
</html>
`;

const TawkToChat = () => {
  const [isLoading, setIsLoading] = useState(true);

  if (Platform.OS === "web") {
    return (
      <iframe srcDoc={tawkToHTML} style={styles.iframe} title="Tawk.to Chat" />
    );
  } else {
    return (
      <View style={styles.container}>
        <WebView
          originWhitelist={["*"]}
          source={{ html: tawkToHTML, baseUrl: "https://embed.tawk.to" }}
          javaScriptEnabled
          domStorageEnabled
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn("WebView error: ", nativeEvent);
          }}
          style={styles.webview}
        />
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}
      </View>
    );
  }
};

const colors = {
  primary: "#4169E1",
  background: "#FFFFFF",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  webview: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  iframe: {
    width: "100%",
    height: "100%",
    borderColor: "transparent",
    backgroundColor: colors.background,
  },
});

export default TawkToChat;
