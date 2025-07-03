import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-gifted-charts';

const { width } = Dimensions.get('window');

const AnalyticsScreen = () => {
  // Sample data for Line Chart
  const lineData = [
    { value: 250, label: 'JAN' },
    { value: 300, label: 'FEB' },
    { value: 489, label: 'MAR' },
    { value: 350, label: 'APR' },
    { value: 200, label: 'MAY' },
    { value: 280, label: 'JUN' },
  ];

  // Sample data for Bar Chart
  const barData = [
    { value: 150, label: 'Week 1', frontColor: '#3CE0B4' },
    { value: 200, label: 'Week 2', frontColor: '#3CE0B4' },
    { value: 120, label: 'Week 3', frontColor: '#3CE0B4' },
    { value: 180, label: 'Week 4', frontColor: '#3CE0B4' },
  ];

  // Sample data for Pie Chart
  const pieData = [
    { value: 35, color: '#3CE0B4', text: '35%' },
    { value: 30, color: '#39C2DB', text: '30%' },
    { value: 25, color: '#3F8FFD', text: '25%' },
    { value: 10, color: '#E0E0E0', text: '10%' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Reportes</Text>
        <Image 
          source={require('../../assets/images/more.png')} 
          style={styles.moreIcon}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
       
        
        {/* Line Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Visitas Mensuales</Text>
          <Text style={styles.chartSubtitle}>15 April - 21 April</Text>
          <View style={styles.chartWrapper}>
            <LineChart
              data={lineData}
              width={width - 60}
              height={200}
              color="#39C2DB"
              thickness={3}
              dataPointsColor="#39C2DB"
              dataPointsRadius={6}
              startFillColor="#39C2DB"
              endFillColor="#39C2DB"
              startOpacity={0.3}
              endOpacity={0.1}
              areaChart
              curved
              hideRules
              hideYAxisText
              xAxisColor="#E0E0E0"
              yAxisColor="#E0E0E0"
              xAxisLabelTextStyle={styles.axisLabel}
              showVerticalLines={false}
              spacing={50}
              initialSpacing={20}
              endSpacing={20}
            />
            <View style={styles.valueContainer}>
              <Text style={styles.valueText}>489</Text>
              <Text style={styles.valueSubtext}>additional text</Text>
            </View>
          </View>
        </View>

        {/* Bar Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Ventas Semanales</Text>
          <Text style={styles.chartSubtitle}>Últimas 4 semanas</Text>
          <View style={styles.chartWrapper}>
            <BarChart
              data={barData}
              width={width - 80}
              height={200}
              barWidth={40}
              spacing={30}
              roundedTop
              roundedBottom
              hideRules
              hideYAxisText
              xAxisColor="#E0E0E0"
              yAxisColor="#E0E0E0"
              xAxisLabelTextStyle={styles.axisLabel}
              showVerticalLines={false}
              initialSpacing={20}
              endSpacing={20}
            />
          </View>
        </View>

        {/* Pie Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Distribución de Clientes</Text>
          <Text style={styles.chartSubtitle}>Por categoría</Text>
          <View style={styles.pieChartWrapper}>
            <PieChart
              data={pieData}
              radius={80}
              innerRadius={40}
              centerLabelComponent={() => (
                <View style={styles.centerLabel}>
                  <Text style={styles.centerLabelText}>Total</Text>
                  <Text style={styles.centerLabelValue}>1,234</Text>
                </View>
              )}
            />
            <View style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#3CE0B4' }]} />
                <Text style={styles.legendText}>Nuevos (35%)</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#39C2DB' }]} />
                <Text style={styles.legendText}>Regulares (30%)</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#3F8FFD' }]} />
                <Text style={styles.legendText}>VIP (25%)</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#E0E0E0' }]} />
                <Text style={styles.legendText}>Inactivos (10%)</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#333',
  },
  moreIcon: {
    width: 14,
    height: 14,
    tintColor: '#333',
  },
  chartContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
    borderColor: '#DCDCDC',
    borderWidth: 0.2,
  },
  chartTitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  chartSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  chartWrapper: {
    alignItems: 'center',
    position: 'relative',
  },
  pieChartWrapper: {
    alignItems: 'center',
  },
  axisLabel: {
    fontSize: 12,
    color: '#666',
  },
  valueContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  valueText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  valueSubtext: {
    fontSize: 12,
    color: '#666',
  },
  centerLabel: {
    alignItems: 'center',
  },
  centerLabelText: {
    fontSize: 12,
    color: '#666',
  },
  centerLabelValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  legendContainer: {
    marginTop: 20,
    alignItems: 'flex-start',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#333',
  },
});

export default AnalyticsScreen;
