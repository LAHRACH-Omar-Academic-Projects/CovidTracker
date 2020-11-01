import React, {useState} from 'react';
import { styles } from './styles';
import CustomLoader from '../../../Components/CustomLoader/CustomLoader';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import { Actions } from 'react-native-router-flux';

export default SignOut = () => {
    const [loading, setLoading] = useState(true);
    setTimeout(() => {
        BackgroundGeolocation.removeAllListeners();
        BackgroundGeolocation.stop();
        Actions.signIn();
        setLoading(false);
    }, 4000);

    return (
        <CustomLoader data={{ object: "Loggin out", loading: loading }} />
    )
}