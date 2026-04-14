import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { Colors } from '../constants/Colors';

interface ConnectedAccountProps {
  username: string;
  onDisconnect: () => void;
}

export default function ConnectedAccount({ username, onDisconnect }: ConnectedAccountProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <View style={styles.sectionWrapper}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Connected Accounts</Text>
      <View style={[styles.container, { borderColor: theme.border, backgroundColor: theme.cardBackground }]}>
        <View style={styles.leftSection}>
          <View style={styles.iconCircle}>
            <FontAwesome name="instagram" size={18} color={theme.text} />
          </View>
          <Text style={[styles.username, { color: theme.text }]}>@{username}</Text>
        </View>
        
        <TouchableOpacity onPress={onDisconnect} activeOpacity={0.7}>
          <Text style={[styles.disconnectText, { color: theme.text }]}>Disconnect</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionWrapper: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  username: {
    fontSize: 16,
    fontWeight: '500',
  },
  disconnectText: {
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.6,
  },
});