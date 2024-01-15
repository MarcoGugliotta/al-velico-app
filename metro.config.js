const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push('cjs');
defaultConfig.transformer.assetPlugins.push('expo-asset/tools/hashAssetFiles');

module.exports = defaultConfig;
