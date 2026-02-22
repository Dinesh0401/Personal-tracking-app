import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { palette } from '@/theme/palette';

type Evaluation = {
  clarity_score: number;
  filler_count: number;
  grammar_feedback: string;
  suggestion: string;
};

export function CommunicationLabScreen() {
  const [transcript, setTranscript] = useState('');
  const [result, setResult] = useState<Evaluation | null>(null);

  const mockEvaluate = () => {
    const fillerCount = (transcript.match(/\b(um|uh|like|you know)\b/gi) || []).length;
    setResult({
      clarity_score: Math.max(40, 100 - fillerCount * 8),
      filler_count: fillerCount,
      grammar_feedback: transcript.length > 120 ? 'Sentence length is good. Keep structure tighter.' : 'Expand with clearer STAR structure.',
      suggestion: 'Use Situation-Task-Action-Result and quantify your impact in one line.'
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Communication Lab</Text>
      <TextInput
        placeholder="Paste transcript from voice capture"
        placeholderTextColor={palette.muted}
        style={styles.input}
        multiline
        value={transcript}
        onChangeText={setTranscript}
      />
      <Pressable style={styles.button} onPress={mockEvaluate}><Text style={styles.buttonText}>Evaluate Answer</Text></Pressable>
      {result && (
        <View style={styles.card}>
          <Text style={styles.row}>Clarity: {result.clarity_score}/100</Text>
          <Text style={styles.row}>Filler words: {result.filler_count}</Text>
          <Text style={styles.row}>Grammar: {result.grammar_feedback}</Text>
          <Text style={styles.row}>Suggestion: {result.suggestion}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.bg, padding: 16, gap: 12 },
  header: { color: palette.text, fontSize: 24, fontWeight: '800' },
  input: { minHeight: 180, borderRadius: 12, borderColor: palette.border, borderWidth: 1, backgroundColor: palette.card, color: palette.text, padding: 12, textAlignVertical: 'top' },
  button: { backgroundColor: palette.primary, paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#051620', fontWeight: '800' },
  card: { backgroundColor: palette.card, borderRadius: 12, borderWidth: 1, borderColor: palette.border, padding: 12, gap: 6 },
  row: { color: palette.text }
});
