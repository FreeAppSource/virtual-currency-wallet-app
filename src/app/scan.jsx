import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../theme';

export default function ScanScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [torchOn, setTorchOn] = useState(false);
  const [manualAddress, setManualAddress] = useState('');

  const handleScanSimulation = (addr) => {
    Alert.alert(
      'Address Scanned! 🎯',
      `Wallet Address: ${addr || '123hjvxbnk4801-vz1-f'}`,
      [
        {
          text: 'Send to this Address',
          onPress: () => router.replace('/(tabs)/transfer'),
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#0B0D13' }]} edges={['top', 'bottom']}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => router.back()}
        >
          <Ionicons name="close" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Scan QR Code</Text>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => setTorchOn(!torchOn)}
        >
          <Ionicons name={torchOn ? 'flash' : 'flash-outline'} size={22} color={torchOn ? colors.btcGold : '#FFFFFF'} />
        </TouchableOpacity>
      </View>

      <View style={styles.centerContainer}>
        {/* Scanner Viewfinder Box */}
        <View style={styles.viewfinder}>
          <View style={[styles.corner, styles.cornerTL]} />
          <View style={[styles.corner, styles.cornerTR]} />
          <View style={[styles.corner, styles.cornerBL]} />
          <View style={[styles.corner, styles.cornerBR]} />

          <TouchableOpacity
            style={styles.simulateScanTap}
            onPress={() => handleScanSimulation('123hjvxbnk4801-vz1-f')}
          >
            <Ionicons name="qr-code-outline" size={80} color="rgba(255, 255, 255, 0.4)" />
            <Text style={styles.tapToScanText}>Tap box to simulate scan</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.instructionText}>
          Align the recipient's crypto QR code inside the frame to scan automatically
        </Text>
      </View>

      {/* Manual Address Input */}
      <View style={styles.manualSection}>
        <Text style={styles.manualLabel}>OR ENTER RECIPIENT ADDRESS</Text>
        <View style={styles.manualInputRow}>
          <TextInput
            value={manualAddress}
            onChangeText={setManualAddress}
            placeholder="Paste 0x... or 1... address"
            placeholderTextColor="#7E8494"
            style={styles.manualInput}
          />
          <TouchableOpacity
            style={[styles.manualSubmitBtn, { backgroundColor: colors.primary }]}
            onPress={() => {
              if (!manualAddress.trim()) {
                Alert.alert('Empty Address', 'Please paste or enter a valid address.');
                return;
              }
              handleScanSimulation(manualAddress.trim());
            }}
          >
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  topTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  viewfinder: {
    width: 260,
    height: 260,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  corner: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderColor: colors.primary,
  },
  cornerTL: { top: 0, left: 0, borderTopWidth: 4, borderLeftWidth: 4, borderTopLeftRadius: 12 },
  cornerTR: { top: 0, right: 0, borderTopWidth: 4, borderRightWidth: 4, borderTopRightRadius: 12 },
  cornerBL: { bottom: 0, left: 0, borderBottomWidth: 4, borderLeftWidth: 4, borderBottomLeftRadius: 12 },
  cornerBR: { bottom: 0, right: 0, borderBottomWidth: 4, borderRightWidth: 4, borderBottomRightRadius: 12 },
  simulateScanTap: { alignItems: 'center', gap: 10 },
  tapToScanText: { color: 'rgba(255, 255, 255, 0.6)', fontSize: 12, fontWeight: '600' },
  instructionText: {
    color: '#8D94A5',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 32,
    lineHeight: 20,
  },
  manualSection: { paddingHorizontal: 24, paddingBottom: 24 },
  manualLabel: { color: '#7E8494', fontSize: 11, fontWeight: '800', letterSpacing: 0.5, marginBottom: 8 },
  manualInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1D26',
    borderRadius: 16,
    paddingHorizontal: 12,
    height: 52,
    gap: 8,
  },
  manualInput: { flex: 1, color: '#FFFFFF', fontSize: 14 },
  manualSubmitBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
