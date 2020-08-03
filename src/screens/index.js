import React from 'react';
import {
    Dimensions,
    Text,
    ScrollView,
    TouchableOpacity,
    View,
    SafeAreaView,
} from "react-native";
import EventCalendar from 'react-native-events-calendar'
import moment from "moment";
import { Header, Left, Right, Icon, Button } from 'native-base';
import DailyEvents from '../components/DailyEvents';
import WeeklyEvents from '../components/WeeklyEvents';
import MonthlyEvents from '../components/MonthlyEvents';

class Main extends React.Component {
    state = {
        selected: "day",
    }
    render() {
        const { selected, } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: "#efeff4" }}>
                <Header>
                    <Left style={{ flexDirection: "row", alignItems: "center", }}>
                        <TouchableOpacity>
                            <Icon
                                type={"Ionicons"}
                                name={"ios-arrow-back"}
                                style={{ color: "#000", }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 10, }}>Back</Text>
                        </TouchableOpacity>
                    </Left>
                    <View style={{ justifyContent: "center" }}>
                        <Text style={{ fontSize: 22, fontWeight: "700", marginTop: 8, }}>{moment().format('MMMM')}</Text>
                    </View>
                    <Right>
                        <TouchableOpacity>
                            <Icon
                                type={"Ionicons"}
                                name={"ios-document"}
                                style={{ color: "#ccc", }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon
                                type={"Ionicons"}
                                name={"ios-grid"}
                                style={{ color: "#ccc", marginLeft: 20, }}
                            />
                        </TouchableOpacity>
                    </Right>
                </Header>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    height: 70,
                    backgroundColor: "#fff",
                    // paddingHorizontal: 10,
                }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: selected === "day" ? "#fee028" : "#F8F8F8",
                            height: 40,
                            // width: "40%",
                            paddingHorizontal: 40,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 3,
                            marginRight: 10,
                            marginTop: 15,
                        }}
                        onPress={() => this.setState({ selected: "day" })}
                        >
                        <Text style={{ fontWeight: "bold", color: "#bbb", }}>Day</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            backgroundColor: selected === "week" ? "#fee028" : "#F8F8F8",
                            height: 40,
                            // width: "40%",
                            paddingHorizontal: 40,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 3,
                            marginRight: 10,
                            marginTop: 15,
                        }}
                        onPress={() => this.setState({ selected: "week" })}
                        >
                        <Text style={{ fontWeight: "bold", }}>Week</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            backgroundColor: selected === "month" ? "#fee028" : "#F8F8F8",
                            height: 40,
                            // width: "40%",
                            paddingHorizontal: 40,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 3,
                            marginRight: 10,
                            marginTop: 15,
                        }}
                        onPress={() => this.setState({ selected: "month" })}
                        >
                        <Text style={{ fontWeight: "bold", }}>Month</Text>
                    </TouchableOpacity>
                </View>

                {selected && selected == "day" ? <DailyEvents /> : selected === "week" ? <WeeklyEvents /> : <MonthlyEvents />}

            </View>
        )
    }
}

export default Main;