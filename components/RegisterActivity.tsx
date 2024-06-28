import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { Formik } from 'formik';
import CustomCheckbox from './CustomCheckbox'; // Adjust the path as necessary

const RegisterDisciplineScreen: React.FC = () => {
  const initialDays = [
    { day: 'Segunda-feira', isChecked: false, startTime: '', endTime: '' },
    { day: 'Terça-feira', isChecked: false, startTime: '', endTime: '' },
    { day: 'Quarta-feira', isChecked: false, startTime: '', endTime: '' },
    { day: 'Quinta-feira', isChecked: false, startTime: '', endTime: '' },
    { day: 'Sexta-feira', isChecked: false, startTime: '', endTime: '' },
    { day: 'Sábado', isChecked: false, startTime: '', endTime: '' },
    { day: 'Domingo', isChecked: false, startTime: '', endTime: '' },
  ];

  const handleRegister = (values: any) => {
    console.log(values);
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#5859e9', '#52337c']}
        style={styles.banner}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.containerLogo}>
          <FontAwesome5 name="calendar-check" size={54} color="white" />
          <Text style={styles.bannerText}>Cadastrar Disciplina</Text>
        </View>
      </LinearGradient>
      <Formik
        initialValues={{ disciplineName: '', days: initialDays }}
        onSubmit={handleRegister}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
          <ScrollView contentContainerStyle={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Nome da disciplina"
              placeholderTextColor="#888"
              onChangeText={handleChange('disciplineName')}
              onBlur={handleBlur('disciplineName')}
              value={values.disciplineName}
            />
            {values.days.map((day, index) => (
              <View key={index} style={styles.dayContainer}>
                <CustomCheckbox
                  isChecked={day.isChecked}
                  onPress={() => setFieldValue(`days[${index}].isChecked`, !day.isChecked)}
                />
                <Text style={styles.dayText}>{day.day}</Text>
                <TextInput
                  style={[styles.timeInput, !day.isChecked && styles.disabledInput]}
                  placeholder="Início"
                  placeholderTextColor="#888"
                  onChangeText={handleChange(`days[${index}].startTime`)}
                  onBlur={handleBlur(`days[${index}].startTime`)}
                  value={day.startTime}
                  editable={day.isChecked}
                />
                <TextInput
                  style={[styles.timeInput, !day.isChecked && styles.disabledInput]}
                  placeholder="Fim"
                  placeholderTextColor="#888"
                  onChangeText={handleChange(`days[${index}].endTime`)}
                  onBlur={handleBlur(`days[${index}].endTime`)}
                  value={day.endTime}
                  editable={day.isChecked}
                />
              </View>
            ))}
            <TouchableOpacity onPress={() => handleSubmit()}>
              <LinearGradient
                colors={['#5859e9', '#52337c']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.buttonText}>Cadastrar</Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  banner: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bannerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  dayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  dayText: {
    flex: 2,
    fontSize: 16,
  },
  timeInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: '#f9f9f9',
  },
  disabledInput: {
    backgroundColor: '#e0e0e0',
  },
  buttonGradient: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
    height: 50,
    width: '60%',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default RegisterDisciplineScreen;
