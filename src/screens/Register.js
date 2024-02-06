import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ThemeManager } from 'Theme';
import tw from 'twrnc';
import axios from 'axios';
import { CustomModal, Loading } from 'components';
import { useDispatch } from 'react-redux'
import { setAuthUser, setDataUser } from 'store/slices/user';
import config from 'constants/App';
import { Ionicons, MaterialIcons, FontAwesome } from 'constants/Icons';
import InputField from 'components/InputField'; 

const Register = (props) => {
    const dispatch = useDispatch();
    const theme = ThemeManager.getTheme();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [modalInfo, setModalInfo] = useState({ type: '', title: '', body: '', visible: false, errors: {} });
    const [loading, setLoading] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(false);

    const handleRegister = async () => {
        const apiUrl = `${config.REACT_APP_BASE_URL}/api/auth/register`;

        setLoading(true);

        try {
            // Registro de usuario
            const registerResponse = await axios.post(apiUrl, {
                email: email,
                name: name,
                phone: phone,
                password: password,
            });

            console.log('Respuesta de la API:', registerResponse.data);

            // Autenticación con el token de registro
            const loginApiUrl = 'http://couponsbackend/api/auth/login';
            const authBody = {
                email: email,
                password: password,
                device_name: 'phone',
            };

            const loginResponse = await axios.post(loginApiUrl, authBody);
            const authToken = loginResponse.data.token;
            dispatch(setAuthUser(loginResponse.data))

            // Obtener datos del usuario con el token de autenticación
            const userDataApiUrl = 'http://couponsbackend/api/auth/data';
            const config = {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            };

            const userDataResponse = await axios.get(userDataApiUrl, config);
            const userData = userDataResponse.data;
            dispatch(setDataUser(userDataResponse.data))
            console.log('Datos del usuario:', userData);

            setModalInfo({
                type: 'success',
                title: 'Éxito',
                body: 'Registro exitoso',
                visible: true,
            });
            
            // Limpiar los inputs después de un registro exitoso
            setEmail('');
            setName('');
            setPhone('');
            setPassword('');
            setRegisterSuccess(true)
            setLoading(false);  // Detenemos el indicador de carga
        } catch (error) {
            setRegisterSuccess(false)
            // Manejo de errores
            console.error(error);

            setModalInfo({
                type: 'error',
                title: 'Error',
                body: error.response ? (error.response.data.message || 'Error en el registro') : 'Error en el registro',
                visible: true,
                errors: error.response ? (error.response.data.errors || {}) : {},
            });

            setLoading(false);  // Detenemos el indicador de carga
        }
    };

    const closeModal = () => {
        setModalInfo(prevInfo => ({ ...prevInfo, visible: false }));
        handleCloseOptional()
    };

    const handleCloseOptional = () => {
        // Tu lógica adicional al cerrar el modal
        if(registerSuccess) props.navigation.navigate("Home")
    };

    const resetHasError = () => {
        setModalInfo((prevInfo) => ({
          ...prevInfo,
          errors: {},
        }));
      };
    
    useEffect(() => {
    resetHasError()
    }, [email, name, phone, password])


    return (
        <>
            <View style={[styles.iconContainer, { backgroundColor: theme.colors.background }]}>
                <Ionicons
                    onPress={() => props.navigation.goBack()}
                    style={styles.backIcon}
                    name="arrow-back-circle-outline"
                    size={50}
                    color={theme.colors.primary}
                />
            </View>
            <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
                <Image
                    style={tw`h-10 w-40 mb-4`}
                    source={require('../assets/images/icons/logo_app2.png')}
                />
                <InputField
                    iconComponent={<MaterialIcons name="email" size={20} color={theme.colors.primary} style={styles.icon} />}
                    placeholder="Correo electrónico"
                    onChangeText={setEmail}
                    value={email}
                    onFocus={resetHasError}
                    hasError={!!modalInfo.errors && !!modalInfo.errors.email}
                />
                <InputField
                    iconComponent={<MaterialIcons name="person" size={20} color={theme.colors.primary} style={styles.icon} />}
                    placeholder="Nombre"
                    onChangeText={setName}
                    value={name}
                    onFocus={resetHasError}
                    hasError={!!modalInfo.errors && !!modalInfo.errors.name}
                />
                <InputField
                    iconComponent={<FontAwesome name="mobile-phone" size={30} color={theme.colors.primary} style={styles.icon} />}
                    placeholder="Teléfono"
                    onChangeText={setPhone}
                    value={phone}
                    onFocus={resetHasError}
                    hasError={!!modalInfo.errors && !!modalInfo.errors.phone}
                />
                <InputField
                    iconComponent={<MaterialIcons name="lock" size={20} color={theme.colors.primary} style={styles.icon} />}
                    placeholder="Contraseña"
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    value={password}
                    onFocus={resetHasError}
                    hasError={!!modalInfo.errors && !!modalInfo.errors.password}
                />
                <TouchableOpacity
                    style={[tw`p-3 rounded-md mt-5`, { backgroundColor: theme.colors.primary, flexDirection: 'row', alignItems: 'center' }]}
                    onPress={handleRegister}
                >
                    <Text style={[tw`text-xl text-white`]}>Registrarse</Text>
                    <FontAwesome name="save" size={30} color="white" style={{ marginLeft: 10 }} />
                </TouchableOpacity>
            </View>
            {/* Utiliza el nuevo componente CustomModal */}
            <CustomModal modalInfo={modalInfo} onClose={closeModal} onCloseOptional={handleCloseOptional} />
            {/* Utiliza el componente Loading */}
            <Loading visible={loading} />
        </>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        marginTop: 20,
        marginLeft: 20,
    },
    backIcon: {
        marginTop: 4,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -60,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 60,
        borderRadius: 5,
        paddingLeft: 30,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 10,
    },
    icon: {
        marginLeft: 8,
        position: 'absolute',
    },
    link: {
        marginBottom: 10,
    },
    button: {
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        textAlign: 'center',
    },
});

export default Register;
