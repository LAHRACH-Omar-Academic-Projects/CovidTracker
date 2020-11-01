import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, BackHandler } from 'react-native';
import { styles } from './styles';

export default CustomLoader = (props) => {
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", () => { return true; });
    },[])
    if(props.data.loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size='large' color='rgba(98,80,255,0.8)' />
                <Text style={styles.text}>{props.data.object}</Text>
            </View>
        )
    }
    else {
        return(
            <></>
        )
    }
}