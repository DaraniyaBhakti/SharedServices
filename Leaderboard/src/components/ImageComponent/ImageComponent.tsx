import * as React from "react";
import { PropsWithChildren, ReactElement } from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import { useImageComponent } from "./ImageComponentController";
import { defaultImage } from "../../assets";

export function ImageComponent(
  props: PropsWithChildren<ImageComponentProps>,
): ReactElement {
  const { initialUri, size } = props;

  const [loading, imageUri, handleLoadEnd, handleError] = useImageComponent({
    initialUri,
  });

  const imageStyle = StyleSheet.create({
    container: {
      width: size,
      height: size,
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 100,
    },

    imageContainer: {
      borderRadius: 100,
      width: size,
      height: size,
    },
  });

  return (
    <>
      <View style={imageStyle.imageContainer}>
        {loading && (
          <View style={imageStyle.container}>
            <ActivityIndicator size={"small"} color={"black"} />
          </View>
        )}

        <Image
          testID={"imageTest"}
          key={new Date().getTime()}
          source={
            imageUri !== null
              ? {
                  uri: imageUri,
                }
              : defaultImage
          }
          style={styles.imageStyle}
          width={size}
          height={size}
          onLoadEnd={handleLoadEnd}
          onError={handleError}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    borderRadius: 100,
  },
  imageContainer: {
    borderWidth: 1,
    borderRadius: 100,
  },
  activityIndicator: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
});

export interface ImageComponentProps {
  //
  initialUri: string;
  size: number;
}

ImageComponent.defaultProps = {
  //
};

export default ImageComponent;
