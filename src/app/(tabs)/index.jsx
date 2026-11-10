import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../../theme';
import { dashboardData } from '../../data';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const router = useRouter();
  const { theme, isDark, toggleTheme } = useTheme();
  const [selectedDate, setSelectedDate] = useState('06 May');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]} edges={['top']}>
      {/* Top Header Bar (Sketch: Dashboard) */}
      <View style={styles.topBar}>
        <Text style={[styles.screenTitle, { color: theme.text }]}>Dashboard</Text>

        <View style={styles.topRightActions}>
          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: theme.surface, marginRight: 8 }]}
            onPress={toggleTheme}
          >
            <Ionicons name={isDark ? 'sunny' : 'moon'} size={18} color={colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: theme.surface }]}
            onPress={() => router.push('/(tabs)/transfer')}
          >
            <Ionicons name="swap-horizontal" size={20} color={theme.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Income & Expenses Metric Badges (Sketch: Income 87% / Expenses 46%) */}
        <View style={styles.metricRow}>
          <View style={[styles.metricCard, { backgroundColor: colors.incomeGreenSoft }]}>
            <View style={[styles.metricDot, { backgroundColor: colors.incomeGreen }]} />
            <View style={styles.metricTexts}>
              <Text style={[styles.metricLabel, { color: colors.incomeGreen }]}>Income</Text>
              <Text style={[styles.metricVal, { color: colors.incomeGreen }]}>
                {dashboardData.incomePercent}
              </Text>
            </View>
            <Ionicons name="trending-up" size={22} color={colors.incomeGreen} />
          </View>

          <View style={[styles.metricCard, { backgroundColor: colors.expenseRedSoft }]}>
            <View style={[styles.metricDot, { backgroundColor: colors.expenseRed }]} />
            <View style={styles.metricTexts}>
              <Text style={[styles.metricLabel, { color: colors.expenseRed }]}>Expenses</Text>
              <Text style={[styles.metricVal, { color: colors.expenseRed }]}>
                {dashboardData.expensesPercent}
              </Text>
            </View>
            <Ionicons name="trending-down" size={22} color={colors.expenseRed} />
          </View>
        </View>

        {/* Featured Blue BTC Card (Sketch: blue-btc / 549.92 BTC / +10% last month / 04, 05, 06 May) */}
        <View style={[styles.featuredCard, { backgroundColor: colors.primary }]}>
          <View style={styles.cardHeader}>
            <View style={styles.btcTagRow}>
              <View style={styles.btcIconCircle}>
                <Ionicons name="logo-bitcoin" size={20} color="#FFFFFF" />
              </View>
              <Text style={styles.btcSymbolText}>{dashboardData.btcCard.currency}</Text>
            </View>
            <View style={styles.changeBadge}>
              <Text style={styles.changeText}>{dashboardData.btcCard.change}</Text>
            </View>
          </View>

          <View style={styles.balanceRow}>
            <Text style={styles.balanceValue}>{dashboardData.btcCard.amount}</Text>
            <Text style={styles.balanceUnit}>BTC</Text>
          </View>

          {/* Interactive Dates Timeline (Sketch: 04 May, 05 May, 06 May) */}
          <View style={styles.timelineRow}>
            {dashboardData.btcCard.timelineDates.map((d) => {
              const active = selectedDate === d;
              return (
                <TouchableOpacity
                  key={d}
                  style={[
                    styles.datePill,
                    active && { backgroundColor: 'rgba(255, 255, 255, 0.25)' },
                  ]}
                  onPress={() => setSelectedDate(d)}
                >
                  <Text style={[styles.dateText, active && styles.activeDateText]}>{d}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Section: Rates (Sketch: Rates / See all) */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Rates</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/history')}>
            <Text style={[styles.seeAllText, { color: colors.primary }]}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* Rates List (Sketch: BTC 35,665,12 PLN, ETH 35,665,12 PLN, LTC 168,15 PLN) */}
        <View style={styles.ratesList}>
          {dashboardData.rates.map((rate) => (
            <TouchableOpacity
              key={rate.id}
              style={[
                styles.rateCard,
                { backgroundColor: theme.surface, borderColor: theme.cardBorder },
              ]}
              onPress={() => router.push('/(tabs)/wallet')}
              activeOpacity={0.8}
            >
              <View style={[styles.cryptoIconBox, { backgroundColor: rate.color + '20' }]}>
                <Ionicons name={rate.icon} size={22} color={rate.color} />
              </View>

              <View style={styles.rateMeta}>
                <Text style={[styles.rateSymbol, { color: theme.text }]}>{rate.symbol}</Text>
                <Text style={[styles.rateName, { color: theme.subText }]}>{rate.name}</Text>
              </View>

              <View style={styles.priceMeta}>
                <Text style={[styles.ratePrice, { color: theme.text }]}>{rate.price}</Text>
                <Text
                  style={[
                    styles.rateChange,
                    { color: rate.isPositive ? colors.incomeGreen : colors.expenseRed },
                  ]}
                >
                  {rate.change}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  screenTitle: { fontSize: 26, fontWeight: '900', letterSpacing: -0.5 },
  topRightActions: { flexDirection: 'row' },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 24 },
  metricRow: { flexDirection: 'row', gap: 12, marginVertical: 14 },
  metricCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 18,
    justifyContent: 'space-between',
  },
  metricDot: { width: 8, height: 8, borderRadius: 4 },
  metricTexts: { flex: 1, marginLeft: 8 },
  metricLabel: { fontSize: 11, fontWeight: '700' },
  metricVal: { fontSize: 18, fontWeight: '900', marginTop: 2 },
  featuredCard: {
    borderRadius: 24,
    padding: 22,
    marginBottom: 24,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  btcTagRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  btcIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btcSymbolText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  changeBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  changeText: { color: '#FFFFFF', fontSize: 11, fontWeight: '800' },
  balanceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 6, marginBottom: 20 },
  balanceValue: { color: '#FFFFFF', fontSize: 36, fontWeight: '900' },
  balanceUnit: { color: 'rgba(255, 255, 255, 0.8)', fontSize: 18, fontWeight: '800' },
  timelineRow: { flexDirection: 'row', justifyContent: 'space-around' },
  datePill: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: radius.full },
  dateText: { color: 'rgba(255, 255, 255, 0.7)', fontSize: 13, fontWeight: '700' },
  activeDateText: { color: '#FFFFFF', fontWeight: '900' },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: { fontSize: 20, fontWeight: '900', letterSpacing: -0.4 },
  seeAllText: { fontSize: 13, fontWeight: '700' },
  ratesList: { gap: 10 },
  rateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
  },
  cryptoIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rateMeta: { marginLeft: 14, flex: 1 },
  rateSymbol: { fontSize: 16, fontWeight: '800' },
  rateName: { fontSize: 12, fontWeight: '500', marginTop: 2 },
  priceMeta: { alignItems: 'flex-end' },
  ratePrice: { fontSize: 15, fontWeight: '800' },
  rateChange: { fontSize: 12, fontWeight: '700', marginTop: 2 },
});
