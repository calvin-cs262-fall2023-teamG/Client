import { StyleSheet, Image } from 'react-native';

export default function ImageViewer({ placeholderImageSource, selectedImage }) {
  const imageSource = selectedImage ? { uri: selectedImage } : placeholderImageSource;
  //Simply provides an image
  return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 160,
    height: 200,
    borderWidth: 4,
    borderColor: '#888181',
    borderRadius: 15,
    marginTop: 10,
  },
});
