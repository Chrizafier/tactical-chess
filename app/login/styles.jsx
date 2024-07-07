import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Example background color
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 20,
  },
  inputView: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: '#ffffff',
    width: '100%',
    height: 30,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
    color: '#fb5b5a',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: '#fb5b5a',
    width: '100%',
    height: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  signupLink: {
    color: '#007bff', // Example color for link
    textDecorationLine: 'underline',
  },
});

export default styles;
