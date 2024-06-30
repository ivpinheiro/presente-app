import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const HistoryScreen: React.FC = () => {
  const [selectedStartDate, setSelectedStartDate] = useState({
    day: '1',
    month: 'Janeiro',
    year: '2023',
  });
  const [selectedEndDate, setSelectedEndDate] = useState({
    day: '1',
    month: 'Janeiro',
    year: '2023',
  });
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  //Esses items devem vir das atividades cadastradas no backend
  const [items, setItems] = useState([
    { label: 'Selecione a atividade', value: '' },
    { label: 'Atividade 1', value: 'atividade1' },
    { label: 'Atividade 2', value: 'atividade2' },
  ]);

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const years = Array.from({ length: 100 }, (_, i) => (2023 - i).toString());

  
  const [showHistoryButton, setShowHistoryButton] = useState(false);
  const [showPercentage, setShowPercentage] = useState(false);
  const [randomPercentage, setRandomPercentage] = useState(0);

  // Array para armazenar os logs das seleções
  const logs: string[] = [];
  // Deve ser enviado para o backend
  const handleSelection = () => {
    const log = `Data de Início: ${selectedStartDate.day}/${selectedStartDate.month}/${selectedStartDate.year}, `
      + `Data de Fim: ${selectedEndDate.day}/${selectedEndDate.month}/${selectedEndDate.year}, `
      + `Atividade Selecionada: ${selectedActivity}`;
    logs.push(log);
    console.log(log);

    
    if (selectedStartDate.day && selectedStartDate.month && selectedStartDate.year &&
      selectedEndDate.day && selectedEndDate.month && selectedEndDate.year &&
      selectedActivity) {
      setShowHistoryButton(false); 
      setShowPercentage(true); 
      const randomPercent = Math.floor(Math.random() * 101); 
      setRandomPercentage(randomPercent); 
    } else {
      setShowHistoryButton(false); 
      setShowPercentage(false); 
    }
  };

  const renderPercentageComponent = () => {
    if (!showPercentage) {
      return null;
    }

    let textColor = "#000";
    let icon = "smile";

    if (randomPercentage >= 70) {
      textColor = "#4b7bec"; // Azul
      icon = "smile";
    } else if (randomPercentage >= 60) {
      textColor = "#f39c12"; // Laranja
      icon = "exclamation-triangle";
    } else {
      textColor = "#e74c3c"; // Vermelho
      icon = "sad-tear";
    }

    return (
      <View style={styles.percentageContainer}>
        <FontAwesome5 name={icon as any} size={70} color={textColor} style={styles.icon} />
        <Text style={[styles.percentageText, { color: textColor }]}>
          {randomPercentage}%
        </Text>
        {/* Botão "Detalhes" */}
        <View style={styles.detailsButtonContainer}>
          <TouchableOpacity style={styles.detailsButton} onPress={handleDetailsPress}>
            <LinearGradient
              colors={["#5859e9", "#52337c"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.detailsButtonInner}
            >
              <Text style={styles.detailsButtonText}>Detalhes</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleDetailsPress = () => {
    // Aqui vai ser implementado para ser direcionado para a tela da atividade cadastrada
    console.log("Botão Detalhes pressionado");
  };

  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <FontAwesome5 name="calendar-check" size={54} color="black" />
          <Text style={styles.headerText}>Ver histórico de presença</Text>
        </View>

        <View style={styles.dateContainer}>
          <Text style={styles.dateLabel}>De:</Text>
          <View style={styles.pickerGroup}>
            <Picker
              selectedValue={selectedStartDate.day}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setSelectedStartDate({ ...selectedStartDate, day: itemValue })
              }
            >
              {days.map(day => (
                <Picker.Item key={day} label={day} value={day} />
              ))}
            </Picker>
            <Picker
              selectedValue={selectedStartDate.month}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setSelectedStartDate({ ...selectedStartDate, month: itemValue })
              }
            >
              {months.map((month, index) => (
                <Picker.Item key={index} label={month} value={month} />
              ))}
            </Picker>
            <Picker
              selectedValue={selectedStartDate.year}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setSelectedStartDate({ ...selectedStartDate, year: itemValue })
              }
            >
              {years.map(year => (
                <Picker.Item key={year} label={year} value={year} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.dateContainer}>
          <Text style={styles.dateLabel}>A:</Text>
          <View style={styles.pickerGroup}>
            <Picker
              selectedValue={selectedEndDate.day}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setSelectedEndDate({ ...selectedEndDate, day: itemValue })
              }
            >
              {days.map(day => (
                <Picker.Item key={day} label={day} value={day} />
              ))}
            </Picker>
            <Picker
              selectedValue={selectedEndDate.month}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setSelectedEndDate({ ...selectedEndDate, month: itemValue })
              }
            >
              {months.map((month, index) => (
                <Picker.Item key={index} label={month} value={month} />
              ))}
            </Picker>
            <Picker
              selectedValue={selectedEndDate.year}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setSelectedEndDate({ ...selectedEndDate, year: itemValue })
              }
            >
              {years.map(year => (
                <Picker.Item key={year} label={year} value={year} />
              ))}
            </Picker>
          </View>
        </View>

        <DropDownPicker
          open={open}
          value={selectedActivity}
          items={items}
          setOpen={setOpen}
          setValue={setSelectedActivity}
          setItems={setItems}
          placeholder="Selecione a atividade"
          style={styles.activityPicker}
          onChangeValue={handleSelection} 
        />

        {showHistoryButton && (
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => setShowHistoryButton(true)}
          >
            <LinearGradient
              colors={["#5859e9", "#52337c"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.confirmButtonInner}
            >
              <Text style={styles.confirmButtonText}>Ver Histórico</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        {showPercentage && renderPercentageComponent()}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 10,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dateLabel: {
    fontSize: 18,
    marginRight: 10,
  },
  pickerGroup: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#8183AF",
    borderRadius: 5,
    overflow: "hidden",
  },
  picker: {
    flex: 1,
    height: 50,
    borderBottomWidth: 0,
    backgroundColor: "#8183AF",
  },
  activityPicker: {
    width: "100%",
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "#8183AF",
    marginBottom: 20,
  },
  confirmButton: {
    height: 60,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonInner: {
    width: "100%",
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  percentageContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  percentageText: {
    fontSize: 42,
    fontWeight: "bold",
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  detailsButtonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  detailsButton: {
    width: width - 40, 
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  detailsButtonInner: {
    borderRadius: 5,
  },
  detailsButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
  },
});

export default HistoryScreen;