//Import used functions from librairies
import 'react-native-gesture-handler';
import * as React from 'react';
import { decode, encode } from 'base-64'
import RouterNavigation from './Navigation/HomeNavigation';

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

export default function App() {
  return (
      <RouterNavigation />
  );
}
