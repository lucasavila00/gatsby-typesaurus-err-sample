# check that it works at runtime:
> configure your firebase credential at /gatsby-config.js

> the code that uses typesaurus is at /src/pages/index.tsx

> $ yarn develop

# see it fail to build:
> $ yarn build

@zeit/ncc had the same error and fixed it on their behalf instead of "upstreaming" to webpack:

https://github.com/zeit/ncc/issues/317

https://github.com/zeit/webpack-asset-relocator-loader/pull/12

```
 ERROR #95313 

Building static HTML failed

See our docs page for more info on this error: https://gatsby.dev/debug-html


  263 |     //if the first dir fails its a real error
  264 |     if(path == _path) {
> 265 |       emitter.emit('error',new Error('error reading first path in the walk '+path+'\n'+err),err);
      | ^
  266 |     }
  267 |   });
  268 | 


  WebpackError: error reading first path in the walk /protos
  
  - walkdir.js:265 EventEmitter.<anonymous>
    node_modules/walkdir/walkdir.js:265:1
  
  - walkdir.js:100 fn
    node_modules/walkdir/walkdir.js:100:1
  
  - walkdir.js:137 statter
    node_modules/walkdir/walkdir.js:137:1
  
  - walkdir.js:269 walkdir
    node_modules/walkdir/walkdir.js:269:1
  
  - walkdir.js:15 Function../node_modules/walkdir/walkdir.js.walkdir.sync
    node_modules/walkdir/walkdir.js:15:1
  
  - grpc.js:50 Object.<anonymous>
    node_modules/google-gax/build/src/grpc.js:50:1
  
  - index.js:33 Object../node_modules/google-gax/build/src/index.js
    node_modules/google-gax/build/src/index.js:33:16
  
  - util.js:18 Object../node_modules/@google-cloud/firestore/build/src/util.js
    node_modules/@google-cloud/firestore/build/src/util.js:18:22
  
  - validate.js:19 Object../node_modules/@google-cloud/firestore/build/src/validate.js
    node_modules/@google-cloud/firestore/build/src/validate.js:19:16
```

# fix it (by changing stuff with typesaurus, not gatsby. I don't know how to fix it with gatsby):
Change /node_modules/typesaurus/adaptor/node.js to:

```javascript
'use strict'
/**
 * Browser Firestore adaptor.
 */
var __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod
    var result = {}
    if (mod != null)
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k]
    result['default'] = mod
    return result
  }
Object.defineProperty(exports, '__esModule', { value: true })
const firebase = __importStar(require('firebase/app'))
require('firebase/firestore')
function store() {
  const firestore = firebase.firestore()
  // At the moment, the browser's Firestore adaptor doesn't support getAll.
  // Get rid of the fallback when the issue is closed:
  // https://github.com/firebase/firebase-js-sdk/issues/1176
  if (!('getAll' in firestore)) return Object.assign(firestore, { getAll })
  return firestore
}
exports.default = store
function getAll(...docs) {
  return Promise.all(docs.map(doc => doc.get()))
}
//# sourceMappingURL=browser.js.map

```

> $ yarn build