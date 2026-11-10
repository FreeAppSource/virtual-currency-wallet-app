import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../theme';
import { appInfo } from '../data';

const { width } = Dimensions.get('window');

export default function GetStartScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.content}>
        {/* Top Logo / App Mark */}
        <View style={styles.topLogoRow}>
          <View style={[styles.logoCircle, { backgroundColor: colors.primary }]}>
            <Ionicons name="wallet" size={24} color="#FFFFFF" />
          </View>
          <Text style={[styles.logoTitle, { color: theme.text }]}>Juraa Wallet</Text>
        </View>

        {/* Hero Crypto Artwork (Sketch: crypto_hero.png) */}
        <View style={styles.heroWrapper}>
          <Image
            source={require('../../assets/images/crypto_hero.png')}
            style={styles.heroImage}
            resizeMode="contain"
          />
        </View>

        {/* Text Headline (Sketch: Start investing Commission-Fee) */}
        <View style={styles.headlineBox}>
          <Text style={[styles.mainHeadline, { color: theme.text }]}>
            {appInfo.onboardingTagline}
          </Text>
          <Text style={[styles.subText, { color: theme.subText }]}>
            Buy, transfer and monitor your crypto portfolio with zero commission fees and instant settlement.
          </Text>
        </View>

        {/* Action Button: Get start (Sketch button) */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={[styles.getStartBtn, { backgroundColor: colors.primary }]}
            onPress={() => router.replace('/(tabs)')}
            activeOpacity={0.85}
          >
            <Text style={styles.getStartText}>Get start</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: 'space-between',
    paddingVertical: 24,
  },
  topLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
  },
  logoCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoTitle: { fontSize: 20, fontWeight: '900', letterSpacing: -0.5 },
  heroWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 280,
  },
  heroImage: { width: width * 0.75, height: '100%' },
  headlineBox: { alignItems: 'center', paddingHorizontal: 8 },
  mainHeadline: {
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 40,
    letterSpacing: -0.6,
    marginBottom: 12,
  },
  subText: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '400',
  },
  bottomSection: { width: '100%', marginBottom: 12 },
  getStartBtn: {
    height: 56,
    borderRadius: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 5,
  },
  getStartText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
});
