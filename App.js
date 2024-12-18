import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const App = () => {
  const [value, setValue] = useState(""); // Store the input value as a string for appending
  const eraserIcon = <FontAwesome6 name="eraser" size={30} color="white" />;
  const clear = ['C', eraserIcon, '%', '!'];
  const num = ['9', '8', '7', '+', '6', '5', '4', '-', '3', '2', '1', '*', '00', '0', '.', '/'];

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

  const factorial = (num) => {
    if (num < 0) return "Error"; // Factorial of negative numbers is undefined
    if (num === 0) return 1; // Factorial of 0 is 1
    let result = 1;
    for (let i = 2; i <= num; i++) {
      result *= i;
    }
    return result;
  };
  // Function to handle button press
  const handlePress = (item) => {
    if (item === 'C') {
      setValue(""); // Clear the input
    } else if (item === eraserIcon) {
      setValue((prev) => prev.slice(0, -1)); // Remove the last character
    } else if (item === '=') {
      calculateResult(); // Calculate and display the result
    } else if (item === '!') {
      setValue((prev) => {
        const num = parseInt(prev, 10);
        return isNaN(num) ? "Error" : factorial(num).toString();
      });
    } else {
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
          // scrollEnabled={true}
          style={styles.inputbox}
          value={value} // Bind the value to state
          placeholder="0"
          placeholderTextColor="gray"
          editable={false} // Prevent typing directly
          multiline={true} // Enable wrapping to a new line
          textAlign="right" // Align text to the right
          
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
    fontSize: 25,
    fontFamily: 'Italic'
    // textDecorationLine: 'underline',
  },
  inputbox: {
    display: 'flex',
    flexWrap:'wrap',
    height: 160,
    // borderColor: 'white',
    padding: 10,
    borderWidth: 1,
    marginHorizontal: 25,
    marginVertical: 25,
    color: 'white',
    textAlign: 'right',
    fontFamily: 'Roboto',
    borderRadius: 20,
    fontSize: 50,
  },
  btncontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // marginHorizontal: 10,
    borderWidth: 1,
    // borderColor: 'white',
    paddingLeft: 10
  },
  btn: {
    display: 'flex',
    height: '20%',
    width: '20%',
    aspectRatio: 1,
    borderRadius: 50,
    backgroundColor: '#454647',
    marginRight: 15,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusBtn: {
    backgroundColor: 'orange',
  },
  btntxt: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  equalsBtn: {
    backgroundColor: 'blue'
  },
  equalsText: {
    fontSize: 40,
    color: 'white',
    textAlign: 'center',
  },
});

export default App;
