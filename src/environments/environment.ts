// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAtNcW0sCT-Wwuh5lx_lZMCgxazP8WlY7Y",
    authDomain: "cnm-front.firebaseapp.com",
    //databaseURL: “from firebase config”,
    projectId: "cnm-front",
    storageBucket: "cnm-front.appspot.com",
    messagingSenderId: "171413793893",
    appId: "1:171413793893:web:a1ff8cdff6f306a6b82a8c",
    measurementId: "G-3MT6TFTHJL"
  },
  host:"https://pari-rest.herokuapp.com/api"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

