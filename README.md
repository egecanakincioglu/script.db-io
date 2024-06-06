# 📦 script.db-io

script.db-io is a simple JavaScript library for IPFS DAG storage. This library allows you to write data to IPFS and read data from IPFS. Additionally, it supports various data formats and codecs.

## ✨ Features

- Provides easy-to-use interface for IPFS DAG storage.
- Supports conversion between JSON, protobuf, and other formats.
- Manages IPFS CIDs.
- Utilizes the latest versions of multiformats.

## 🚀 Installation

To install project dependencies:

```
npm install
```

## 🛠️ Usage

```javascript
import { read, write } from 'script.db-io'

// Create IPFS connection
const ipfs = ...

// Write data
const data = { key: 'value' }
const cid = await write(ipfs, 'dag-cbor', data)

// Read data
const readData = await read(ipfs, cid)
console.log(readData)
```

## 🧪 Testing

You can run tests using the `npm test` command.

## 📜 License

This project is licensed under the MIT License.

## 🤝 Contribution

Contributions are welcome! Please report suggestions or issues on [GitHub Issues](https://github.com/egecanakincioglu/script.db-io). You can also contribute by opening a pull request.

## 📧 Contact

If you have any questions or want to get in touch, feel free to reach us via [email](mailto:egecanakincioglu@icloud.com).

---

<p align="center">Developed by Cartel & Papaz Chavo</p>