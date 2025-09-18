import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, ScrollView, Switch, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Componente Nombre
const Nombre = ({ nombre }) => (
  <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>{nombre}</Text>
);

// Lista de 20 tareas
const tareas = Array.from({ length: 20 }, (_, a) => ({ id: a + 1, nombre: `Tarea ${a + 1}` }));

export default function App() {
  const [switches, setSwitches] = useState(tareas.map(() => false));

  const toggleSwitch = (index) => {
    const updated = [...switches];
    updated[index] = !updated[index];
    setSwitches(updated);
  };

  //inche parcial

  return (
    <ScrollView style={{ flex: 1 }}>
      {/* Primera sección: gris claro */}
      <View style={[styles.seccion, { backgroundColor: '#d3d3d3' }]}>
        <Nombre nombre="Andrés David Ospina Hurtado" />

        <Image 
          source={require('./assets/BewowulfCerebella.png')} 
          style={{ width: 350, height: 330, marginBottom: 100, alignItems: 'center', justifyContent: 'center' }}
        />

        <Formik
          initialValues={{ semestre: '' }}
          validationSchema={Yup.object({
            semestre: Yup.number()
              .typeError('Debe ser un número')
              .required('Requerido'),
          })}
          onSubmit={values => console.log('Editando semestre:', values.semestre)}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <View>
              <TextInput
                placeholder="Número de semestre"
                keyboardType="numeric"
                value={values.semestre}
                onChangeText={handleChange('semestre')}
                style={styles.input}
              />
              {errors.semestre && touched.semestre && (
                <Text style={{ color: 'red' }}>{errors.semestre}</Text>
              )}

              <Button
                title="Editar"
                color="green"
                onPress={() => {
                  handleSubmit();
                  console.log('Editando');
                }}
              />
            </View>
          )}
        </Formik>
      </View>

      {/* Segunda sección: azul claro */}
      <View style={[styles.seccion, { backgroundColor: '#207C99' }]}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Lista de Tareas</Text>
        {tareas.map((tarea, index) => (
          <View key={tarea.id} style={styles.tarea}>
            <Text>{tarea.nombre}</Text>
            <Switch
              value={switches[index]}
              onValueChange={() => toggleSwitch(index)}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  seccion: {
    padding: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  tarea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});

