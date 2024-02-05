import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ThemeManager } from 'Theme';
import tw from 'twrnc';
import axios from 'axios';
import { CustomModal, Loading } from 'components';
import { useDispatch } from 'react-redux';
import { setAuthUser } from 'store/slices/user';
import config from 'constants/App';
import { MaterialIcons, Ionicons } from 'constants/Icons';
import InputField from 'components/InputField';

const Login = (props) => {
  const dispatch = useDispatch();
  const theme = ThemeManager.getTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalInfo, setModalInfo] = useState({ type: '', title: '', body: '', visible: false, errors: {} });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const apiUrl = `${config.REACT_APP_BASE_URL}/api/auth/login`;
    setLoading(true);

    try {
      const loginResponse = await axios.post(apiUrl, {
        email: email,
        password: password,
        device_name: 'phone',
      });

      const authToken = loginResponse.data.token;
      dispatch(setAuthUser(loginResponse.data));

      setModalInfo({
        type: 'success',
        title: 'Éxito',
        body: 'Inicio de sesión exitoso',
        visible: true,
      });

      setEmail('');
      setPassword('');
      setLoading(false);
    } catch (error) {
      console.error('Error en el inicio de sesión:', error.response ? error.response.data : error.message);

      setModalInfo({
        type: 'error',
        title: 'Error',
        body: error.response
          ? error.response.data.message || 'Error en el inicio de sesión'
          : 'Error en el inicio de sesión',
        visible: true,
        errors: error.response ? error.response.data.errors || {} : {},
      });

      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalInfo((prevInfo) => ({ ...prevInfo, visible: false }));
  };

  const resetHasError = () => {
    setModalInfo((prevInfo) => ({
      ...prevInfo,
      errors: {},
    }));
  };

  useEffect(() => {
    resetHasError()
  }, [email, password])
  

  return (
    <>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Image style={tw`h-10 w-40 mb-4`} source={require('../assets/images/icons/logo_app2.png')} />
        <InputField
          iconComponent={<MaterialIcons name="email" size={20} color={theme.colors.primary} />}
          placeholder="Correo electrónico"
          onChangeText={setEmail}
          value={email}
          onFocus={resetHasError}
          hasError={!!modalInfo.errors && !!modalInfo.errors.email}
        />
        <InputField
          iconComponent={<MaterialIcons name="lock" size={20} color={theme.colors.primary} />}
          placeholder="Contraseña"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
          onFocus={resetHasError}
          hasError={!!modalInfo.errors && !!modalInfo.errors.password}
        />
        <TouchableOpacity onPress={() => console.log('Recuperar contraseña')}>
          <Text style={[styles.link, { color: theme.colors.text }]}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
          <Text style={[styles.link, { color: theme.colors.text }]}>
            ¿No tienes cuenta? <Text style={{ color: theme.colors.primary }}>Regístrate aquí</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[tw`p-3 rounded-md mt-10`, { backgroundColor: theme.colors.primary, flexDirection: 'row', alignItems: 'center' }]}
          onPress={handleLogin}
        >
          <Text style={[tw`text-xl text-white`]}>Iniciar sesión</Text>
          <Ionicons name="arrow-forward-circle" size={30} color="white" style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      </View>
      <CustomModal modalInfo={modalInfo} onClose={closeModal} />
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
  input: {
    width: '80%',
    height: 60,
    borderRadius: 5,
    paddingLeft: 10,
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

  },
  link: {
    marginBottom: 10,
  },
});

export default Login;