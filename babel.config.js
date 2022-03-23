module.exports = {
   presets: ['module:metro-react-native-babel-preset'],
   plugins: [
     [
       'module-resolver',
       {
         extensions: ['.tsx', '.ts', '.js', '.json', '.java'],
       },
     ],
     'react-native-reanimated/plugin',
   ],
 };
 
// export default function(api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//     plugins: ['react-native-reanimated/plugin'],
//   };
// };