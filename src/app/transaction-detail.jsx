import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, radius, useTheme } from '../theme';

export default function TransactionDetailScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const params = useLocalSearchParams();

  const title = params.title || 'Torsten Paulsson sent you the money';
  const amount = params.amount || '+0.03 BTC';
  const time = params.time || '10:00';
  const isIncome = params.isIncome === 'true' || amount.startsWith('+');

  const txHash = '0x9b4f7382e87c093a61de88f01b17e4529d93c1';
  const blockNumber = '841,209';
  const confirmations = '34 Confirmations';
  const networkFee = '0.000045 BTC ($1.62)';

  const handleCopyHash = () => {
    Alert.alert('Hash Copied!', `Transaction Hash ${txHash} copied to clipboard.`);
  };

  const handleShare = () => {
    Alert.alert('Share Receipt', `Sharing receipt for ${title} (${amount})...`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]} edges={['top', 'bottom']}>
      {/* Top Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={[styles.backBtn, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={20} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Transaction Details</Text>
        <TouchableOpacity
          style={[styles.backBtn, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}
          onPress={handleShare}
        >
          <Ionicons name="share-outline" size={20} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Status Card */}
        <View style={[styles.heroCard, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}>
          <View
            style={[
              styles.statusIconCircle,
              { backgroundColor: isIncome ? colors.incomeGreenSoft : colors.expenseRedSoft },
            ]}
          >
            <Ionicons
              name={isIncome ? 'arrow-down' : 'arrow-up'}
              size={36}
              style={{ transform: [{ rotate: '45deg' }] }}
              color={isIncome ? colors.incomeGreen : colors.expenseRed}
            />
          </View>

          <Text style={[styles.amountHero, { color: isIncome ? colors.incomeGreen : colors.expenseRed }]}>
            {amount}
          </Text>
          <Text style={[styles.titleHero, { color: theme.text }]}>{title}</Text>

          <View style={[styles.statusBadge, { backgroundColor: colors.incomeGreenSoft }]}>
            <Ionicons name="checkmark-circle" size={14} color={colors.incomeGreen} />
            <Text style={[styles.statusBadgeText, { color: colors.incomeGreen }]}>Completed</Text>
          </View>
        </View>

        {/* Breakdown Items */}
        <View style={[styles.detailsSection, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.subText }]}>Timestamp</Text>
            <Text style={[styles.detailValue, { color: theme.text }]}>06 May 2020, {time}</Text>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.divider }]} />

          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.subText }]}>Block Number</Text>
            <Text style={[styles.detailValue, { color: theme.text }]}>#{blockNumber}</Text>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.divider }]} />

          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.subText }]}>Confirmations</Text>
            <Text style={[styles.detailValue, { color: colors.incomeGreen }]}>{confirmations}</Text>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.divider }]} />

          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.subText }]}>Network Fee</Text>
            <Text style={[styles.detailValue, { color: theme.text }]}>{networkFee}</Text>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.divider }]} />

          <View style={styles.hashBlock}>
            <Text style={[styles.detailLabel, { color: theme.subText, marginBottom: 6 }]}>Transaction Hash</Text>
            <TouchableOpacity
              style={[styles.hashBox, { backgroundColor: theme.surfaceSubtle }]}
              onPress={handleCopyHash}
              activeOpacity={0.7}
            >
              <Text numberOfLines={1} style={[styles.hashText, { color: colors.primary }]}>
                {txHash}
              </Text>
              <Ionicons name="copy-outline" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.explorerBtn, { backgroundColor: colors.primary }]}
          onPress={() => Alert.alert('Blockchain Explorer', 'Opening block explorer preview...')}
        >
          <Ionicons name="globe-outline" size={18} color="#FFFFFF" />
          <Text style={styles.explorerBtnText}>View on Blockchain Explorer</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerTitle: { fontSize: 18, fontWeight: '800' },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 32 },
  heroCard: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 16,
  },
  statusIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  amountHero: { fontSize: 32, fontWeight: '900', marginBottom: 6 },
  titleHero: { fontSize: 15, fontWeight: '700', textAlign: 'center', marginBottom: 14 },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  statusBadgeText: { fontSize: 12, fontWeight: '800' },
  detailsSection: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  detailLabel: { fontSize: 13, fontWeight: '600' },
  detailValue: { fontSize: 13, fontWeight: '700' },
  divider: { height: 1, width: '100%' },
  hashBlock: { paddingTop: 12 },
  hashBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },
  hashText: { fontSize: 12, fontWeight: '700', flex: 1, marginRight: 8 },
  explorerBtn: {
    height: 52,
    borderRadius: 26,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  explorerBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
});
