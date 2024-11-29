import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const App = () => {
  const [value, setValue] = useState(""); // Store the input value as a string for appending
  const eraserIcon = <FontAwesome6 name="eraser" size={30} color="white" />;
  const clear = ['C', eraserIcon, '%', '!'];
  const num = [9, 8, 7, '+', 6, 5, 4, '-', 3, 2, 1, '*', '00', 0, '.', '/'];

   // Function to calculate the result
   const calculateResult = () => {
    try {
      const result = eval(value); // Evaluate the expression
      setValue(result.toString());
      // return result.toString();
      // Display the result in the TextInput
    } catch (error) {
      setValue();
      // return 'Error' // Handle invalid expressions
    }
  };
  // Function to handle button press
  const handlePress = (item) => {
    if (item === 'C') {
      setValue(""); // Clear the input
    } else if (item === eraserIcon) {
      setValue((prev) => prev.slice(0, -1)); // Remove the last character
    } 
    else if (item === '='){
      setValue(calculateResult)
    }else {
      setValue((prev) => prev + item); // Append the clicked item
    }
  };

 

  return (
    <ScrollView style={{ backgroundColor: 'black', flex: 1 }}>
      {/* Title */}
      <View>
        <Text style={styles.title}>Basic Calculator</Text>
      </View>

      {/* Input Box */}
      <View>
        <TextInput
          scrollEnabled={true}
          style={styles.inputbox}
          value={value} // Bind the value to state
          placeholder="0"
          placeholderTextColor="gray"
          editable={false} // Prevent typing directly
        />
      </View>

      {/* Buttons */}
      <View style={styles.btncontainer}>
        {/* Clear and eraser buttons */}
        {clear.map((item, index) => (
          <TouchableOpacity key={index} style={styles.btn} onPress={() => handlePress(item)}>
            {typeof item === 'string' ? (
              <Text style={styles.btntxt}>{item}</Text>
            ) : (
              item // Render the eraser icon directly
            )}
          </TouchableOpacity>
        ))}

        {/* Number and operator buttons */}
        {num.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.btn,
              item === '+' && styles.plusBtn,
              item === '-' && { backgroundColor: 'red' },
              item === '*' && { backgroundColor: 'green' },
              item === '/' && { backgroundColor: 'blue' },
              item === '=' && { backgroundColor: 'green ' },
            ]}
            onPress={() => handlePress(item)}
          >
            <Text style={styles.btntxt}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Equal Button */}
      <TouchableOpacity style={styles.equalsBtn} onPress={calculateResult}>
        <Text style={styles.equalsText}>=</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
    textDecorationLine: 'underline',
  },
  inputbox: {
    flexWrap:'wrap',
    height: 160,
    borderColor: 'white',
    padding: 10,
    borderWidth: 1,
    marginHorizontal: 30,
    marginVertical: 30,
    color: 'white',
    textAlign: 'right',
    fontFamily: 'Roboto',
    borderRadius: 20,
    fontSize: 50,
  },
  btncontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 10,
  },
  btn: {
    display: 'flex',
    height: 70,
    width: 70,
    aspectRatio: 1,
    borderRadius: 50,
    backgroundColor: 'grey',
    marginRight: 15,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusBtn: {
    backgroundColor: 'orange',
  },
  btntxt: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  equalsBtn: {
    backgroundColor: 'green',
    marginHorizontal: 30,
    marginVertical: 20,
    paddingVertical: 15,
    borderRadius: 10,
  },
  equalsText: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  },
});

export default App;
