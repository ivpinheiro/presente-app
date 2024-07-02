import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DropDownPicker from "react-native-dropdown-picker";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { API_URL } from "@/app/context/AuthContext";
import axios from "axios";
import { Link } from "expo-router";

const { width } = Dimensions.get("window");

const HistoryScreen: React.FC = () => {
  const [selectedStartDate, setSelectedStartDate] = useState({
    day: "1",
    month: "Janeiro",
    year: "2024",
  });
  const [selectedEndDate, setSelectedEndDate] = useState({
    day: "1",
    month: "Janeiro",
    year: "2024",
  });
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  //Esses items devem vir das atividades cadastradas no backend
  const [items, setItems] = useState([{}]);

  const getActivities = async () => {
    try {
      return await axios.get(`${API_URL}/activities`);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error("Error message:", error.message);
        if (error.response) {
          console.error("Data:", error.response.data);
        } else if (error.request) {
          console.error("Request:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const years = Array.from({ length: 100 }, (_, i) => (2024 - i).toString());

  const [showHistoryButton, setShowHistoryButton] = useState(false);
  const [showPercentage, setShowPercentage] = useState(false);
  const [randomPercentage, setRandomPercentage] = useState(0);
  const fetchData = async () => {
    try {
      const activities = await getActivities();

      const months = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ];

      const dtStart = new Date(
        `${selectedStartDate.year}-${
          months.findIndex((month) => month === selectedStartDate.month) + 1
        }-${selectedStartDate.day}`
      );

      const dtEnd = new Date(
        `${selectedEndDate.year}-${
          months.findIndex((month) => month === selectedEndDate.month) + 1
        }-${selectedEndDate.day}`
      );

      const mappedItems = activities?.data
        .filter((item: any) => {
          const itemDate = new Date(item.startDate);
          return itemDate >= dtStart && itemDate <= dtEnd;
        })
        .map((item: any) => ({
          title: item.title,
        }));

      console.log(mappedItems);

      const mappedItemsLabel = mappedItems.map((item: any) => ({
        label: item.title,
        value: item.title,
      }));

      setItems(mappedItemsLabel);
    } catch (error) {
      console.error("Ocorreu um erro ao buscar atividades:", error);
    }
  };

  // Array para armazenar os logs das seleções
  const logs: string[] = [];

  // Deve ser enviado para o backend
  const handleSelection = async () => {
    const log =
      `Data de Início: ${selectedStartDate.day}/${selectedStartDate.month}/${selectedStartDate.year}, ` +
      `Data de Fim: ${selectedEndDate.day}/${selectedEndDate.month}/${selectedEndDate.year}, ` +
      `Atividade Selecionada: ${selectedActivity}`;
    logs.push(log);
    console.log(log);

    if (
      selectedStartDate.day &&
      selectedStartDate.month &&
      selectedStartDate.year &&
      selectedEndDate.day &&
      selectedEndDate.month &&
      selectedEndDate.year &&
      selectedActivity
    ) {
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
        <FontAwesome5
          name={icon as any}
          size={70}
          color={textColor}
          style={styles.icon}
        />
        <Text style={[styles.percentageText, { color: textColor }]}>
          {randomPercentage}%
        </Text>
        {/* Botão "Detalhes" */}
        <View style={styles.detailsButtonContainer}>
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={handleDetailsPress}
          >
            <LinearGradient
              colors={["#5859e9", "#52337c"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.detailsButtonInner}
            >
              <Link href="details">
                <Text style={styles.detailsButtonText}>Detalhes</Text>
              </Link>
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
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Ver histórico de presença</Text>
        <FontAwesome5
          name="calendar-check"
          size={54}
          color="black"
          style={styles.icon}
        />
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
            {days.map((day) => (
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
            {years.map((year) => (
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
            {days.map((day) => (
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
            {years.map((year) => (
              <Picker.Item key={year} label={year} value={year} />
            ))}
          </Picker>
        </View>
      </View>
      <TouchableOpacity onPress={() => fetchData()}>
        <LinearGradient
          colors={["#5859e9", "#52337c"]}
          style={styles.buttonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.buttonText}>Buscar atividades</Text>
        </LinearGradient>
      </TouchableOpacity>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "space-between",
    padding: 20,
    marginTop: 90,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 10,
    color: "#242760",
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
    padding: 5,
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
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButtonInner: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
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
    color: "#242760",
    fontSize: 80,
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
  buttonGradient: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    height: 60,
    width: "50%",
    alignSelf: "center",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default HistoryScreen;
