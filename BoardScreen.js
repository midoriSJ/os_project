// 게시판 리스트 나오는 화면

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const samplePosts = [
  {
    title: 'ㄱ',
    content: 'ㄱ',
    author: 'ㄱ',
    image: null,
  },
  {
    title: 'ㄱ',
    content: 'ㄱ',
    author: 'ㄱ',
    image: null,
  },
  {
    title: 'ㄱ',
    content: 'ㄱ',
    author: 'ㄱ',
    image: null,
  },
  {
    title: 'ㄱ',
    content: 'ㄱ',
    author: 'ㄱ',
    image: null,
  },
  {
    title: 'ㄱ',
    content: 'ㄱ',
    author: 'ㄱ',
    image: null,
  },
];

export default function BoardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>게시판</Text>
      <View style={styles.tabContainer}>
        <Text style={styles.tab}>자유게시판</Text>
        <Text style={[styles.tab, styles.activeTab]}>모임게시판</Text>
      </View>
      <ScrollView style={styles.scrollContainer}>
        {samplePosts.map((post, index) => (
          <View key={index} style={styles.postContainer}>
            <View style={styles.postContent}>
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.postText}>{post.content}</Text>
              <Text style={styles.postAuthor}>{post.author}</Text>
            </View>
            {post.image && (
              <Image source={{ uri: post.image }} style={styles.postImage} />
            )}
          </View>
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
  postImage: {
    width: 60,
    height: 60,
    marginLeft: 10,
  },
});
