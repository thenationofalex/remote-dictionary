## 📚 Remote dictionary

Cspell lets you create a list of allowed words in your codebase.
Keeping this list up to date across multiple repos is a time consuming process.

Remote dictionay is a suite of packages that allow the use of a shared word list.

#### 🔨 Built with

- [Lerna](https://github.com/lerna/lerna)

#### 🏗️ Setup

- Install lerna `npm i`
- Install all modules with Lerna `lerna bootstrap`
- Define API config in `packages/api/src/config`

#### 🏢 Structure

- `packages/api`
- `packages/client`
