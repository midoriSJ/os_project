import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export default function WritePostScreen() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const navigation = useNavigation();

  const requestStoragePermission = async () => {
    const result = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
    );

    switch (result) {
      case RESULTS.GRANTED:
        handleAddImage();
        break;
      case RESULTS.DENIED:
        Alert.alert('Permission Denied', 'You need to allow access to your photos to add images.');
        break;
      case RESULTS.BLOCKED:
        Alert.alert('Permission Blocked', 'You need to allow access to your photos from settings.');
        break;
    }
  };

  const handleAddImage = () => {
    if (images.length < 5) {
      launchImageLibrary(
        {
          mediaType: 'photo',
          maxWidth: 300,
          maxHeight: 300,
          quality: 1,
        },
        (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.assets) {
            const source = { uri: response.assets[0].uri };
            setImages([...images, source]);
          }
        }
      );
    }
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleComplete = () => {
    // 게시글 작성 완료 처리
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.closeButton}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.title}>글쓰기</Text>
        <TouchableOpacity onPress={handleComplete}>
          <Text style={styles.completeButton}>완료</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="제목"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="방문한 장소(선택)"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.textArea}
        placeholder="내용"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.addButton} onPress={requestStoragePermission}>
          <Text style={styles.addButtonText}>📷</Text>
        </TouchableOpacity>
        {images.map((image, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Text style={styles.imageText}>{`사진${index + 1}`}</Text>
            <TouchableOpacity onPress={() => handleRemoveImage(index)}>
              <Text style={styles.removeButton}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButton: {
    fontSize: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  completeButton: {
    fontSize: 16,
    color: '#007bff',
    backgroundColor: '#e0f7fa',
    padding: 5,
    borderRadius: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 8,
  },
  textArea: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 8,
    paddingTop: 8,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  addButtonText: {
    fontSize: 24,
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 10,
    marginBottom: 10,
  },
  imageText: {
    width: 60,
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    lineHeight: 60,
  },
  removeButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#ff0000',
    color: '#fff',
    borderRadius: 10,
    padding: 2,
    fontSize: 12,
  },
});
