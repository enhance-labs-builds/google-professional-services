/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export const environment = {
  firebase: {
    apiKey: 'AIzaSyB5yzey3k_C5FDS3Jmt2GloVBE72Cv8jeM',
    authDomain: 'creative-studio-demo-481305.firebaseapp.com',
    projectId: 'creative-studio-demo-481305',
    storageBucket: 'creative-studio-demo-481305.firebasestorage.app',
    messagingSenderId: '577666195296',
    appId: '1:577666195296:web:9ca897156c5fcbb27dc805',
    measurementId: 'G-8F1NZBHKYX',
  },
  production: true,
  isLocal: false,
  backendURL: '/api',
  EMAIL_REGEX:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  ADMIN: 'admin',
  GOOGLE_CLIENT_ID: '577666195296-nqm6f8oaq2pnk3o4qjonoavu0t2g0kon.apps.googleusercontent.com',
};
