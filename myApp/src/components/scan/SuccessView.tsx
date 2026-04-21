import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

import RegularButton from '../ui/RegularButton';
import AppTitle from '../ui/AppTitle';

import { Products } from '../../types/Products';
import { CompatibilityStatus } from '../../types/constants';

type Props = {
  product: Products;
  status: CompatibilityStatus;
  onAdd: () => void;
  onRescan: () => void;
};

export default function SuccessView({
  product,
  onAdd,
  onRescan,
  status,
}: Props) {
  const statusConfig = {
    compatible: {
      color: 'rgba(169, 211, 251, 0.6)',
      text: 'Perfect match 😎',
    },
    'not-compatible': {
      color: '#323232',
      text: 'Doesn’t fit your diet 😢',
    },
    exist: {
      color: '#323232',
      text: 'Already in your stack 🤷🏻‍♂️',
    },
  }[status];

  return (
    <View style={styles.container}>
      {/* Status Header */}
      <View style={styles.header}>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: statusConfig.color + '20' },
          ]}
        >
          <Text style={[styles.statusIcon, { color: statusConfig.color }]}>
            {status === 'compatible' && '✓'}
            {status === 'not-compatible' && '✕'}
            {status === 'exist' && '!'}
          </Text>
        </View>

        <AppTitle style={[styles.title, { color: statusConfig.color }]}>
          {statusConfig.text}
        </AppTitle>
      </View>

      {/* Product Card */}
      <View style={styles.card}>
        <Image source={{ uri: product.image_url }} style={styles.image} />
      </View>

      {/* Actions */}
      <View style={styles.bottom}>
        <View style={styles.buttonRow}>
          <RegularButton
            label='Add'
            onPress={onAdd}
            disabled={status === 'exist' || status === 'not-compatible'}
          />
          <RegularButton label='Scan again' onPress={onRescan} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 140,
  },

  header: {
    alignItems: 'center',
    marginTop: 40,
  },

  statusBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  statusIcon: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  title: {
    fontSize: 22,
    textAlign: 'center',
    lineHeight: 28,
  },

  card: {
    backgroundColor: 'rgba(169, 211, 251, 0.6)',
    padding: 4,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 5,
    marginBottom: 30,
  },

  image: {
    width: 180,
    height: 240,
    borderRadius: 12,
  },

  bottom: {
    width: '100%',
    marginBottom: 40,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
});
