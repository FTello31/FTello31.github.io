---
title: Introduction to Node.js, v3 | Frontend Masters
description: by Scott Moss • Jul 26, 2026.
publishDate: 2026-08-15
---


# Introduction to Node.js v3



## Node.js

```text
Event loop      → coordinates asynchronous work
fs              → file system
http            → HTTP networking
path            → file paths
process.argv    → CLI arguments
npm             → dependencies/packages
Jest            → testing
```



## Course Resources

Course:

https://master.dev/courses/node-js-v3/

Course notes:

https://scottmoss.notion.site/Intro-to-Node-js-V3-7c8e4ccaebf94b839f425fff13dcc44c

Repository:

https://github.com/Hendrixer/intro-node-v3

CodeSandbox:

https://codesandbox.io/

Using a Node version manager such as `nvm` is recommended for switching between Node.js versions.

---

## Non-Blocking I/O

Node.js is designed around non-blocking asynchronous I/O.

JavaScript execution normally runs on a main thread, while many I/O operations can be delegated to the operating system or Node's underlying runtime.

The event loop coordinates when callbacks and asynchronous continuations execute.

Conceptually:

```text
JavaScript starts I/O operation
          ↓
Node does not block waiting
          ↓
other JavaScript can continue
          ↓
I/O finishes
          ↓
callback / promise continuation is queued
          ↓
event loop executes it
```

This makes Node.js particularly effective for I/O-heavy workloads such as:

- Web servers
- APIs
- File operations
- Network services
- Applications handling many concurrent connections

> Non-blocking I/O does not mean all JavaScript code runs in parallel. CPU-heavy synchronous JavaScript can still block the event loop.

---

## Hello World

Node.js provides a global runtime environment rather than the browser's `window` object.

In browsers:

```js
window
```

In Node.js:

```js
global
```

Modern JavaScript also provides:

```js
globalThis
```

which works across multiple environments.

### REPL

Node includes a REPL:

```text
Read
Evaluate
Print
Loop
```

Start it with:

```bash
node
```

This provides an interactive JavaScript environment directly in the terminal.

---

## Custom CLI Setup

Create a new Node.js project:

```bash
npm init
```

or:

```bash
npm init -y
```

To expose a command-line executable, add a `bin` entry to `package.json`.

Example:

```json
{
  "bin": {
    "my-cli": "./index.js"
  }
}
```

At the top of the executable file, add a shebang:

```js
#!/usr/bin/env node
```

The operating system uses this line to determine which runtime should execute the file.

### Install the CLI locally

From the project root:

```bash
npm link
```

This links the package into your local global npm environment so the CLI command can be executed from the terminal.

---

## `process.argv`

Command-line arguments are available through:

```js
process.argv
```

The first arguments are normally:

```text
process.argv[0] → Node executable
process.argv[1] → script path
process.argv[2] → first user-provided argument
```

Example:

```bash
my-cli hello
```

Read `"hello"`:

```js
const argument = process.argv[2];
```

---

## Modules Overview

There are several categories of modules in Node.js:

### Core modules

Provided by Node itself.

Examples:

```text
fs
http
path
```

### User-created modules

Modules written inside your application.

Example:

```js
import { count } from "./utils.js";
```

### Third-party modules

Packages installed through npm.

Example:

```bash
npm install lodash
```

Then:

```js
import _ from "lodash";
```

---

## ES Modules

To use ES modules in Node.js, `package.json` can include:

```json
{
  "type": "module"
}
```

Named export:

```js
export const count = 10;
```

Named import:

```js
import { count } from "./utils.js";
```

Default export:

```js
export default function add() {
  // ...
}
```

Default import:

```js
import add from "./utils.js";
```

---

## CommonJS Modules

CommonJS uses `require()` and `module.exports`.

Import:

```js
const { count } = require("./utils.js");
```

Export:

```js
module.exports = {
  count
};
```

In modern Node.js projects, ES modules are increasingly common, although CommonJS remains widely used.

---

## Importing Node Core Modules

File system module:

```js
import fs from "node:fs";
```

or:

```js
import * as fs from "node:fs";
```

The `node:` prefix explicitly identifies a built-in Node module.

Other common core modules:

```js
import http from "node:http";
import path from "node:path";
```

---

## Internal & Third-Party Modules

### `fs`

Provides file-system functionality.

Examples:

- Read files
- Write files
- Create directories
- Delete files

### `http`

Can create HTTP servers and clients.

Example:

```js
import http from "node:http";

const server = http.createServer((req, res) => {
  res.end("Hello");
});

server.listen(3000);
```

### `path`

Helps build and manipulate file paths safely.

Example:

```js
import path from "node:path";

const filePath = path.join("data", "db.json");
```

### npm

npm manages external packages and project dependencies.

Example:

```bash
npm install lodash
```

---

## Using a File as a Database

A JSON file can be used as a simple data store for learning purposes.

Course CRUD notes:

https://scottmoss.notion.site/Note-CRUD-54f302644e294d6992ba747ef1c5bf96

Typical helper functions:

```text
getDB()
saveDB()
insertDB()
```

Example database path:

```js
const DB_PATH = path.join("..", "db.json");
```

A more robust approach usually resolves paths relative to the current module or application directory to avoid depending on where the command is executed.

Conceptual workflow:

```text
Read db.json
    ↓
parse JSON
    ↓
modify JavaScript object
    ↓
JSON.stringify(...)
    ↓
write db.json
```

This is useful for learning CRUD concepts but is not a replacement for a production database.

---

## Unit Testing with Jest

Install Jest as a development dependency:

```bash
npm install jest --save-dev
```

Jest documentation:

https://jestjs.io/docs/expect#tobevalue

Testing courses:

https://master.dev/topics/testing/

Example:

```js
test("adds numbers", () => {
  expect(1 + 2).toBe(3);
});
```

Common matcher:

```js
expect(value).toBe(expectedValue);
```

---

## Testing with Mocks

A mock replaces or controls behavior during a test.

A **spy** records information about how a function was used.

For example, a spy can tell you:

- Whether a function was called
- How many times it was called
- Which arguments were passed
- What it returned

Conceptually:

```js
const spy = jest.spyOn(object, "method");
```

Then:

```js
expect(spy).toHaveBeenCalled();
```

For some ES module setups, Jest may need Node's experimental VM modules support:

```bash
node --experimental-vm-modules node_modules/jest/bin/jest.js
```

---












frontend master notes: 

# Introduction to Node.js, v3 | Frontend Masters

### Introduction

**Introduction**

[00:00:08](https://master.dev/courses/node-js-v3/introduction?t=8)
Here's a link to the [course notes](https://scottmoss.notion.site/scottmoss/Intro-to-Node-js-V3-7c8e4ccaebf94b839f425fff13dcc44c)

[00:03:27](https://master.dev/courses/node-js-v3/introduction?t=207)
Here's a link to the [finished course repo](https://github.com/Hendrixer/intro-node-v3)

[00:04:05](https://master.dev/courses/node-js-v3/introduction?t=245)
Here are links to check out [npm](http://npmjs.org/) and [Node.js](https://nodejs.org/en)

### Node Basics

**Non-Blocking I/O**

[00:00:00](https://master.dev/courses/node-js-v3/non-blocking-i-o?t=0)
non blocking I/O 
Node you can run things in parallel, because of the event loop. 
node is good on handleling tihng in parallel

**Hello World**

[00:00:25](https://master.dev/courses/node-js-v3/hello-world?t=25)
Here's a link to check out [CodeSandbox](https://codesandbox.io/)

[00:00:42](https://master.dev/courses/node-js-v3/hello-world?t=42)
Here's a link to check out [nvm](https://github.com/nvm-sh/nvm)

[00:00:50](https://master.dev/courses/node-js-v3/hello-world?t=50)
https://scottmoss.notion.site/Intro-to-Node-js-V3-7c8e4ccaebf94b839f425fff13dcc44c
https://github.com/Hendrixer/intro-node-v3

https://codesandbox.io/

use nvm


REPL 

instead of window there is global

[00:01:03](https://master.dev/courses/node-js-v3/hello-world?t=63)
Note: nvm is only available for Mac and Linux

[00:03:46](https://master.dev/courses/node-js-v3/hello-world?t=226)
Here's a link to the [Node.js website](https://nodejs.org/en)

### Creating a CLI

**Custom CLI Setup**

[00:03:27](https://master.dev/courses/node-js-v3/custom-cli-setup?t=207)
npm init -> create a node project

to make it a CLI, 
have to add : 
bin: { 
 "name-of-the-custom-CLI": ...
}

and to make it "installed" in local bin folder on the root project folder,: 
npm link

add a comment that only operating system will care about : #!usr/bin....

first 2 arguments are gong to be the env. ..
fo to grab the "first" argument from the user. 
should put process.argv[2]

[00:05:29](https://master.dev/courses/node-js-v3/custom-cli-setup?t=329)
Note: Windows users may want to change their VSCode settings to use 'LF' instead of 'CRLF' for end-of-lines

[00:08:37](https://master.dev/courses/node-js-v3/custom-cli-setup?t=517)
"where" is the Windows equivalent

### Modules

**Modules Overview**

[00:01:50](https://master.dev/courses/node-js-v3/modules-overview?t=110)
a

[00:02:19](https://master.dev/courses/node-js-v3/modules-overview?t=139)
internal modules 

Usercreated modules

third parties modules

es6 modules way : 
add "type": module to package.json

export and default exports

**Importing & Exporting Modules**

[00:02:09](https://master.dev/courses/node-js-v3/importing-exporting-modules?t=129)
import files system 

import fs from 'fs' -> because is inside node. core internal fs module
import _ from 'loadash'


require vs import 

to import:
import {count} from './utils.js'
const {count} = require('./utils.js')

to export: 
module.exports ={ 
 count 
}

**Internal & 3rd-Party Modules**

[00:00:36](https://master.dev/courses/node-js-v3/internal-3rd-party-modules?t=36)
modules: 

fs: core internal module to access for file system.
http: use it to make a server
path :....

NPM

**Using the yargs Module**

[00:00:18](https://master.dev/courses/node-js-v3/using-the-yargs-module?t=18)
Here's a link to check out the [yargs npm module](https://www.npmjs.com/package/yargs)

### File I/O

**Async Code**

[00:00:12](https://master.dev/courses/node-js-v3/async-code?t=12)
Here's a link to the [yargs notes](https://scottmoss.notion.site/Using-yargs-0727dfad1fa647848984e317d40d4cbd)

**FS Module**

[00:11:00](https://master.dev/courses/node-js-v3/fs-module?t=660)
Here's a link to the documentation on [File system](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html)

**Using a File as a DB**

[00:02:01](https://master.dev/courses/node-js-v3/using-a-file-as-a-db?t=121)
On Windows, you may need to use `const DB_PATH = path.join("..", "db.json");`

[00:02:11](https://master.dev/courses/node-js-v3/using-a-file-as-a-db?t=131)
using a file as a DB 

getDB

SaveDB

insertDB

windows:
const DB_PATH = path.join("..", "db.json");

https://scottmoss.notion.site/Note-CRUD-54f302644e294d6992ba747ef1c5bf96

**CRUD Methods: Create**

[00:00:35](https://master.dev/courses/node-js-v3/crud-methods-create?t=35)
Here's a link to the [CRUD notes](https://scottmoss.notion.site/Note-CRUD-54f302644e294d6992ba747ef1c5bf96)

### Testing

**Types of Tests**

[00:05:56](https://master.dev/courses/node-js-v3/types-of-tests?t=356)
Here's a link to check out our [courses on testing](https://master.dev/topics/testing/)

**Unit Testing with Jest**

[00:03:22](https://master.dev/courses/node-js-v3/unit-testing-with-jest?t=202)
Here's a link to check out the documentation on [.toBe()](https://jestjs.io/docs/expect#tobevalue)

[00:03:41](https://master.dev/courses/node-js-v3/unit-testing-with-jest?t=221)
test use jest
https://jestjs.io/docs/expect#tobevalue

npm i jest --save-dev

Here's a link to check out our courses on testing
https://master.dev/topics/testing/

[00:05:05](https://master.dev/courses/node-js-v3/unit-testing-with-jest?t=305)
`npm i jest --save-dev`

[00:10:34](https://master.dev/courses/node-js-v3/unit-testing-with-jest?t=634)
Here's a link to check out our [courses on testing](https://master.dev/topics/testing/)

**Testing with Mocks**

[00:00:01](https://master.dev/courses/node-js-v3/testing-with-mocks?t=1)
spy= function that ill tell you eveything that is been fone with that function

node --experimental-vm-modules node_modules/jest/bin/jest.js

[00:00:11](https://master.dev/courses/node-js-v3/testing-with-mocks?t=11)
Here's a link to the [Unit testing with Jest notes](https://scottmoss.notion.site/Unit-testing-with-Jest-843302eedecc4a0da12e1d7f37feae37)

[00:08:43](https://master.dev/courses/node-js-v3/testing-with-mocks?t=523)
`node --experimental-vm-modules node_modules/jest/bin/jest.js`

[00:09:28](https://master.dev/courses/node-js-v3/testing-with-mocks?t=568)
Here's a link to the [finished course repo](https://github.com/Hendrixer/intro-node-v3)

### Servers

**Creating a Basic Server**

[00:00:08](https://master.dev/courses/node-js-v3/creating-a-basic-server?t=8)
Here's a link to check out our [courses on testing](https://master.dev/topics/testing/)

[00:05:39](https://master.dev/courses/node-js-v3/creating-a-basic-server?t=339)
Here's a link to check out MDN's documentation on [HTTP status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

**Sending Notes to the Client**

[00:07:40](https://master.dev/courses/node-js-v3/sending-notes-to-the-client?t=460)
Learn more about Express in Scott's [API Design in Node.js course](https://master.dev/courses/api-design-nodejs-v4/)

### Wrapping Up

**Wrapping Up**

[00:02:05](https://master.dev/courses/node-js-v3/wrapping-up?t=125)
Here's a link to check out [Express.js](https://expressjs.com/)

[00:02:39](https://master.dev/courses/node-js-v3/wrapping-up?t=159)
Learn more about Express in Scott's [API Design in Node.js course](https://master.dev/courses/api-design-nodejs-v4/)

[00:03:13](https://master.dev/courses/node-js-v3/wrapping-up?t=193)
Here's a link to check out our [courses on databases](https://master.dev/topics/databases/)

[00:03:36](https://master.dev/courses/node-js-v3/wrapping-up?t=216)
Here's a link to check out [Prisma](https://www.prisma.io/)

[00:04:03](https://master.dev/courses/node-js-v3/wrapping-up?t=243)
Here's a link to check out npm's documentation on [publishing scoped public packages](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages)

[00:04:28](https://master.dev/courses/node-js-v3/wrapping-up?t=268)
Here's a link to check out [Creating an Open Source JavaScript Library](https://master.dev/courses/open-source/)

[00:04:38](https://master.dev/courses/node-js-v3/wrapping-up?t=278)
Here's a link to check out the [TypeScript Learning Path](https://master.dev/learn/typescript/)

[00:04:50](https://master.dev/courses/node-js-v3/wrapping-up?t=290)
Here's a link to check out [Scott's API Design in Node.js course](https://master.dev/courses/api-design-nodejs-v4/)
