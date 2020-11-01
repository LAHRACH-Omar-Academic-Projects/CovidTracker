import React from 'react';
import { FlatList, Text, ScrollView, ActivityIndicator } from "react-native";
import { Container, Header, Left, Body, Right, Button, Title, View } from 'native-base';
import styles from './styles';
import MenuIcon from 'react-native-vector-icons/Ionicons';
import { readRemoteFile } from 'react-papaparse';

const Item = ({ item }) => (
    <View style={styles.item}>
        <Text style={styles.region}>{item["region"]}</Text>
        <Text style={styles.cases}>{item["cases"] + "%"}</Text>
    </View>
);

export default class Statistic extends React.Component {
    constructor(props) {
        super(props);
        this.urlA = 'https://raw.githubusercontent.com/aboullaite/Covid19-MA/master/stats/regions.csv';
        this.urlB = 'https://raw.githubusercontent.com/aboullaite/Covid19-MA/master/stats/MA-times_series.csv';
        this.state = {
            lastUpdateDate: "",
            lastCases: 0,
            lastDeaths: 0,
            lastRecoveries: 0,
            totalCases: 0,
            totalDeaths: 0,
            totalActiveCases: 0,
            totalRecoveries: 0,
            casesByRegion: [],
            loading: true
        }
    }

    getLastData(dataType) {
        readRemoteFile(
            this.urlB,
            {
                complete: (res) => {
                    var data = res.data;
                    data.shift();
                    var lastData = 0;
                    if (dataType === "cases") {
                        lastData = data[data.length - 3][1] - data[data.length - 4][1];
                        this.setState({
                            lastCases: lastData
                        })
                    }
                    else if (dataType === "deaths") {
                        lastData = data[data.length - 3][3] - data[data.length - 4][3];
                        this.setState({
                            lastDeaths: lastData
                        })
                    }
                    else if (dataType === "recoveries") {
                        lastData = data[data.length - 3][2] - data[data.length - 4][2];
                        this.setState({
                            lastRecoveries: lastData
                        })
                    }
                    else {
                        lastData = data[data.length - 3][0];
                        this.setState({
                            lastUpdateDate: lastData
                        })
                    }
                }
            }
        )
    }

    getTotalData(dataType) {
        readRemoteFile(
            this.urlB,
            {
                complete: (res) => {
                    var data = res.data;
                    data.shift();
                    var totalData = 0;
                    if (dataType === "cases") {
                        totalData = data[data.length - 3][1];
                        this.setState({
                            totalCases: totalData
                        })
                    }
                    else if (dataType === "deaths") {
                        totalData = data[data.length - 3][3];
                        this.setState({
                            totalDeaths: totalData
                        })
                    }
                    else if (dataType === "activeCases") {
                        totalData = data[data.length - 3][1] - data[data.length - 3][3] - data[data.length - 3][2];
                        this.setState({
                            totalActiveCases: totalData
                        })
                    }
                    else if (dataType === "recoveries") {
                        totalData = data[data.length - 3][2];
                        this.setState({
                            totalRecoveries: totalData
                        })
                    }
                }
            }
        )
    }

    getCasesByRegion() {
        readRemoteFile(
            this.urlA,
            {
                complete: (res) => {
                    var data = res.data;
                    data.shift();
                    var totalCases = 0;
                    data.forEach(region => {
                        totalCases += parseInt(region[1]);
                    });
                    var casesByRegion = [];
                    data.forEach(element => {
                        var region = element[0];
                        var casesNumber = parseInt(element[1]);
                        var casesPourecentage = (casesNumber / totalCases) * 100;
                        casesByRegion.push({ "region": region, "cases": casesPourecentage.toFixed(2) });
                    });
                    casesByRegion.sort((a, b) => parseInt(a.cases) < parseInt(b.cases) ? 1 : -1);
                    this.setState({
                        casesByRegion: casesByRegion
                    })
                }
            }
        )
    }

    UNSAFE_componentWillMount() {
        this.getLastData("date");
        this.getLastData("cases");
        this.getLastData("deaths");
        this.getLastData("recoveries");

        this.getTotalData("cases");
        this.getTotalData("deaths");
        this.getTotalData("activeCases");
        this.getTotalData("recoveries");

        this.getCasesByRegion();
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 2000)
    }

    displayLoading() {
        if (this.state.loading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' color='rgba(98,80,255,0.8)' />
                    <Text style={styles.loadingText}>Loading statistics</Text>
                </View>
            )
        }
    }

    render() {
        return (
            <Container>
                <Header style={styles.header}>
                    <Left>
                        <Button transparent onPress={() => { this.props.navigation.openDrawer() }}>
                            <MenuIcon name='md-menu' color='rgba(98,80,255,0.8)' size={25} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.headerText}>Statistic</Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <View style={styles.container}>
                    {this.displayLoading()}
                    {this.state.loading == false &&
                        <ScrollView>
                            <View style={styles.title}>
                                <Text style={styles.text1}>Last statistics</Text>
                                <Text style={styles.text2}>Last update :{this.state.lastUpdateDate}</Text>
                            </View>
                            <View style={styles.lastData}>
                                <View style={styles.lastCases}>
                                    <Text style={styles.text3}>Last Cases :{this.state.lastCases}</Text>
                                </View>
                                <View style={styles.lastDeaths}>
                                    <Text style={styles.text4}>Last Deaths :{this.state.lastDeaths}</Text>
                                </View>
                                <View style={styles.lastRecoveries}>
                                    <Text style={styles.text5}>Last Recoveries : {this.state.lastRecoveries}</Text>
                                </View>
                            </View>
                            <View style={styles.title}>
                                <Text style={styles.text6}>Total Statistics</Text>
                            </View>
                            <View style={styles.totalData}>
                                <View style={styles.totalCases}>
                                    <Text style={styles.text7}>Total Cases : {this.state.totalCases}</Text>
                                </View>
                                <View style={styles.totalDeaths}>
                                    <Text style={styles.text8}>Total Deaths : {this.state.totalDeaths}</Text>
                                </View>
                                <View style={styles.totalRecoveries}>
                                    <Text style={styles.text9}>Total Recoveries : {this.state.totalRecoveries}</Text>
                                </View>
                                <View style={styles.totalActiveCases}>
                                    <Text style={styles.text10}>Active Cases :  {this.state.totalActiveCases}</Text>
                                </View>
                            </View>

                            <View style={styles.title}>
                                <Text style={styles.text11}>Breakdown by region</Text>
                            </View>
                            <View style={styles.statsByRegion}>
                                <FlatList
                                    data={this.state.casesByRegion}
                                    renderItem={({ item }) => <Item item={item} />}
                                    keyExtractor={(item) => item[0]}
                                />
                            </View>
                        </ScrollView>
                    }
                </View>
            </Container>
        );
    }
};