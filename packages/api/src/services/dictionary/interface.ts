export interface IDictionary {
  dictionaries: Array<string>,
  flagWords: Array<string>,
  language: string,
  version: string,
  words: Array<string>
}

export interface IWord {
  word: {
    [AttributeType: string]: string
  }
}
