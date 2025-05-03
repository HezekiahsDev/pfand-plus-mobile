import { Image } from "expo-image";
import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const ImageSliderCard = ({ images }: { images: string[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    if (activeIndex === 0) {
      setActiveIndex(images.length - 1);
    } else {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex === images.length - 1) {
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.slider}>
        <Image
          source={{ uri: images[activeIndex] }}
          style={styles.image}
          contentFit="cover"
          transition={500}
        />
      </View>
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={handlePrev} style={styles.navButton}>
          <Text style={styles.navButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} style={styles.navButton}>
          <Text style={styles.navButtonText}>{">"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 240,
    backgroundColor: "#fff",
  },
  slider: {
    width: "100%",
    height: 240,
    overflow: "hidden",
  },
  image: {
    width: width,
    height: 240,
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: "50%",
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
    zIndex: 1,
  },
  navButton: {
    backgroundColor: "#00000099",
    padding: 10,
    borderRadius: 20,
  },
  navButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default ImageSliderCard;
