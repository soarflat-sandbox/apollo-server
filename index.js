const { ApolloServer, gql } = require('apollo-server');

// リクエストされた GraphQL クエリに対してレスポンスするデータ
const books = [
  {
    title: 'JavaScript: The Definitive Guide, 7th Edition',
    author: 'David Flanagan'
  },
  {
    title: 'Refactoring: Improving the Design of Existing Code',
    author: 'Martin Fowler'
  },
  {
    title: 'Programming TypeScript'
  }
];

// GraphQLスキーマ
const typeDefs = gql`
  """
  Book という名前のオブジェクト型（Object Type）。
  Book は title というフィールド（field）と author というフィールドを持っている。
  String は GraphQL に組み込まれている「スカラー型」という種類の型であり、
  名前の通り文字列型（UTF-8文字シーケンス）。
  String! のように「!」は Null でないことを保証する。
  そのため、どのような要求に対しても、常に文字列の値を返すことを保証している。
  """
  type Book {
    title: String!
    author: String
  }

  """
  Query はデータ取得系の Operation である query のために予約された型であり、全ての query のルートとなる型。
  GraphQL API に要求できる query をここのフィールドに定義する。
  今回の定義では、以下のようなフィールドを要求できるようになる。
  query {
    books {
      title
      author
    }
  }
  """
  type Query {
    books: [Book]
  }
`;

// リゾルバ（redolver）
// リゾルバはクエリに応じたデータを返す関数。
// 「type Query の books フィールドを要求するクエリ」に応じたデータを返す関数を定義している。
const resolvers = {
  Query: {
    books: () => books
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
