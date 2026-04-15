import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS } from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Colors } from '../constants/Colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

// Sample Data Array
const USERS = [
  {
    id: '1',
    name: 'Jordan Peak',
    age: 30,
    location: 'Boulder, CO',
    tags: ['hiking', 'mountaineering', 'backpacking'],
    social: '@jordanpeak',
    bio: "Chasing summits and sunrises. Let's conquer the Rockies together! 🏔",
    skill: 'Advanced',
    attitude: 'Intense',
    range: '75 mi',
    image: 'https://images.unsplash.com/photo-1551632432-c735e829929d?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Skylar Trail',
    age: 27,
    location: 'Asheville, NC',
    tags: ['cycling', 'camping', 'travel'],
    social: '@sky_trails',
    bio: "Looking for someone to explore the Blue Ridge Parkway with. Coffee & campfires! ☕️",
    skill: 'Intermediate',
    attitude: 'Relaxed',
    range: '30 mi',
    image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Casey River',
    age: 32,
    location: 'Portland, OR',
    tags: ['kayaking', 'surfing', 'fishing'],
    social: '@casey_h2o',
    bio: "If there is water, I'm there. Seeking a partner for a multi-day river trip.",
    skill: 'Expert',
    attitude: 'Moderate',
    range: '120 mi',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1000&auto=format&fit=crop'
  }
];

export default function DiscoverScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  
  // State to track which user we are looking at
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);

  const currentUser = USERS[currentIndex % USERS.length]; // Loops back for demo

  const onSwipeComplete = (direction: 'left' | 'right') => {
    console.log(`Swiped ${direction} on ${currentUser.name}`);
    // Increment the counter/index
    setCurrentIndex((prev) => prev + 1);
    // Reset card position instantly
    translateX.value = 0;
  };

  const gesture = Gesture.Pan()
    .onUpdate((event) => { translateX.value = event.translationX; })
    .onEnd((event) => {
      if (event.translationX > SWIPE_THRESHOLD) {
        translateX.value = withTiming(SCREEN_WIDTH * 1.5, {}, () => runOnJS(onSwipeComplete)('right'));
      } else if (event.translationX < -SWIPE_THRESHOLD) {
        translateX.value = withTiming(-SCREEN_WIDTH * 1.5, {}, () => runOnJS(onSwipeComplete)('left'));
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotate: `${(translateX.value / SCREEN_WIDTH) * 10}deg` }
    ],
  }));

  const forceSwipe = (direction: 'left' | 'right') => {
    const dest = direction === 'right' ? SCREEN_WIDTH * 1.5 : -SCREEN_WIDTH * 1.5;
    translateX.value = withTiming(dest, { duration: 400 }, () => runOnJS(onSwipeComplete)(direction));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.card, animatedStyle]}>
          <ImageBackground 
            source={{ uri: currentUser.image }} 
            style={styles.imageBackground}
            imageStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
          >
            <View style={styles.cardOverlay}>
              <Text style={styles.nameText}>{currentUser.name}, {currentUser.age}</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location" size={14} color="#fff" />
                <Text style={styles.locationText}>{currentUser.location}</Text>
              </View>
              <View style={styles.tagRow}>
                {currentUser.tags.map(tag => (
                  <View key={tag} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>
                ))}
              </View>
              <Text style={styles.socialText}>📸 {currentUser.social}</Text>
            </View>
          </ImageBackground>

          <View style={styles.detailsSection}>
            <Text style={styles.bioText}>{currentUser.bio}</Text>
            
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Skill Level</Text>
                <Text style={styles.statValue}>{currentUser.skill}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Attitude</Text>
                <Text style={styles.statValue}>{currentUser.attitude}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Max Range</Text>
                <Text style={styles.statValue}>{currentUser.range}</Text>
              </View>
            </View>

            <View style={styles.gallery}>
              <View style={styles.thumb} />
              <View style={styles.thumb} />
            </View>
          </View>
        </Animated.View>
      </GestureDetector>

      <View style={styles.actions}>
        <TouchableOpacity style={[styles.circleBtn, styles.closeBtn]} onPress={() => forceSwipe('left')}>
          <Ionicons name="close" size={32} color="#ff4d4d" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.circleBtn, styles.heartBtn]} onPress={() => forceSwipe('right')}>
          <Ionicons name="heart" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
      
      {/* Dynamic Counter */}
      <Text style={styles.counter}>{currentIndex + 1} / {USERS.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 60 },
  card: { width: '90%', height: '72%', borderRadius: 20, backgroundColor: '#fff', elevation: 5, shadowOpacity: 0.1, shadowRadius: 10 },
  imageBackground: { flex: 1.5, justifyContent: 'flex-end' },
  cardOverlay: { padding: 20, backgroundColor: 'rgba(0,0,0,0.3)' },
  nameText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  locationText: { color: '#fff', marginLeft: 4, fontSize: 14 },
  tagRow: { flexDirection: 'row', gap: 6, marginTop: 10 },
  tag: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, borderWidth: 1, borderColor: '#fff' },
  tagText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  socialText: { color: '#fff', marginTop: 8, fontSize: 12 },
  detailsSection: { flex: 1, padding: 20 },
  bioText: { color: '#444', fontSize: 14, lineHeight: 20, marginBottom: 15 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  statItem: { alignItems: 'center' },
  statLabel: { fontSize: 11, color: '#888' },
  statValue: { fontSize: 14, fontWeight: '600', marginTop: 2 },
  gallery: { flexDirection: 'row', gap: 10 },
  thumb: { width: 80, height: 60, borderRadius: 10, backgroundColor: '#eee' },
  actions: { flexDirection: 'row', gap: 20, marginTop: 25 },
  circleBtn: { width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', elevation: 4 },
  closeBtn: { borderWidth: 1, borderColor: '#ff4d4d' },
  heartBtn: { backgroundColor: '#00a86b' },
  counter: { marginTop: 15, color: '#888', fontSize: 14, fontWeight: '600' }
});