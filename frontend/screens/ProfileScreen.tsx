import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';
import ConnectedAccount from '../components/ConnectedAccount';
import { Ionicons } from '@expo/vector-icons'; // For Log Out/Delete icons

export default function ProfileScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={{ paddingBottom: 40 }} // Extra space at bottom
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Profile</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={[styles.editBtn, { borderColor: theme.borderDark }]}>
            <Ionicons name="create-outline" size={16} color={theme.text} style={{ marginRight: 4 }} />
            <Text style={[styles.editBtnText, { color: theme.text }]}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsBtn}>
            <Ionicons name="settings-outline" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Info Card */}
      <View style={[styles.card, { borderColor: theme.border, backgroundColor: theme.cardBackground }]}>
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/150' }} 
            style={styles.profileImage} 
          />
        </View>
        
        <View style={styles.infoSection}>
          <Text style={[styles.label, { color: theme.label }]}>Name</Text>
          <Text style={[styles.value, { color: theme.text }]}>Alex Rivers, 28</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={[styles.label, { color: theme.label }]}>Location</Text>
          <Text style={[styles.value, { color: theme.text }]}>Denver, CO</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={[styles.label, { color: theme.label }]}>Bio</Text>
          <Text style={[styles.value, { color: theme.text }]}>
            Weekend warrior seeking adventure buddies for mountain trails and good vibes
          </Text>
        </View>

        <View style={styles.tagSection}>
          <Text style={[styles.label, { color: theme.label }]}>Adventures</Text>
          <View style={styles.tagContainer}>
            {['hiking', 'backpacking', 'camping'].map((tag) => (
              <View key={tag} style={[styles.tag, { backgroundColor: theme.tint }]}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Skill Level & Attitude Grid */}
        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Text style={[styles.label, { color: theme.label }]}>Skill Level</Text>
            <Text style={[styles.value, { color: theme.text }]}>Intermediate</Text>
          </View>
          <View style={styles.halfWidth}>
            <Text style={[styles.label, { color: theme.label }]}>Attitude</Text>
            <Text style={[styles.value, { color: theme.text }]}>Moderate</Text>
          </View>
        </View>
      </View>

      {/* Connected Accounts Section */}
        <ConnectedAccount 
          username="alexrivers" 
          onDisconnect={() => console.log('Disconnecting Instagram...')} 
        />

      {/* Action List */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={[styles.actionRow, { borderColor: theme.border }]}>
          <Ionicons name="log-out-outline" size={20} color={theme.text} />
          <Text style={[styles.actionText, { color: theme.text }]}>Log Out</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionRow, { borderColor: theme.border, marginTop: 10 }]}>
          <Ionicons name="trash-outline" size={20} color={theme.error} />
          <Text style={[styles.actionText, { color: theme.error }]}>Delete Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20,
    paddingTop: 60, 
    marginBottom: 20 
  },
  headerActions: {
  flexDirection: 'row',
  alignItems: 'center',
},
settingsBtn: {
  marginLeft: 15,
},
  title: { fontSize: 28, fontWeight: 'bold' },
  editBtn: { borderWidth: 1, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  editBtnText: { fontSize: 14, fontWeight: '600' },
  card: { 
    marginHorizontal: 20, 
    padding: 20, 
    borderRadius: 16, 
    borderWidth: 1,
    elevation: 2,
  },
  avatarContainer: { alignItems: 'center', marginBottom: 20 },
  profileImage: { width: 120, height: 120, borderRadius: 60 },
  infoSection: { marginBottom: 15 },
  tagSection: { marginBottom: 15 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 4 },
  value: { fontSize: 16 },
  tagContainer: { flexDirection: 'row', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  tagText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  row: { flexDirection: 'row', marginTop: 10 },
  halfWidth: { flex: 1 },
  sectionHeader: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginHorizontal: 20, 
    marginTop: 30, 
    marginBottom: 10 
  },
  actionContainer: { marginTop: 30, marginHorizontal: 20 },
  actionRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 16, 
    borderRadius: 12, 
    borderWidth: 1 
  },
  actionText: { marginLeft: 10, fontSize: 16, fontWeight: '500' }


});