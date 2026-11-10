# Virtual Currency Wallet App

> 👨‍💻 Developed by **[Suresh Kumar Meesala](https://github.com/SureshKumarMeesala)** · 🎨 UI design by **Mateusz Jurkiewicz** (credits below)

A modern cryptocurrency wallet application built with **React Native (0.88+)**, **Expo SDK 58+**, and **Expo Router** using **JavaScript and JSX (`.js`, `.jsx`)**.

Directly translated from the original Sketch design: `virtual-currrency-wallet-juraa.sketch` by **Juraa**.

---

## 🎨 Artboards & Features (based on 10 design artboards)

| # | Artboard Name | Sketch ID | Dimensions | Code Location | Description |
|---|---|---|---|---|---|
| 1 | **Get start** | `02FAAB03-8537-4E3C-84A3-2CEFFBCABD0B` | 375 × 812 | `src/app/index.jsx` | Onboarding splash with hero crypto artwork, "Start investing Commission-Fee" tagline, and "Get start" action button. |
| 2 | **Dashboard** | `5D59814E-15AE-4869-A09A-5595FBA15DE8` | 375 × 812 | `src/app/(tabs)/index.jsx` | Income (87%) & Expenses (46%) metrics, featured Blue BTC balance card (549.92 BTC, +10% last month, timeline dates 04, 05, 06 May), and Rates list (BTC, ETH, LTC). |
| 3 | **My wallet** | `0001D90C-A73A-4F52-9FE2-CD87A1E140CD` | 375 × 812 | `src/app/(tabs)/wallet.jsx` | Bitcoin wallet view with public receive address (`123hjvxbnk4801-vz1-f`), QR code, Copy/Share action buttons, and Quick Scan shortcut. |
| 4 | **My wallet 2** | `28FE9CCA-E157-49AF-904A-06F7295A4C13` | 375 × 812 | `src/app/(tabs)/wallet.jsx` | Ethereum wallet view with public receive address (`7386djshdfkk1dfga253`), 11,427.92 ETH balance, and QR code. |
| 5 | **Transfer** | `A3652BBA-ACAC-49D0-9EE5-410280AC86A3` | 375 × 812 | `src/app/(tabs)/transfer.jsx` | Currency transfer screen with asset selection (BTC vs ETH), amount input, Send/Request actions, and contact picker. |
| 6 | **Transfer 2** | `08031F5F-B664-4A62-88D8-57555995F1F5` | 375 × 812 | `src/app/(tabs)/transfer.jsx` | Preset transfer screen with active 142 BTC amount configured. |
| 7 | **Transfer contact** | `43A4386A-1913-4FA6-AE7D-BCCB5187E505` | 375 × 812 | `src/app/(tabs)/transfer.jsx` | Contact recipient picker ("Who to pay") with live search filter: Torsten Paulsson, Sergio Pliego, Lizzie Rose, Dr. Max. |
| 8 | **Transfer contact Copy** | `BBE6697B-EC7A-4BF3-B826-77808FDF9F77` | 375 × 812 | `src/app/(tabs)/transfer.jsx` | Active Send/Request state verification and review. |
| 9 | **Sending** | `8719EF24-8AC9-4E49-A9FE-F66E1DDBCAD1` | 375 × 812 | `src/app/(tabs)/transfer.jsx` | "Sending…" modal with native `btc_coin.png` artwork, broadcasting blockchain status, and mining node verification. |
| 10 | **History-transaction** | `89E150F1-883B-4E41-99EE-70C55AAB3F48` | 375 × 812 | `src/app/(tabs)/history.jsx` | Performance chart (range 500, 525, 550, +549.92 BTC) and grouped transaction log for 06 May (1 BTC) and 05 May (0.054 BTC). |
| + | **Transaction Details** | *Extension* | Full View | `src/app/transaction-detail.jsx` | Full transaction receipt modal with block height `#841,209`, confirmations, gas fee, copyable hash, and explorer links. |
| + | **QR Scanner** | *Extension* | Full View | `src/app/scan.jsx` | Viewfinder scanner with torch toggle, address simulation, and manual address input. |

---

## 💎 Design Tokens & Colors (Extracted from Sketch AST)

- **Primary Electric Blue**: `#3E41F7` / `#595CFB`
- **Soft Indigo**: `#DFE0FD`
- **BTC Gold / Orange**: `#FFB721` / `#FE852D`
- **ETH Cyan**: `#66BAE7`
- **Income Green**: `#1DC290` / `#E5FFF8`
- **Expense Red**: `#F53C3C` / `#FFE5E5`
- **Background**: `#F9F5F5` (Light) / `#0F1117` (Dark)
- **Dark Text**: `#1B1E26`

---

## 🚀 Running the App

```bash
# Start the Expo development server
npx expo start
```

<!-- run-locally:start -->

## ▶️ Run locally

```bash
npm install
npx expo start
```

Then press `i` for the iOS simulator, `a` for Android, or `w` for the web, or scan the QR code with Expo Go.

<!-- run-locally:end -->

<!-- developer:start -->

## 👨‍💻 Developer

This React Native app was developed by **Suresh Kumar Meesala**.

| | |
|---|---|
| Developer | [Suresh Kumar Meesala](https://github.com/SureshKumarMeesala) |
| GitHub | [@SureshKumarMeesala](https://github.com/SureshKumarMeesala) |
| Organization | [FreeAppSource](https://github.com/FreeAppSource) |
| Repository | <https://github.com/FreeAppSource/virtual-currency-wallet-app> |

<!-- developer:end -->

---

<!-- design-credits:start -->

## 🎨 Design Credits

This app is based on the free **Virtual Currency Wallet Concept** design by **Mateusz Jurkiewicz**, downloaded from Sketch App Sources. All visual design credit goes to the designer. It follows the design's screens, user flows and content; visual details (exact spacing, fonts, some colours and illustrations) are approximated and may differ from the original.

| | |
|---|---|
| Designer | [Mateusz Jurkiewicz](https://www.sketchappsources.com/contributor/jurkiewicz) |
| Original design | [Virtual Currency Wallet Concept](https://dribbble.com/shots/14340018-Freebie-Spend-Invest-Cash) |
| Downloaded from | [Sketch App Sources](https://www.sketchappsources.com/free-source/4592-virtual-currency-wallet-sketch-freebie-resource.html) |
| Dribbble | <http://www.dribbble.com/juraa> |
| Website | <http://uiuxdesign.me/> |
| Original file | `virtual-currrency-wallet-juraa.sketch` |
| License / usage | Not stated on the source page. Free download; credit the designer (Sketch App Sources Terms) and confirm with them before commercial use. |

**Attribution:**

> UI design: "Virtual Currency Wallet Concept" by Mateusz Jurkiewicz (https://dribbble.com/shots/14340018-Freebie-Spend-Invest-Cash), downloaded from Sketch App Sources (https://www.sketchappsources.com/free-source/4592-virtual-currency-wallet-sketch-freebie-resource.html).

The original design source files are not included in this repository; get them from the links above. This app's **code** is released under the [MIT License](./LICENSE); the visual design remains the designer's (see [NOTICE](./NOTICE)).

Photos, brand logos and avatars inside the design may belong to third parties and are not covered by the designer's permission.

<!-- design-credits:end -->
