import React, { useState } from 'react';
import { Alert, StyleSheet, Text, Pressable, View, ScrollView, Dimensions } from 'react-native';
import InstructionButton from './InstructionButton';
import InstructionsModalContent from '../instructions/instructions_mod';
import Modal from "react-native-modal";


const InstructionModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
        
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
          onBackdropPress={() => {
            setModalVisible(!modalVisible);
          }}
          backdropOpacity={0.1}
          >
        <ScrollView>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <InstructionsModalContent />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Close Instructions</Text>
              </Pressable>
            </View>
          </View>

          </ScrollView>
        </Modal>
        
      <View style={styles.instructionButtonContainer}>
        <InstructionButton onPress={() => setModalVisible(!modalVisible)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 22,
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 20,
  },
  buttonClose: {
    backgroundColor: '#fb5b5a',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  instruction_container: {
    justifyContent: 'flex-end',
    backgroundColor: '#ecf0f1',
    alignItems: 'flex-end',
    flex: 1,
},  
});

export default InstructionModal;