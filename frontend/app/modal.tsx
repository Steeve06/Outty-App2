import { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function ChatModal() {
  const { name } = useLocalSearchParams();
  const [msg, setMsg] = useState('');
  const [chat, setChat] = useState([
    { id: '1', text: 'Hey! Are we still on for hiking?', sender: 'them' },
    { id: '2', text: 'Definitely! What time?', sender: 'me' },
  ]);

  const sendMsg = () => {
    if (!msg.trim()) return;
    setChat([...chat, { id: Date.now().toString(), text: msg, sender: 'me' }]);
    setMsg('');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }} keyboardVerticalOffset={100}>
      <View style={styles.container}>
        <FlatList
          data={chat}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={[styles.bubble, item.sender === 'me' ? styles.myBubble : styles.theirBubble]}>
              <Text style={item.sender === 'me' ? styles.myText : styles.theirText}>{item.text}</Text>
            </View>
          )}
          contentContainerStyle={{ padding: 20 }}
        />
        <View style={styles.inputArea}>
          <TextInput 
            style={styles.input} 
            placeholder={`Message ${name}...`} 
            value={msg} 
            onChangeText={setMsg} 
            onSubmitEditing={sendMsg}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  bubble: { padding: 12, borderRadius: 18, marginBottom: 10, maxWidth: '80%' },
  myBubble: { alignSelf: 'flex-end', backgroundColor: '#00a86b' },
  theirBubble: { alignSelf: 'flex-start', backgroundColor: '#f0f0f0' },
  myText: { color: '#fff' },
  theirText: { color: '#000' },
  inputArea: { padding: 20, borderTopWidth: 1, borderColor: '#eee', backgroundColor: '#fff' },
  input: { backgroundColor: '#f5f5f5', padding: 15, borderRadius: 25, fontSize: 16 }
});