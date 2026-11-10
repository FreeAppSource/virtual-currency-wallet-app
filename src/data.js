export const appInfo = {
  title: 'Virtual Currency Wallet',
  onboardingTagline: 'Start investing Commission-Fee',
};

export const dashboardData = {
  incomePercent: '87%',
  expensesPercent: '46%',
  btcCard: {
    currency: 'BTC',
    amount: '549.92',
    change: '+10% last month',
    timelineDates: ['04 May', '05 May', '06 May'],
  },
  rates: [
    {
      id: 'r-btc',
      symbol: 'BTC',
      name: 'Bitcoin',
      price: '35,665,12 PLN',
      change: '+2.4%',
      isPositive: true,
      color: '#FFB721',
      icon: 'logo-bitcoin',
    },
    {
      id: 'r-eth',
      symbol: 'ETH',
      name: 'Ether',
      price: '11,427.92 PLN',
      change: '+5.1%',
      isPositive: true,
      color: '#66BAE7',
      icon: 'diamond-outline',
    },
    {
      id: 'r-ltc',
      symbol: 'LTC',
      name: 'Litecoin',
      price: '168,15 PLN',
      change: '-1.2%',
      isPositive: false,
      color: '#7066E7',
      icon: 'flash-outline',
    },
  ],
};

export const walletsData = [
  {
    id: 'w-btc',
    symbol: 'BTC',
    name: 'Bitcoin',
    balance: '549.92',
    qrAddress: '123hjvxbnk4801-vz1-f',
    color: '#FFB721',
  },
  {
    id: 'w-eth',
    symbol: 'ETH',
    name: 'Ether',
    balance: '11,427.92',
    qrAddress: '7386djshdfkk1dfga253',
    color: '#66BAE7',
  },
];

export const contactsData = [
  { id: 'c-1', name: 'Torsten Paulsson', phone: '+48 512 890 221', avatarText: 'TP' },
  { id: 'c-2', name: 'Sergio Pliego', phone: '+48 601 349 112', avatarText: 'SP' },
  { id: 'c-3', name: 'Lizzie Rose', phone: '+48 799 443 891', avatarText: 'LR' },
  { id: 'c-4', name: 'Pharmacy Dr. Max', phone: '+48 22 811 009', avatarText: 'DM' },
];

export const historyData = {
  chartRange: { min: '500', mid: '525', max: '550' },
  activeDate: '06.05.2020',
  activeTotal: '+549.92',
  change: '+10% last month',
  days: [
    {
      date: '06 May',
      totalStr: '1 BTC',
      transactions: [
        {
          id: 'tx-1',
          title: 'Torsten Paulsson sent you the money',
          amount: '+0.03 BTC',
          time: '10:00',
          isIncome: true,
        },
        {
          id: 'tx-2',
          title: 'Street cafe',
          amount: '-0.032 BTC',
          time: '11:00',
          isIncome: false,
        },
        {
          id: 'tx-3',
          title: '2 flight tickets Lufthansa',
          amount: '-0.56 BTC',
          time: '11:02',
          isIncome: false,
        },
        {
          id: 'tx-4',
          title: 'Appstore',
          amount: '-0.001 BTC',
          time: '11:15',
          isIncome: false,
        },
        {
          id: 'tx-5',
          title: 'Appstore',
          amount: '-0.001 BTC',
          time: '12:15',
          isIncome: false,
        },
      ],
    },
    {
      date: '05 May',
      totalStr: '0.054 BTC',
      transactions: [
        {
          id: 'tx-6',
          title: 'Sergio Pliego sent you the money',
          amount: '+0.0023 BTC',
          time: '11:00',
          isIncome: true,
        },
        {
          id: 'tx-7',
          title: 'Pharmacy Dr. Max',
          amount: '-0.0096 BTC',
          time: '11:00',
          isIncome: false,
        },
        {
          id: 'tx-8',
          title: 'Lizzie Rose sent you the money',
          amount: '+0.11 BTC',
          time: '11:34',
          isIncome: true,
        },
        {
          id: 'tx-9',
          title: 'Street cafe',
          amount: '-0.032 BTC',
          time: '11:46',
          isIncome: false,
        },
      ],
    },
  ],
};
