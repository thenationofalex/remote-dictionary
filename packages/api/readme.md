## 📚 Remote dictionary api

Manage cSpell word config via an API.

Swagger docs available via `http://localhost:3000/documentation`

#### 🔨 Built with

- [Typescript](https://www.typescriptlang.org/)
- [Hapi 18](http://hapijs.com/)
- [AWS SDK](https://aws.amazon.com/tools/)
- [Lodash FP](https://github.com/lodash/lodash/wiki/FP-Guide)

#### 🏗️ Setup

- Install all NPM modules
- Define API, AWS config settings in `src/config/index.ts`
- Ensure the AWS CLI has been configured `aws configure`

  ```
    AWS Access Key ID [None]: foo
    AWS Secret Access Key [None]: bar
    Default region name [None]: local
    Default output format [None]: json
  ```

- Ensure an available connection to DynamoDB is [setup](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html).

#### 📖 Commands

Command                | Purpose
:--------------------- | :----------------------------------------------
`npm run dev`          | Run development server
`npm run lint`         | Lint codebase
`npm run test`         | Run jest test suite
