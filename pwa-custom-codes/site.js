// Copyright 2016 Google Inc.
// 
// Please work now!!!  Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/** Intentionally empty */
navigator.serviceWorker && navigator.serviceWorker.register('./sw.js').then(function(registration) {
  console.log('Excellent, registered with scope: ', registration.scope);
});
const publicKey = '12345678901234567890';
navigator.serviceWorker && navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {  
  serviceWorkerRegistration.pushManager.getSubscription()  
    .then(function(subscription) {  
      // subscription will be null or a PushSubscription
	  if (subscription) {
        console.info('Got existing', subscription);
        window.subscription = subscription;
        return;  // got one, yay
      }

      const applicationServerKey = urlB64ToUint8Array(publicKey);
      serviceWorkerRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey,
      })
        .then(function(subscription) { 
          console.info('Newly subscribed to push!', subscription);
          window.subscription = subscription;
        });
    });
});