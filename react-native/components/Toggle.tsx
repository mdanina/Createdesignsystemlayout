/**
 * Toggle Component - React Native
 * Портировано из web версии
 */

import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { colors, spacing, textStyles } from '../theme';

export interface ToggleProps {
  /** Enabled состояние */
  enabled: boolean;
  /** Callback при изменении */
  onChange: (enabled: boolean) => void;
  /** Label текст */
  label?: string;
  /** Disabled состояние */
  disabled?: boolean;
  /** Дополнительные стили */
  style?: ViewStyle;
}

const TRACK_WIDTH = 52;
const TRACK_HEIGHT = 32;
const THUMB_SIZE = 28;

export const Toggle: React.FC<ToggleProps> = ({
  enabled,
  onChange,
  label,
  disabled = false,
  style,
}) => {
  const thumbPosition = useSharedValue(enabled ? 1 : 0);

  React.useEffect(() => {
    thumbPosition.value = withSpring(enabled ? 1 : 0);
  }, [enabled]);

  const thumbStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: thumbPosition.value * (TRACK_WIDTH - THUMB_SIZE - 4),
        },
      ],
    };
  });

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        onPress={() => !disabled && onChange(!enabled)}
        activeOpacity={0.7}
        disabled={disabled}
      >
        <View
          style={[
            styles.track,
            enabled && styles.trackEnabled,
            disabled && styles.disabled,
          ]}
        >
          <Animated.View style={[styles.thumb, thumbStyle]} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    ...textStyles.body,
    color: colors.text.primary,
    marginRight: spacing[3],
  },
  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    backgroundColor: colors.neutral[300],
    padding: 2,
    justifyContent: 'center',
  },
  trackEnabled: {
    backgroundColor: colors.component.buttonPrimary,
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: colors.ui.background,
  },
  disabled: {
    opacity: 0.5,
  },
});
