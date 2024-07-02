import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { API_URL } from "@/app/context/AuthContext";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const HomeScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dayOfWeek, setDayOfWeek] = useState<string>("");
  const [dayActivities, setDayActivities] = useState<
    Array<{ name: string; id: string; start: string }>
  >([]); // Array para armazenar as atividades do dia
  const [activitiesGlobal, setActivitiesGlobal] = useState<Array<string> | any>(
    []
  ); // Array para armazenar as atividades do dia
  const [selectedActivityIndex, setSelectedActivityIndex] = useState<
    number | null
  >(null); // Índice da atividade selecionada
  const [presenceCount, setPresenceCount] = useState<number>(0); // Contador de presenças
  const [absenceCount, setAbsenceCount] = useState<number>(0); // Contador de ausências

  // Gerar listas de valores para os seletores
  const years = Array.from({ length: 71 }, (_, index) => 1960 + index);
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
  const daysOfMonth = Array.from({ length: 31 }, (_, index) =>
    `${index + 1}`.padStart(2, "0")
  ); // 01 to 31
  const daysOfWeek = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];

  // Referências para os ScrollViews
  const yearsScrollViewRef = useRef<ScrollView>(null);
  const monthsScrollViewRef = useRef<ScrollView>(null);
  const daysOfMonthScrollViewRef = useRef<ScrollView>(null);

  // Data atual
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonthIndex = currentDate.getMonth();
  const currentDayOfMonth = currentDate.getDate() - 1;

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

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setSelectedDate(
          new Date(currentYear, currentMonthIndex, currentDayOfMonth)
        );

        // Rolar para o ano atual
        if (yearsScrollViewRef.current) {
          const yearIndex = years.findIndex((year) => year === currentYear);
          const xOffsetYear = yearIndex * (width - 30);
          yearsScrollViewRef.current.scrollTo({
            x: xOffsetYear,
            animated: true,
          });
        }

        // Rolar para o mês atual
        if (monthsScrollViewRef.current) {
          const xOffsetMonth = currentMonthIndex * (width - 30);
          monthsScrollViewRef.current.scrollTo({
            x: xOffsetMonth,
            animated: true,
          });
        }

        // Rolar para o dia do mês atual
        if (daysOfMonthScrollViewRef.current) {
          const xOffsetDayOfMonth = currentDayOfMonth * (width - 30);
          daysOfMonthScrollViewRef.current.scrollTo({
            x: xOffsetDayOfMonth,
            animated: true,
          });
        }

        try {
          // Obter atividades
          const activities = await getActivities();
          const dayIndex = new Date().getDay();
          if (activities?.data) {
            const actGlobal = activities?.data?.flatMap((item: any) => {
              return item.activitiesWeek.flatMap((it: any) => {
                if (it.dayWeek === dayIndex.toString()) {
                  return item;
                }
                return [];
              });
            });
            setActivitiesGlobal(actGlobal ? actGlobal : []);
            const act = activities?.data?.flatMap((item: any) => {
              return item.activitiesWeek.flatMap((it: any) => {
                if (it.dayWeek === dayIndex.toString()) {
                  const activities = it.activityTime.map((dt: any) => {
                    return {
                      name: `${item.title} - ${dt.start}hr às ${dt.end}hr`,
                      id: item._id,
                      start: dt.start,
                    };
                  });
                  return activities;
                }
                return [];
              });
            });
            setDayActivities(act);
          }
        } catch (error) {
          console.error("Error fetching activities:", error);
        }
      };
      fetchData();
    }, [currentYear, currentMonthIndex, currentDayOfMonth])
  );

  // Função para atualizar a data selecionada
  const updateSelectedDate = (
    year: number,
    monthIndex: number,
    dayOfMonth: number
  ) => {
    setSelectedDate(new Date(year, monthIndex, dayOfMonth));
    const dayIndex = new Date(year, monthIndex, dayOfMonth).getDay();
    setDayOfWeek(daysOfWeek[dayIndex - 1]);
  };

  // Para puxar as atividades para const activities, usar dayOfWeek
  const handleDateUpdate = () => {
    console.log("Selected Date:", selectedDate);
    console.log("Day of Week:", dayOfWeek);
  };

  // Função para lidar com a seleção de uma atividade
  const handleActivityPress = (index: number) => {
    setSelectedActivityIndex(index === selectedActivityIndex ? null : index);
  };

  // Função para lidar com a presença do usuário
  // Aqui pode ser usado para calcular o percentual de precença e enviar de volta pro backed
  const handlePresence = async () => {
    if (selectedActivityIndex !== null) {
      setPresenceCount((prevCount) => prevCount + 1);
      setSelectedActivityIndex(null);
      const updatedActivity = activitiesGlobal.map((item: any) => {
        if (item._id === dayActivities[selectedActivityIndex].id) {
          return {
            ...item,
            activitiesWeek: item.activitiesWeek.map(
              (activitiesWeekItem: any) => {
                return {
                  ...activitiesWeekItem,
                  activityTime: activitiesWeekItem.activityTime.map(
                    (activityTimeItem: any) => {
                      if (
                        activityTimeItem.start ===
                        dayActivities[selectedActivityIndex].start
                      ) {
                        return {
                          ...activityTimeItem,
                          presenceActivity: [
                            ...activityTimeItem.presenceActivity,
                            {
                              dateTime: currentDate,
                              isPresent: true,
                            },
                          ],
                        };
                      }
                      return activityTimeItem;
                    }
                  ),
                };
              }
            ),
          };
        }
        return item;
      });
      // console.log(
      //   updatedActivity[0].activitiesWeek[0].activityTime[0].presenceActivity
      // );
      const { _id, ...updatedActivityNoId } = updatedActivity[0];
      try {
        return await axios.patch(
          `${API_URL}/activities/${dayActivities[selectedActivityIndex].id}`,
          updatedActivityNoId
        );
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          console.error("Error message:", error.message);
          if (error.response) {
            console.error("Status:", error.response.status);
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
    }
  };

  // Função para lidar com a ausência do usuário
  // Aqui pode ser usado para calcular o percentual de precença e enviar de volta pro backed
  const handleAbsence = async () => {
    if (selectedActivityIndex !== null) {
      const updatedActivity = activitiesGlobal.map((item: any) => {
        if (item._id === dayActivities[selectedActivityIndex].id) {
          return {
            ...item,
            activitiesWeek: item.activitiesWeek.map(
              (activitiesWeekItem: any) => {
                return {
                  ...activitiesWeekItem,
                  activityTime: activitiesWeekItem.activityTime.map(
                    (activityTimeItem: any) => {
                      if (
                        activityTimeItem.start ===
                        dayActivities[selectedActivityIndex].start
                      ) {
                        return {
                          ...activityTimeItem,
                          presenceActivity: [
                            ...activityTimeItem.presenceActivity,
                            {
                              dateTime: currentDate,
                              isPresent: false,
                            },
                          ],
                        };
                      }
                      return activityTimeItem;
                    }
                  ),
                };
              }
            ),
          };
        }
        return item;
      });
      // console.log(
      //   updatedActivity[0].activitiesWeek[0].activityTime[0].presenceActivity
      // );
      const { _id, ...updatedActivityNoId } = updatedActivity[0];
      try {
        return await axios.patch(
          `${API_URL}/activities/${dayActivities[selectedActivityIndex].id}`,
          updatedActivityNoId
        );
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          console.error("Error message:", error.message);
          if (error.response) {
            console.error("Status:", error.response.status);
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
      setAbsenceCount((prevCount) => prevCount + 1);
      setSelectedActivityIndex(null);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View>
          <FontAwesome5 name="user" size={60} style={styles.userIcon} />
        </View>
        <View>
          <FontAwesome5
            name="calendar-check"
            size={60}
            style={styles.calendarIcon}
          />
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.yearsContentContainer}
        style={styles.yearsContainer}
        ref={yearsScrollViewRef}
        snapToInterval={width - 30}
        decelerationRate="fast"
        snapToAlignment="center"
        onScroll={(event) => {
          const contentOffsetX = event.nativeEvent.contentOffset.x;
          const index = Math.round(contentOffsetX / (width - 30));
          updateSelectedDate(
            years[index],
            selectedDate.getMonth(),
            selectedDate.getDate()
          );
          if (index === years.length) {
            setTimeout(() => {
              yearsScrollViewRef.current?.scrollTo({ x: 0, animated: false });
            }, 250); // Delay para animação suave
          }
        }}
      >
        {years.map((year, index) => (
          <View style={styles.yearItem} key={index}>
            <Text style={styles.yearText}>{year}</Text>
          </View>
        ))}
      </ScrollView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.monthsContentContainer}
        style={styles.monthsContainer}
        ref={monthsScrollViewRef}
        snapToInterval={width - 30}
        decelerationRate="fast"
        snapToAlignment="center"
        onScroll={(event) => {
          const contentOffsetX = event.nativeEvent.contentOffset.x;
          const index = Math.round(contentOffsetX / (width - 30));
          updateSelectedDate(
            selectedDate.getFullYear(),
            index,
            selectedDate.getDate()
          );
          if (index === months.length) {
            setTimeout(() => {
              monthsScrollViewRef.current?.scrollTo({ x: 0, animated: false });
            }, 250); // Delay para animação suave
          }
        }}
      >
        {months.map((month, index) => (
          <View style={styles.monthItem} key={index}>
            <Text style={styles.monthText}>{month}</Text>
          </View>
        ))}
      </ScrollView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.daysOfMonthContentContainer}
        style={styles.daysOfMonthContainer}
        ref={daysOfMonthScrollViewRef}
        snapToInterval={width - 30}
        decelerationRate="fast"
        snapToAlignment="center"
        onScroll={(event) => {
          const contentOffsetX = event.nativeEvent.contentOffset.x;
          const index = Math.round(contentOffsetX / (width - 30));
          updateSelectedDate(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            index + 1
          );
          if (index === daysOfMonth.length) {
            setTimeout(() => {
              daysOfMonthScrollViewRef.current?.scrollTo({
                x: 0,
                animated: false,
              });
            }, 250); // Delay para animação suave
          }
        }}
      >
        {daysOfMonth.map((day, index) => (
          <View style={styles.dayOfMonthItem} key={index}>
            <Text style={styles.dayOfMonthText}>{day}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={handleDateUpdate}>
          <FontAwesome5 name="check" size={24} style={styles.icon} />
        </TouchableOpacity>
        <TextInput
          style={styles.dayOfWeekText}
          editable={false}
          value={dayOfWeek}
        />
      </View>
      <View style={styles.activitiesContainer}>
        {dayActivities?.map((activity, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.activityText,
              selectedActivityIndex === index && { backgroundColor: "#FFFF" },
            ]}
            onPress={() => handleActivityPress(index)}
          >
            <Text>{activity.name}</Text>
            {selectedActivityIndex === index && (
              <View style={styles.activityButtons}>
                <TouchableOpacity
                  style={[styles.button, styles.presentButton]}
                  onPress={handlePresence}
                  disabled={selectedActivityIndex !== index}
                >
                  <Text style={styles.buttonText}>Presente</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.absentButton]}
                  onPress={handleAbsence}
                  disabled={selectedActivityIndex !== index}
                >
                  <Text style={styles.buttonText}>Ausente</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
      <Link href="/register-activity" asChild style={styles.addButtonContainer}>
        <Pressable>
          <Ionicons name="add-circle-outline" style={styles.addButton} />
        </Pressable>
      </Link>
      {/* <View style={styles.statsContainer}>
        <Text style={styles.statsText}>Presenças: {presenceCount}</Text>
        <Text style={styles.statsText}>Ausências: {absenceCount}</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    width: "90%",
    marginBottom: 100,
  },
  userIcon: {
    color: "#242760",
    fontSize: 80,
  },
  calendarIcon: {
    color: "#242760",
    fontSize: 80,
  },
  icon: {
    color: "#242760",
  },
  yearsContentContainer: {
    alignItems: "center",
  },
  yearsContainer: {
    marginTop: 20,
    maxHeight: 50,
    width: width - 40,
  },
  yearItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginRight: 10,
    minWidth: width - 40,
    alignItems: "center",
    justifyContent: "center",
  },
  yearText: {
    textAlign: "center",
  },
  monthsContainer: {
    marginTop: 20,
    maxHeight: 50,
    width: width - 40,
  },
  monthsContentContainer: {
    alignItems: "center",
  },
  monthItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginRight: 10,
    minWidth: width - 40,
    alignItems: "center",
    justifyContent: "center",
  },
  monthText: {
    textAlign: "center",
  },
  daysOfMonthContainer: {
    marginTop: 20,
    maxHeight: 50,
    width: width - 40,
  },
  daysOfMonthContentContainer: {
    alignItems: "center",
  },
  dayOfMonthItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginRight: 10,
    minWidth: width - 40,
    alignItems: "center",
    justifyContent: "center",
  },
  dayOfMonthText: {
    textAlign: "center",
  },
  activitiesContainer: {
    marginTop: 20,
    width: width - 40,
  },
  activityText: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#8183AF",
    borderRadius: 10,
    marginBottom: 10,
    color: "white",
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width - 40,
    marginTop: 20,
  },
  checkButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#dcdcdc",
  },
  dayOfWeekText: {
    flex: 1,
    marginLeft: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    textAlign: "center",
  },
  activityButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  presentButton: {
    backgroundColor: "green",
  },
  absentButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  statsContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  statsText: {
    fontSize: 18,
    marginBottom: 5,
  },
  addButtonContainer: {
    alignSelf: "flex-end",
  },
  addButton: {
    color: "#242760",
    fontSize: 50,
  },
});

export default HomeScreen;
