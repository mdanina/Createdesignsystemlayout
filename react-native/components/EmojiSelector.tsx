/**
 * EmojiSelector Component - React Native
 * Портировано из web версии
 */

import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, shadows, textStyles } from '../theme';

export interface EmojiOption {
  emoji: string;
  label: string;
  value: string;
}

export interface EmojiSelectorProps {
  /** Массив опций с emoji */
  options: EmojiOption[];
  /** Значение по умолчанию */
  defaultValue?: string;
  /** Callback при изменении */
  onChange?: (value: string) => void;
  /** Размер */
  size?: 'small' | 'medium' | 'large';
  /** Показывать labels */
  showLabels?: boolean;
  /** Дополнительные стили */
  style?: ViewStyle;
}

export const EmojiSelector: React.FC<EmojiSelectorProps> = ({
  options,
  defaultValue,
  onChange,
  size = 'medium',
  showLabels = true,
  style,
}) => {
  const [selected, setSelected] = useState(defaultValue || options[0]?.value);

  const handleSelect = (value: string) => {
    setSelected(value);
    onChange?.(value);
  };

  const getSize = () => {
    const sizeMap = {
      small: 40,
      medium: 48,
      large: 56,
    };
    return sizeMap[size];
  };

  const emojiSize = getSize();

  return (
    <View style={[styles.container, style]}>
      {options.map((option) => {
        const isSelected = selected === option.value;

        return (
          <TouchableOpacity
            key={option.value}
            style={styles.option}
            onPress={() => handleSelect(option.value)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.emojiContainer,
                {
                  width: emojiSize,
                  height: emojiSize,
                  borderRadius: emojiSize / 2,
                },
                isSelected ? [styles.emojiSelected, shadows.md] : styles.emojiDefault,
              ]}
            >
              <Text
                style={[
                  styles.emoji,
                  { fontSize: size === 'small' ? 20 : size === 'medium' ? 24 : 28 },
                ]}
              >
                {option.emoji}
              </Text>
            </View>

            {showLabels && (
              <Text
                style={[
                  styles.label,
                  isSelected && styles.labelSelected,
                ]}
              >
                {option.label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  option: {
    alignItems: 'center',
    gap: spacing[1],
  },
  emojiContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiDefault: {
    backgroundColor: colors.ui.background + '80',
  },
  emojiSelected: {
    backgroundColor: colors.ui.background,
    transform: [{ scale: 1.1 }],
  },
  emoji: {
    // fontSize динамический
  },
  label: {
    ...textStyles.caption,
    color: colors.text.tertiary,
    opacity: 0.6,
  },
  labelSelected: {
    color: colors.text.primary,
    opacity: 1,
    fontWeight: '600',
  },
});
