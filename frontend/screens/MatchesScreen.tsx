import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';

const MATCHES = [
  {
    id: '1',
    name: 'Jordan Peak',
    age: 30,
    location: 'Boulder, CO',
    tags: ['hiking', 'mountaineering', 'backpacking'],
    lastMsg: 'Hey! Ready for that hike this weekend?',
    time: 'Matched 28 days ago',
    unread: 2,
    avatar: 'https://images.unsplash.com/photo-1551632432-c735e829929d?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Maya Waters',
    age: 26,
    location: 'Fort Collins, CO',
    tags: ['kayaking', 'camping', 'hiking'],
    lastMsg: 'Found an amazing kayaking spot!',
    time: 'Matched 29 days ago',
    unread: 0,
    avatar: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Riley Stone',
    age: 27,
    location: 'Golden, CO',
    tags: ['rock-climbing', 'hiking', 'camping'],
    lastMsg: "Let's climb next Saturday!",
    time: 'Matched about 1 month ago',
    unread: 1,
    avatar: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=200&auto=format&fit=crop'
  }
];

export default function MatchesScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const renderItem = ({ item }: { item: typeof MATCHES[0] }) => (
    <TouchableOpacity 
      style={[styles.matchCard, { backgroundColor: '#fff', borderColor: theme.border }]}
      onPress={() => router.push({ pathname: '/modal', params: { name: item.name } })}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      
      <View style={styles.info}>
        <View style={styles.headerRow}>
          <Text style={styles.nameText}>{item.name}, {item.age}</Text>
          {item.unread > 0 && (
            <View style={[styles.badge, { backgroundColor: theme.tint }]}>
              <Text style={styles.badgeText}>{item.unread}</Text>
            </View>
          )}
        </View>

        <Text style={styles.locationText}>📍 {item.location}</Text>

        <View style={styles.tagRow}>
          {item.tags.map(tag => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        <View style={styles.msgRow}>
          <Text style={styles.msgIcon}>💬</Text>
          <Text style={styles.lastMsg} numberOfLines={1}>{item.lastMsg}</Text>
        </View>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: '#f8f9fa' }]}>
      <Text style={styles.title}>Your Matches</Text>
      <FlatList
        data={MATCHES}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60 },
  title: { fontSize: 24, fontWeight: 'bold', marginHorizontal: 20, marginBottom: 20 },
  list: { paddingHorizontal: 20, paddingBottom: 40 },
  matchCard: { flexDirection: 'row', padding: 15, borderRadius: 15, borderWidth: 1, marginBottom: 15, elevation: 2 },
  avatar: { width: 80, height: 80, borderRadius: 40 },
  info: { flex: 1, marginLeft: 15 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  nameText: { fontSize: 18, fontWeight: '700' },
  badge: { width: 22, height: 22, borderRadius: 11, justifyContent: 'center', alignItems: 'center' },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  locationText: { color: '#888', fontSize: 13, marginTop: 2 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginTop: 8 },
  tag: { backgroundColor: '#f0f0f0', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  tagText: { fontSize: 10, color: '#555', fontWeight: '600' },
  msgRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  msgIcon: { fontSize: 14, marginRight: 5 },
  lastMsg: { fontSize: 14, color: '#444', flex: 1 },
  timeText: { fontSize: 11, color: '#aaa', marginTop: 4 }
});