import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Pressable,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Picker } from '@react-native-picker/picker';

const { width } = Dimensions.get("window");

const DetailsScreen: React.FC = () => {
  const activityName = "Atividade";

  const currentDate = new Date();
  const currentDay = currentDate.getDate().toString().padStart(2, '0');
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear().toString();

  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const weekDays = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

  const [startDay, setStartDay] = useState(currentDay);
  const [startMonth, setStartMonth] = useState(months[currentMonth]); 
  const [startYear, setStartYear] = useState(currentYear);

  const [endDay, setEndDay] = useState(currentDay);
  const [endMonth, setEndMonth] = useState(months[currentMonth]); 
  const [endYear, setEndYear] = useState(currentYear);

  const [percentage, setPercentage] = useState<number | null>(null);
  const [percentageColor, setPercentageColor] = useState("green");
  const [iconName, setIconName] = useState("smile");
  const [daysStatus, setDaysStatus] = useState<Map<string, string>>(new Map());

  const handlePressCheckButton = () => {
    const randomPercentage = () => Math.floor(Math.random() * 101);

    const newPercentage = randomPercentage();
    let newPercentageColor = "green";
    let newIconName = "smile";

    if (newPercentage < 60) {
      newPercentageColor = "red";
      newIconName = "sad-tear";
    } else if (newPercentage >= 60 && newPercentage <= 70) {
      newPercentageColor = "orange";
      newIconName = "exclamation-triangle";
    }

    setPercentage(newPercentage);
    setPercentageColor(newPercentageColor);
    setIconName(newIconName);

    console.log("Percentage:", newPercentage);
    console.log("Icon Name:", newIconName);

    const formatDate = (day: string, month: string, year: string) => {
      const monthToNumber = (month: string) => {
        const monthsArray = [
          "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
          "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ];
        return (monthsArray.indexOf(month) + 1).toString().padStart(2, '0');
      };
      return `${year}-${monthToNumber(month)}-${day}`;
    };

    const startDate = formatDate(startDay, startMonth, startYear);
    const endDate = formatDate(endDay, endMonth, endYear);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);

    simulateDaysStatus(new Date(startDate), new Date(endDate));
  };

  const getDaysBetweenDates = (startDate: Date, endDate: Date) => {
    let dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const simulateDaysStatus = (start: Date, end: Date) => {
    const daysBetween = getDaysBetweenDates(start, end);
    const statusOptions = ["A", "P", "J"];
    const newDaysStatus = new Map<string, string>();

    daysBetween.forEach((date) => {
      const randomStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];
      const dateKey = date.toISOString().split('T')[0]; // Formato: YYYY-MM-DD
      newDaysStatus.set(dateKey, randomStatus);
    });

    setDaysStatus(newDaysStatus);
  };

  const renderCalendar = () => {
    if (percentage !== null) {
      const start = new Date(`${startYear}-${(months.indexOf(startMonth) + 1).toString().padStart(2, '0')}-${startDay.padStart(2, '0')}`);
      const end = new Date(`${endYear}-${(months.indexOf(endMonth) + 1).toString().padStart(2, '0')}-${endDay.padStart(2, '0')}`);
      const daysBetween = getDaysBetweenDates(start, end);

      let calendarRows: JSX.Element[] = [];
      let currentRow: JSX.Element[] = [];
      
      
      calendarRows.push(
        <View key="header" style={styles.calendarRow}>
          {weekDays.map((day, index) => (
            <Text key={index} style={styles.calendarDayOfWeek}>{day}</Text>
          ))}
        </View>
      );

      
      const firstDayOfWeek = start.getDay();
      for (let i = 0; i < firstDayOfWeek; i++) {
        currentRow.push(
          <View key={`empty-${i}`} style={styles.calendarDayContainer}>
            <Text style={styles.calendarDayOfMonth}></Text>
          </View>
        );
      }

      
      daysBetween.forEach((date, index) => {
        const dayOfWeek = date.getDay(); // 0 (DOM) to 6 (SAB)
        const dayOfMonth = date.getDate();
        const dateKey = date.toISOString().split('T')[0];
        const status = daysStatus.get(dateKey) || "";

        let backgroundColor = "#E0E0E0";
        if (status === "A") backgroundColor = "green"; 
        if (status === "P") backgroundColor = "#ffcccc";
        if (status === "J") backgroundColor = "gray"; 

        if (dayOfWeek === 0 && currentRow.length > 0) {
          calendarRows.push(
            <View key={`row-${calendarRows.length}`} style={styles.calendarRow}>
              {currentRow}
            </View>
          );
          currentRow = [];
        }

        currentRow.push(
          <View key={index} style={[styles.calendarDayContainer, { backgroundColor }]}>
            <Text style={styles.calendarDayOfMonth}>{dayOfMonth}</Text>
          </View>
        );

        if (index === daysBetween.length - 1) {
          while (currentRow.length < 7) {
            currentRow.push(
              <View key={`empty-end-${currentRow.length}`} style={styles.calendarDayContainer}>
                <Text style={styles.calendarDayOfMonth}></Text>
              </View>
            );
          }
          calendarRows.push(
            <View key={`row-${calendarRows.length}`} style={styles.calendarRow}>
              {currentRow}
            </View>
          );
        }
      });

      return (
        <View style={styles.calendarContainer}>
          {calendarRows}
        </View>
      );
    }
    return null;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButtonContainer}>
          <Ionicons
            name="arrow-back-sharp"
            size={24}
            color="black"
            style={styles.backButton}
          />
        </Pressable>
        <Text style={styles.activityName}>{activityName}</Text>
        <FontAwesome5 name="calendar-check" size={34} color="black" style={styles.icon} />
      </View>
      <View style={styles.attendanceContainer}>
        <Text style={styles.attendanceText}>Presença</Text>
        {percentage !== null && (
          <View style={styles.percentageContainer}>
            <Text style={[styles.percentageText, { color: percentageColor }]}>
              {percentage}%
            </Text>
            <FontAwesome5
              name={iconName}
              size={54}
              color={percentageColor}
              style={styles.icon}
            />
          </View>
        )}
      </View>
      <View style={styles.datePickerContainer}>
        <Text style={styles.datePickerText}>De</Text>
        <Picker
          selectedValue={startDay}
          style={styles.picker}
          onValueChange={(itemValue) => setStartDay(itemValue)}
        >
          {[...Array(31).keys()].map(i => (
            <Picker.Item key={i} label={`${(i + 1).toString().padStart(2, '0')}`} value={`${(i + 1).toString().padStart(2, '0')}`} />
          ))}
        </Picker>
        <Picker
          selectedValue={startMonth}
          style={styles.picker}
          onValueChange={(itemValue) => setStartMonth(itemValue)}
        >
          {months.map((month, index) => (
            <Picker.Item key={index} label={month} value={month} />
          ))}
        </Picker>
        <Picker
          selectedValue={startYear}
          style={styles.picker}
          onValueChange={(itemValue) => setStartYear(itemValue)}
        >
          {[...Array(31).keys()].map(i => (
            <Picker.Item key={i} label={`${2000 + i}`} value={`${2000 + i}`} />
          ))}
        </Picker>
      </View>
      <View style={styles.datePickerContainer}>
        <Text style={styles.datePickerText}>A</Text>
        <Picker
          selectedValue={endDay}
          style={styles.picker}
          onValueChange={(itemValue) => setEndDay(itemValue)}
        >
          {[...Array(31).keys()].map(i => (
            <Picker.Item key={i} label={`${(i + 1).toString().padStart(2, '0')}`} value={`${(i + 1).toString().padStart(2, '0')}`} />
          ))}
        </Picker>
        <Picker
          selectedValue={endMonth}
          style={styles.picker}
          onValueChange={(itemValue) => setEndMonth(itemValue)}
        >
          {months.map((month, index) => (
            <Picker.Item key={index} label={month} value={month} />
          ))}
        </Picker>
        <Picker
          selectedValue={endYear}
          style={styles.picker}
          onValueChange={(itemValue) => setEndYear(itemValue)}
        >
          {[...Array(31).keys()].map(i => (
            <Picker.Item key={i} label={`${2000 + i}`} value={`${2000 + i}`} />
          ))}
        </Picker>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handlePressCheckButton}>
          <FontAwesome5 name="check" size={24} color="white" />
        </Pressable>
      </View>
      {renderCalendar()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  backButtonContainer: {
    padding: 5,
  },
  backButton: {
    color: "black",
    fontSize: 32,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    width: width,
    paddingTop: 20,
  },
  activityName: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  icon: {
    marginHorizontal: 20,
  },
  attendanceContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  attendanceText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  percentageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  percentageText: {
    fontSize: 32,
    fontWeight: "bold",
    marginRight: 10,
  },
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: width,
    paddingVertical: 8,
    marginTop: 20,
  },
  datePickerText: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 8,
  },
  picker: {
    height: 50,
    width: width / 3 - 20,
    backgroundColor: "#8183AF",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  calendarContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
    width: width - 40, 
  },
  calendarRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  calendarDayOfWeek: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: 'center',
    flex: 1,
  },
  calendarDayContainer: {
    alignItems: "center",
    marginBottom: 10,
    flex: 1,
  },
  calendarDayOfMonth: {
    fontSize: 16,
    marginTop: 0,
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    minWidth: 40, 
  },
});

export default DetailsScreen;
