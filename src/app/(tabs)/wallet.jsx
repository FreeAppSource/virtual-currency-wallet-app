import React, { useState } from 'react';
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
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../../theme';
import { walletsData } from '../../data';

export default function MyWalletScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [selectedWalletIndex, setSelectedWalletIndex] = useState(0);

  const wallet = walletsData[selectedWalletIndex];

  const handleCopy = () => {
    Alert.alert('Address Copied! 📋', `Public ${wallet.symbol} key: ${wallet.qrAddress} copied to clipboard.`);
  };

  const handleShare = () => {
    Alert.alert('Share Address', `Sharing ${wallet.symbol} wallet address: ${wallet.qrAddress}...`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]} edges={['top']}>
      {/* Top Bar (Sketch: My wallet) */}
      <View style={styles.topBar}>
        <Text style={[styles.screenTitle, { color: theme.text }]}>My wallet</Text>

        <TouchableOpacity
          style={[styles.scanHeaderBtn, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}
          onPress={() => router.push('/scan')}
        >
          <Ionicons name="qr-code-outline" size={20} color={colors.primary} />
          <Text style={[styles.scanHeaderBtnText, { color: colors.primary }]}>Scan QR</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Wallet Selection Chips: BTC (549.92) vs ETH (11,427.92) */}
        <View style={styles.walletTabsRow}>
          {walletsData.map((w, idx) => {
            const isSelected = selectedWalletIndex === idx;
            return (
              <TouchableOpacity
                key={w.id}
                style={[
                  styles.walletTabBtn,
                  {
                    backgroundColor: isSelected ? colors.primary : theme.surface,
                    borderColor: isSelected ? colors.primary : theme.cardBorder,
                  },
                ]}
                onPress={() => setSelectedWalletIndex(idx)}
              >
                <Text
                  style={[
                    styles.walletTabSymbol,
                    { color: isSelected ? '#FFFFFF' : theme.text },
                  ]}
                >
                  {w.symbol}
                </Text>
                <Text
                  style={[
                    styles.walletTabBal,
                    { color: isSelected ? '#FFFFFF' : colors.primary },
                  ]}
                >
                  {w.balance}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Big Wallet Card with Stylized QR Code Matrix */}
        <View
          style={[
            styles.qrCard,
            { backgroundColor: theme.surface, borderColor: theme.cardBorder },
          ]}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.coinBadge, { backgroundColor: wallet.color + '20' }]}>
              <Ionicons
                name={wallet.symbol === 'BTC' ? 'logo-bitcoin' : 'diamond-outline'}
                size={22}
                color={wallet.color}
              />
            </View>
            <View>
              <Text style={[styles.cardTitle, { color: theme.text }]}>{wallet.name} Wallet</Text>
              <Text style={[styles.cardSub, { color: theme.subText }]}>Balance: {wallet.balance} {wallet.symbol}</Text>
            </View>
          </View>

          {/* QR Code Presentation Box */}
          <View style={styles.qrMatrixWrapper}>
            <View style={styles.qrMatrix}>
              <Ionicons name="qr-code" size={170} color="#1B1E26" />
            </View>
          </View>

          {/* Public Key Display */}
          <View style={[styles.addressBox, { backgroundColor: theme.surfaceSubtle }]}>
            <Text style={[styles.addressText, { color: theme.text }]} numberOfLines={1}>
              {wallet.qrAddress}
            </Text>
            <TouchableOpacity onPress={handleCopy} style={styles.copyInlineBtn}>
              <Ionicons name="copy-outline" size={18} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {/* Bottom Actions: Copy & Share */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.outlineActionBtn, { borderColor: colors.primary }]}
              onPress={handleCopy}
            >
              <Ionicons name="copy" size={16} color={colors.primary} />
              <Text style={[styles.outlineActionText, { color: colors.primary }]}>Copy Address</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.filledActionBtn, { backgroundColor: colors.primary }]}
              onPress={handleShare}
            >
              <Ionicons name="share-social" size={16} color="#FFFFFF" />
              <Text style={styles.filledActionText}>Share Address</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Send Shortcut */}
        <TouchableOpacity
          style={[styles.quickSendCard, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}
          onPress={() => router.push('/(tabs)/transfer')}
        >
          <View style={[styles.quickSendIcon, { backgroundColor: colors.primarySoft }]}>
            <Ionicons name="paper-plane" size={20} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.quickSendTitle, { color: theme.text }]}>Need to send {wallet.symbol}?</Text>
            <Text style={[styles.quickSendSub, { color: theme.subText }]}>Instant zero-commission transfer</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={theme.subText} />
        </TouchableOpacity>

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
  scanHeaderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
    borderWidth: 1,
  },
  scanHeaderBtnText: { fontSize: 13, fontWeight: '800' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 24 },
  walletTabsRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  walletTabBtn: {
    flex: 1,
    padding: 14,
    borderRadius: 18,
    borderWidth: 1.5,
  },
  walletTabSymbol: { fontSize: 13, fontWeight: '700' },
  walletTabBal: { fontSize: 18, fontWeight: '900', marginTop: 4 },
  qrCard: {
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 12,
    marginBottom: 20,
  },
  coinBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: { fontSize: 16, fontWeight: '800' },
  cardSub: { fontSize: 12, fontWeight: '500', marginTop: 2 },
  qrMatrixWrapper: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  qrMatrix: { alignItems: 'center', justifyContent: 'center' },
  addressBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    marginBottom: 20,
  },
  addressText: { fontSize: 13, fontWeight: '700', flex: 1, marginRight: 8 },
  copyInlineBtn: { padding: 4 },
  actionRow: { flexDirection: 'row', gap: 10, width: '100%' },
  outlineActionBtn: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  outlineActionText: { fontSize: 13, fontWeight: '800' },
  filledActionBtn: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  filledActionText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },
  quickSendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    gap: 14,
  },
  quickSendIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickSendTitle: { fontSize: 14, fontWeight: '800' },
  quickSendSub: { fontSize: 12, fontWeight: '500', marginTop: 2 },
});
