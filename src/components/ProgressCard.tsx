import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { palette } from '@/theme/palette';

export function ProgressCard({ xp, goal = 100 }: { xp: number; goal?: number }) {
  const pct = Math.min(100, Math.round((xp / goal) * 100));
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: pct,
      duration: 500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false
    }).start();
  }, [pct, widthAnim]);

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.title}>Today XP</Text>
        <Text style={styles.value}>{xp}/{goal}</Text>
      </View>
      <View style={styles.track}>
        <Animated.View style={[styles.fill, { width: widthAnim.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) }]} />
      </View>
      <Text style={styles.caption}>{pct}% of daily goal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: palette.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: palette.border, gap: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  title: { color: palette.text, fontSize: 17, fontWeight: '700' },
  value: { color: palette.accent, fontWeight: '700' },
  track: { height: 10, borderRadius: 999, backgroundColor: '#222b3f', overflow: 'hidden' },
  fill: { height: 10, borderRadius: 999, backgroundColor: palette.primary },
  caption: { color: palette.muted, fontSize: 12 }
});
