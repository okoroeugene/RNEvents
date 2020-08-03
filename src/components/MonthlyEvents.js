import React from 'react';
import {
    Dimensions,
    ScrollView,
    TouchableOpacity,
    View,
    SafeAreaView,
} from "react-native";
import EventCalendar from 'react-native-events-calendar'
import moment from "moment";
import { Header, Left, Right, Icon } from 'native-base';
import Text from '../settings/AppText';
// import * as Progress from 'react-native-progress';

let { width } = Dimensions.get('window')

const year = moment().year();
const month = moment().month();
const _month_ = (moment().month() + 1);

class MonthlyEvents extends React.Component {
    state = {
        selectedMonth: undefined,
        hourData: [
            { hours: 8, volume: 25 },
            { hours: 11, volume: 15 },
            { hours: 3, volume: 21 },
            { hours: 4, volume: 47 },
            { hours: 20, volume: 38 }
        ],
    }

    // componentDidMount(){
    //     alert(moment().format("dddd"))
    // }

    getMonthDays(month) {
        if (month == "February") {
            return 28;
        } else if (month == "April" || month == "June" || month == "September" || month == "November") {
            return 30;
        } else {
            return 31;
        }
    }

    renderMonths() {
        const {
            selectedMonth,
        } = this.state;
        var result = [];
        for (let i = 1; i <= 12; i++) {
            var myDate = `${moment().year()}-${("0" + i).slice(-2)}-${("0" + i).slice(-2)}T00:00:00`;
            var monthName = moment(myDate).format("MMMM").slice(0, 3);

            let e = <TouchableOpacity
                key={i}
                onPress={() => this.setState({ selectedMonth: i })}
                style={{
                    backgroundColor: (selectedMonth || moment().format("MM").slice(-1)) == i ? "#fee028" : "#F8F8F8",
                    height: 55,
                    width: 60,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 3,
                    marginRight: 10,
                }}>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: (selectedMonth || moment().format("MM").slice(-1)) == i ? "#000" : "#ccc" }}>{monthName}</Text>
                {/* <Text style={{ fontSize: 12, }}>{monthName}</Text> */}
            </TouchableOpacity>
            result.push(e);
        }
        return result;
    }

    renderSide() {
        const {
            hourData,
        } = this.state;
        var result = [];
        let sorted = hourData.sort((a, b) => a.hours - b.hours);
        for (let i = sorted[0].hours; i <= sorted[sorted.length - 1].hours; i++) {
            let e = <View style={{ height: 50, }} key={i}>
                <Text style={{ color: "#bbb", fontWeight: "bold", }}>{`${i}h`}</Text>
            </View>;
            result.push(e);
        }
        return result;
    }

    renderMain() {
        const {
            hourData,
        } = this.state;
        var result = [];
        let sorted = hourData.sort((a, b) => a.hours - b.hours);
        for (let i = sorted[0].hours; i <= sorted[sorted.length - 1].hours; i++) {
            let a = sorted.filter(r => r.hours == i);
            const width = a.length ? a[0].volume : 0;
            let e = <View style={{ height: 50, }} key={i}>
                {/* <Text>{`${a.length ? a[0].volume : 0}`}</Text> */}
                {a.length ? <View style={{
                    height: 18,
                    justifyContent: "center",
                }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{
                            height: 5,
                            width: `${(width / 80) * 100}%`,
                            backgroundColor: "#fee028",
                            borderRadius: 3,
                        }}>

                        </View>

                        <Text style={{ fontWeight: "bold", color: "#000", paddingLeft: 10, }}>{width}</Text>
                    </View>
                </View> : null}
            </View>;
            result.push(e);
        }
        return result;
    }

    renderCard() {
        const {
            hourData,
            selectedMonth,
        } = this.state;

        let sorted = hourData.sort((a, b) => a.hours - b.hours);

        return [...Array(30).keys()].map((e, i) => {

            e = e + 1;
            let a = sorted.filter(r => r.hours == i);
            const width = a.length ? a[0].volume : null;

            var myDate = `${year}-${("0" + _month_).slice(-2)}-${("0" + e).slice(-2)}T00:00:00`;
            var weekDayName = moment(myDate).format("dddd").slice(0, 3);

            return (
                <View key={i} style={{
                    marginTop: 10,
                    backgroundColor: "#fff",
                    marginHorizontal: 20,
                    padding: 10,
                    flexDirection: "row",
                    borderRadius: 3,
                }}>
                    <View style={{ flexDirection: "row", }}>

                        <View style={{ flexDirection: "row", width: "85%", }}>
                            <View style={{ height: 40, justifyContent: "center", alignItems: "center", paddingHorizontal: 10, }}>
                                <Text style={{ color: "#bbb", fontSize: 20, fontWeight: "bold", }}>{`${e}`}</Text>
                                <Text style={{ color: "#bbb", fontSize: 12, }}>{weekDayName}</Text>
                            </View>

                            <View style={{ borderWidth: 0.5, borderColor: "#ccc", height: "100%", marginHorizontal: 15, }}></View>

                            <View style={{
                                height: 40,
                                justifyContent: "center",
                            }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{
                                        height: 5,
                                        width: `${(width / 80) * 100}%`,
                                        backgroundColor: "#fee028",
                                        borderRadius: 3,
                                    }}>
                                    </View>

                                    <Text style={{ fontWeight: "bold", color: "#000", paddingLeft: 10, }}>{width}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ width: "13%", justifyContent: "center", alignItems: "flex-end", }}>
                            <Icon
                                style={{ fontSize: 22, color: "#ccc", }}
                                name={"ios-arrow-forward"} />
                        </View>
                    </View>
                </View>
            )
        })
    }

    render() {
        const {
            hourData,
        } = this.state;
        return (
            <>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ height: 100, marginTop: 20, }}
                >
                    {this.renderMonths()}
                </ScrollView>
                <ScrollView contentContainerStyle={{ flexGrow: 1, }}>
                    {this.renderCard()}
                </ScrollView>
            </>
        )
    }
}

export default MonthlyEvents;