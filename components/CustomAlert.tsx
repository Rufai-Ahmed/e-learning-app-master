import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export type AlertType = 'success' | 'error' | 'info';

interface AlertProps {
  visible: boolean;
  type: AlertType;
  message: string;
  onDismiss: () => void;
  duration?: number;
}

export const CustomAlert: React.FC<AlertProps> = ({
  visible,
  type,
  message,
  onDismiss,
  duration = 3000,
}) => {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const dismissTimer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (visible) {
      // Clear any existing timer
      if (dismissTimer.current) {
        clearTimeout(dismissTimer.current);
      }

      // Show animation
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 80,
          friction: 10,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // Set auto-dismiss timer
      dismissTimer.current = setTimeout(() => {
        hideAlert();
      }, duration);
    }

    return () => {
      if (dismissTimer.current) {
        clearTimeout(dismissTimer.current);
      }
    };
  }, [visible, duration]);

  const hideAlert = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss();
    });
  };

  const getAlertStyle = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: '#4ADE80',
          icon: <CheckCircle2 size={24} color="#fff" strokeWidth={2.5} />,
        };
      case 'error':
        return {
          backgroundColor: '#FF4B4B',
          icon: <AlertCircle size={24} color="#fff" strokeWidth={2.5} />,
        };
      case 'info':
        return {
          backgroundColor: '#0EA5E9',
          icon: <Info size={24} color="#fff" strokeWidth={2.5} />,
        };
    }
  };

  if (!visible) return null;

  const alertStyle = getAlertStyle();

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          opacity,
          backgroundColor: alertStyle.backgroundColor,
        },
      ]}
    >
      <View style={styles.content}>
        {alertStyle.icon}
        <Text style={styles.message} numberOfLines={2}>
          {message}
        </Text>
      </View>
      <TouchableOpacity
        onPress={hideAlert}
        style={styles.closeButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <X size={20} color="#fff" strokeWidth={2.5} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 16,
    right: 16,
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  message: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'PopMid',
    flex: 1,
    marginRight: 8,
  },
  closeButton: {
    padding: 4,
  },
}); 