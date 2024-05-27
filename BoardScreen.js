// BoardScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const samplePosts = [
  {
    boardType: '자유게시판',
    title: '제목1',
    content: '내용1',
    author: '아이디1',
    createdAt: '2024.5.26',
    comments: [
      { author: '아이디1', content: '댓글1', createdAt: '2024.5.26 20:19' },
      { author: '아이디2', content: '댓글2', createdAt: '2024.5.26 20:19' },
    ],
  },
  {
    boardType: '모임게시판',
    title: '제목2',
    content: '내용2',
    author: '아이디2',
    createdAt: '2024.5.26',
    comments: [],
  },
  // 다른 게시글들...
];

export default function BoardScreen() {
  const [selectedTab, setSelectedTab] = useState('자유게시판');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    setFilteredPosts(samplePosts.filter(post => post.boardType === selectedTab));
  }, [selectedTab]);

  const navigateToPostDetail = (post) => {
    navigation.navigate('PostDetail', { post, boardTitle: selectedTab });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>게시판</Text>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setSelectedTab('자유게시판')}>
          <Text style={[styles.tab, selectedTab === '자유게시판' && styles.activeTab]}>자유게시판</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('모임게시판')}>
          <Text style={[styles.tab, selectedTab === '모임게시판' && styles.activeTab]}>모임게시판</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollContainer}>
        {filteredPosts.map((post, index) => (
          <TouchableOpacity key={index} style={styles.postContainer} onPress={() => navigateToPostDetail(post)}>
            <View style={styles.postContent}>
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.postText}>{post.content}</Text>
              <Text style={styles.postAuthor}>{post.author}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    fontSize: 18,
    marginRight: 20,
    paddingBottom: 5,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007bff',
  },
  scrollContainer: {
    flex: 1,
  },
  postContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  postContent: {
    flex: 1,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postText: {
    fontSize: 16,
    marginBottom: 5,
  },
  postAuthor: {
    fontSize: 14,
    color: '#777',
  },
});
