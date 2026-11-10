import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../../theme';
import { historyData } from '../../data';

export default function HistoryScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]} edges={['top']}>
      {/* Top Bar (Sketch: History-transaction) */}
      <View style={styles.topBar}>
        <Text style={[styles.screenTitle, { color: theme.text }]}>Transaction History</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Performance Chart Summary Box (Sketch: 550, 525, 500 / +549.92 / +10% last month) */}
        <View style={[styles.chartCard, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}>
          <View style={styles.chartHeaderRow}>
            <View>
              <Text style={[styles.chartDate, { color: theme.subText }]}>{historyData.activeDate}</Text>
              <Text style={[styles.chartTotal, { color: colors.primary }]}>{historyData.activeTotal} BTC</Text>
            </View>
            <View style={[styles.changeBadge, { backgroundColor: colors.incomeGreenSoft }]}>
              <Text style={[styles.changeText, { color: colors.incomeGreen }]}>{historyData.change}</Text>
            </View>
          </View>

          {/* Range Scale */}
          <View style={styles.rangeScaleRow}>
            <Text style={[styles.scaleText, { color: theme.subText }]}>{historyData.chartRange.max}</Text>
            <View style={[styles.scaleLine, { backgroundColor: theme.divider }]} />
            <Text style={[styles.scaleText, { color: theme.subText }]}>{historyData.chartRange.mid}</Text>
            <View style={[styles.scaleLine, { backgroundColor: theme.divider }]} />
            <Text style={[styles.scaleText, { color: theme.subText }]}>{historyData.chartRange.min}</Text>
          </View>
        </View>

        {/* Grouped Day Lists (Sketch: 06 May & 05 May) */}
        {historyData.days.map((dayGroup) => (
          <View key={dayGroup.date} style={styles.daySection}>
            <View style={styles.dayHeaderRow}>
              <Text style={[styles.dayDateTitle, { color: theme.text }]}>{dayGroup.date}</Text>
              <Text style={[styles.daySumText, { color: colors.primary }]}>{dayGroup.totalStr}</Text>
            </View>

            <View style={styles.txList}>
              {dayGroup.transactions.map((tx) => (
                <TouchableOpacity
                  key={tx.id}
                  style={[
                    styles.txCard,
                    { backgroundColor: theme.surface, borderColor: theme.cardBorder },
                  ]}
                  onPress={() => router.push({
                    pathname: '/transaction-detail',
                    params: {
                      title: tx.title,
                      amount: tx.amount,
                      time: tx.time,
                      isIncome: String(tx.isIncome),
                    },
                  })}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.txIconBox,
                      { backgroundColor: tx.isIncome ? colors.incomeGreenSoft : colors.expenseRedSoft },
                    ]}
                  >
                    <Ionicons
                      name={tx.isIncome ? 'arrow-down' : 'arrow-up'}
                      size={18}
                      style={{ transform: [{ rotate: '45deg' }] }}
                      color={tx.isIncome ? colors.incomeGreen : colors.expenseRed}
                    />
                  </View>

                  <View style={styles.txMeta}>
                    <Text numberOfLines={1} style={[styles.txTitle, { color: theme.text }]}>
                      {tx.title}
                    </Text>
                    <Text style={[styles.txTime, { color: theme.subText }]}>{tx.time}</Text>
                  </View>

                  <Text
                    style={[
                      styles.txAmount,
                      { color: tx.isIncome ? colors.incomeGreen : colors.expenseRed },
                    ]}
                  >
                    {tx.amount}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: { paddingHorizontal: 20, paddingVertical: 12 },
  screenTitle: { fontSize: 26, fontWeight: '900', letterSpacing: -0.5 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 24 },
  chartCard: {
    padding: 18,
    borderRadius: 22,
    borderWidth: 1,
    marginBottom: 20,
  },
  chartHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  chartDate: { fontSize: 12, fontWeight: '600' },
  chartTotal: { fontSize: 26, fontWeight: '900', marginTop: 2 },
  changeBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.full },
  changeText: { fontSize: 11, fontWeight: '800' },
  rangeScaleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  scaleText: { fontSize: 11, fontWeight: '700' },
  scaleLine: { flex: 1, height: 1 },
  daySection: { marginBottom: 20 },
  dayHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dayDateTitle: { fontSize: 16, fontWeight: '900' },
  daySumText: { fontSize: 13, fontWeight: '800' },
  txList: { gap: 8 },
  txCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  txIconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txMeta: { marginLeft: 12, flex: 1 },
  txTitle: { fontSize: 14, fontWeight: '700' },
  txTime: { fontSize: 11, fontWeight: '500', marginTop: 2 },
  txAmount: { fontSize: 14, fontWeight: '800' },
});
