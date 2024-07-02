import React from 'react';
import { View, ActivityIndicator, Animated, Image, StyleSheet } from 'react-native';

const LoadingAnimation = ({ source }) => {
    const translateAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(translateAnim, {
            toValue: -50, // translation de -50 pixels vers le haut
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [translateAnim]);

    return (
        <View style={styles.container}>
            <Animated.Image
                resizeMode="contain"
                source={source}
                style={[styles.image, { transform: [{ translateY: translateAnim }] }]}
            />
            <ActivityIndicator size="large" color="#FDC100" style={styles.loader} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        marginBottom: 20,
        width: 171,
        height: undefined,
        aspectRatio: 2.27,
    },
    loader: {
        marginTop: 20,
    },
});

export default LoadingAnimation;
