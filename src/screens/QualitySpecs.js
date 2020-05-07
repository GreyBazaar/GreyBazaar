import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, ActivityIndicator, YellowBox } from 'react-native'

import colors from '../../assets/colors'


export default class QualitySpecs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            reqID: '',
            qualityType: '',
            quantity: '',

        }
    }

    render() {
        return (
            <View>
                <Text>QUALITY SPECS</Text>
            </View>
        )
    }
}