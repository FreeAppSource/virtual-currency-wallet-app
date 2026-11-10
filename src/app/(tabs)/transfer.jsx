import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  Image,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, useTheme } from '../../theme';
import { contactsData } from '../../data';

export default function TransferScreen() {
  const { theme } = useTheme();

  // Mode: 'Send' | 'Request'
  const [activeMode, setActiveMode] = useState('Send');
  // Asset: 'BTC' | 'ETH'
  const [activeAsset, setActiveAsset] = useState('BTC');
  // Transfer amount (presets: 0, 142)
  const [amount, setAmount] = useState('142');
  // Selected contact recipient
  const [selectedContact, setSelectedContact] = useState(contactsData[0]);
  // Sending modal state (Sketch Sending artboard)
  const [isSending, setIsSending] = useState(false);
  // Search query for contacts
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contactsData.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery)
  );

  const handleExecuteTransfer = () => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid transfer amount.');
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      Alert.alert(
        activeMode === 'Send' ? 'Transfer Successful! 🚀' : 'Payment Request Sent!',
        `${activeMode === 'Send' ? 'Sent' : 'Requested'} ${amount} ${activeAsset} to ${selectedContact.name}.`
      );
    }, 2200);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]} edges={['top']}>
      {/* Top Bar (Sketch: Transfer) */}
      <View style={styles.topBar}>
        <Text style={[styles.screenTitle, { color: theme.text }]}>Transfer</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Send / Request Segmented Buttons (Sketch: Send / Request button inactive/active) */}
        <View style={[styles.segmentedRow, { backgroundColor: theme.surfaceSubtle }]}>
          {['Send', 'Request'].map((m) => {
            const isActive = activeMode === m;
            return (
              <TouchableOpacity
                key={m}
                style={[
                  styles.segmentBtn,
                  isActive && { backgroundColor: colors.primary },
                ]}
                onPress={() => setActiveMode(m)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.segmentText,
                    { color: isActive ? '#FFFFFF' : theme.subText },
                  ]}
                >
                  {m}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Currency Asset Selector: BTC (549.92) vs ETH (11,427.92) */}
        <View style={styles.assetRow}>
          <TouchableOpacity
            style={[
              styles.assetCard,
              {
                backgroundColor: activeAsset === 'BTC' ? colors.primarySoft : theme.surface,
                borderColor: activeAsset === 'BTC' ? colors.primary : theme.cardBorder,
              },
            ]}
            onPress={() => setActiveAsset('BTC')}
          >
            <Ionicons name="logo-bitcoin" size={20} color={colors.btcGold} />
            <Text style={[styles.assetSymbol, { color: theme.text }]}>Bitcoin (BTC)</Text>
            <Text style={[styles.assetBal, { color: colors.primary }]}>549.92</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.assetCard,
              {
                backgroundColor: activeAsset === 'ETH' ? colors.primarySoft : theme.surface,
                borderColor: activeAsset === 'ETH' ? colors.primary : theme.cardBorder,
              },
            ]}
            onPress={() => setActiveAsset('ETH')}
          >
            <Ionicons name="diamond-outline" size={20} color={colors.ethCyan} />
            <Text style={[styles.assetSymbol, { color: theme.text }]}>Ether (ETH)</Text>
            <Text style={[styles.assetBal, { color: colors.primary }]}>11,427.92</Text>
          </TouchableOpacity>
        </View>

        {/* Amount Input Box (Sketch: Type 142 BTC) */}
        <View
          style={[
            styles.amountCard,
            { backgroundColor: theme.surface, borderColor: theme.cardBorder },
          ]}
        >
          <Text style={[styles.amountLabel, { color: theme.subText }]}>AMOUNT TO {activeMode.toUpperCase()}</Text>
          <View style={styles.amountInputRow}>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              style={[styles.amountInput, { color: theme.text }]}
              placeholder="0.00"
              placeholderTextColor={theme.subText}
            />
            <Text style={[styles.amountUnit, { color: colors.primary }]}>{activeAsset}</Text>
          </View>
        </View>

        {/* Section: Who to pay (Sketch: Who to pay) */}
        <View style={styles.whoToPayHeader}>
          <Text style={[styles.sectionHeading, { color: theme.text }]}>
            Who to pay
          </Text>
          <View style={[styles.searchBox, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}>
            <Ionicons name="search" size={16} color={theme.subText} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search contact..."
              placeholderTextColor={theme.subText}
              style={[styles.searchInput, { color: theme.text }]}
            />
          </View>
        </View>

        <View style={styles.contactsList}>
          {filteredContacts.map((c) => {
            const isSelected = selectedContact.id === c.id;
            return (
              <TouchableOpacity
                key={c.id}
                style={[
                  styles.contactItem,
                  {
                    backgroundColor: isSelected ? colors.primarySoft : theme.surface,
                    borderColor: isSelected ? colors.primary : theme.cardBorder,
                  },
                ]}
                onPress={() => setSelectedContact(c)}
              >
                <View style={[styles.contactAvatar, { backgroundColor: isSelected ? colors.primary : theme.surfaceSubtle }]}>
                  <Text style={[styles.avatarInitials, { color: isSelected ? '#FFFFFF' : theme.text }]}>
                    {c.avatarText}
                  </Text>
                </View>
                <View style={styles.contactDetails}>
                  <Text style={[styles.contactName, { color: theme.text }]}>{c.name}</Text>
                  <Text style={[styles.contactPhone, { color: theme.subText }]}>{c.phone}</Text>
                </View>
                <Ionicons
                  name={isSelected ? 'checkmark-circle' : 'ellipse-outline'}
                  size={22}
                  color={isSelected ? colors.primary : theme.subText}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Action Button: Send / Request */}
        <TouchableOpacity
          style={[styles.submitActionBtn, { backgroundColor: colors.primary }]}
          onPress={handleExecuteTransfer}
          activeOpacity={0.85}
        >
          <Text style={styles.submitActionText}>
            {activeMode} {amount} {activeAsset}
          </Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Sending Animation Modal (Sketch Sending artboard with btc_coin.png) */}
      <Modal visible={isSending} transparent animationType="fade">
        <View style={styles.sendingOverlay}>
          <View style={[styles.sendingCard, { backgroundColor: theme.surface }]}>
            <View style={styles.coinImageContainer}>
              <Image
                source={require('../../assets/images/btc_coin.png')}
                style={styles.coinImage}
                resizeMode="contain"
              />
            </View>
            <Text style={[styles.sendingHeading, { color: theme.text }]}>Sending…</Text>
            <Text style={[styles.sendingBody, { color: theme.subText }]}>
              Broadcasting {amount} {activeAsset} transaction to the decentralized network...
            </Text>
            <View style={styles.networkStatusRow}>
              <View style={[styles.pulsingDot, { backgroundColor: colors.incomeGreen }]} />
              <Text style={[styles.networkStatusText, { color: colors.incomeGreen }]}>
                Mining node verification in progress
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: { paddingHorizontal: 20, paddingVertical: 12 },
  screenTitle: { fontSize: 26, fontWeight: '900', letterSpacing: -0.5 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 24 },
  segmentedRow: {
    flexDirection: 'row',
    borderRadius: radius.full,
    padding: 4,
    marginBottom: 20,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: radius.full,
  },
  segmentText: { fontSize: 14, fontWeight: '800' },
  assetRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  assetCard: {
    flex: 1,
    padding: 14,
    borderRadius: 18,
    borderWidth: 1.5,
  },
  assetSymbol: { fontSize: 13, fontWeight: '700', marginTop: 8 },
  assetBal: { fontSize: 18, fontWeight: '900', marginTop: 4 },
  amountCard: {
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 24,
  },
  amountLabel: { fontSize: 11, fontWeight: '800', letterSpacing: 0.5, marginBottom: 8 },
  amountInputRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  amountInput: { fontSize: 36, fontWeight: '900', flex: 1 },
  amountUnit: { fontSize: 20, fontWeight: '800' },
  whoToPayHeader: {
    flexDirection: 'column',
    gap: 8,
    marginBottom: 12,
  },
  sectionHeading: { fontSize: 18, fontWeight: '900' },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  searchInput: { flex: 1, fontSize: 14 },
  contactsList: { gap: 10, marginBottom: 24 },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1.5,
  },
  contactAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: { fontSize: 15, fontWeight: '800' },
  contactDetails: { marginLeft: 12, flex: 1 },
  contactName: { fontSize: 15, fontWeight: '800' },
  contactPhone: { fontSize: 12, fontWeight: '500', marginTop: 2 },
  submitActionBtn: {
    height: 54,
    borderRadius: 27,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 4,
  },
  submitActionText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  sendingOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  sendingCard: {
    width: '88%',
    padding: 28,
    borderRadius: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  coinImageContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  coinImage: {
    width: 90,
    height: 90,
  },
  sendingHeading: { fontSize: 24, fontWeight: '900', marginBottom: 8 },
  sendingBody: { fontSize: 13, textAlign: 'center', lineHeight: 20 },
  networkStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 18,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
    backgroundColor: 'rgba(29, 194, 144, 0.1)',
  },
  pulsingDot: { width: 8, height: 8, borderRadius: 4 },
  networkStatusText: { fontSize: 11, fontWeight: '700' },
});
