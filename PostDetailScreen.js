import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function PostDetailScreen({ route }) {
  const { post, boardTitle } = route.params;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://192.168.147.130:5000/posts/${post.id}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [post.id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      Alert.alert('댓글을 입력하세요.');
      return;
    }

    try {
      const response = await axios.post(`http://192.168.147.130:5000/posts/${post.id}/comments`, {
        content: newComment,
      });

      if (response.data.success) {
        setComments([...comments, response.data.comment]);
        setNewComment('');
      } else {
        Alert.alert('댓글 추가 실패', response.data.message || '댓글 추가에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      Alert.alert('댓글 추가 실패', '서버와 통신 중 문제가 발생했습니다.');
    }
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
              <Text style={styles.username}>{post.author}</Text>
              <Text style={styles.date}>{post.createdAt}</Text>
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
