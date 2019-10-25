## 📚 Remote cspell dictionary

[Cspell](https://github.com/streetsidesoftware/cspell#readme) lets you create a list of allowed words in your codebase.
Keeping this list up to date across multiple repos is a time consuming process.

Remote dictionay is a suite of packages that allow the use of a shared word list.

#### 🔨 Built with

- [Lerna](https://github.com/lerna/lerna)
- [Husky](https://github.com/typicode/husky#readme)

#### 🏗️ Setup

- Install lerna `npm i`
- Install all modules with Lerna `lerna bootstrap`
- Define API config in `packages/api/src/config`

#### 🏢 Structure

- `packages/api` - Restful API to manage word list.
- `packages/client` - Deployable NPM package.
