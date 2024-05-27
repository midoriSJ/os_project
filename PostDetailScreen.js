import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PostDetailScreen({ route }) {
  const { post, boardTitle } = route.params;
  const [comments, setComments] = useState([
    { id: 1, user: '아이디', content: '댓글~~~\n댓글~~~', date: '5/26 20:19' },
    { id: 2, user: '아이디', content: '댓글~~~\n댓글~~~', date: '5/26 20:19' }
  ]);
  const [newComment, setNewComment] = useState('');
  const navigation = useNavigation();

  const handleAddComment = () => {
    const newComments = [...comments, { id: comments.length + 1, user: '아이디', content: newComment, date: new Date().toLocaleString() }];
    setComments(newComments);
    setNewComment('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{boardTitle}</Text>
        <TouchableOpacity>
          <Text style={styles.moreButton}>⋮</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.postContainer}>
          <View style={styles.postHeader}>
            <Image source={require('../assets/avatar.png')} style={styles.avatar} />
            <View>
              <Text style={styles.username}>아이디</Text>
              <Text style={styles.date}>2024.5.26</Text>
            </View>
          </View>
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postContent}>{post.content}</Text>
          <View style={styles.imageContainer}>
            {post.images && post.images.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.image} />
            ))}
          </View>
        </View>
        <View style={styles.commentsContainer}>
          {comments.map(comment => (
            <View key={comment.id} style={styles.comment}>
              <Image source={require('../assets/avatar.png')} style={styles.avatar} />
              <View style={styles.commentContent}>
                <Text style={styles.username}>{comment.user}</Text>
                <Text style={styles.commentText}>{comment.content}</Text>
                <Text style={styles.date}>{comment.date}</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.moreButton}>⋮</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="댓글을 입력하세요."
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity onPress={handleAddComment}>
          <Text style={styles.sendButton}>➤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  moreButton: {
    fontSize: 24,
  },
  scrollView: {
    padding: 16,
  },
  postContainer: {
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  postTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postContent: {
    fontSize: 16,
    marginBottom: 8,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 8,
    marginBottom: 8,
  },
  commentsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 16,
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  commentContent: {
    flex: 1,
    marginLeft: 8,
  },
  commentText: {
    fontSize: 16,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    padding: 8,
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 16,
  },
  sendButton: {
    fontSize: 24,
    marginLeft: 8,
  },
});
