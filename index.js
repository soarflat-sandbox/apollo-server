const { ApolloServer, gql } = require('apollo-server');

// クライアントからのリクエストに対してレスポンスするデータ
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
  そのため、どのようなリクエストに対しても、常に文字列の値を返すことを保証している。
  """
  type Book {
    title: String!
    author: String
  }

  """
  Query はデータ取得系のクエリである query のために予約された型で、全ての query のルートとなる型。
  クライアントからリクエストできる query をここのフィールドに定義する。
  今回の場合、以下のような query をリクエストできる。
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
// リゾルバはクエリに対して、対応するデータを返す関数。
// 今回、type Query が books というフィールドを持っているので、
// books という query に応じたデータを返す関数を定義している。
const resolvers = {
  Query: {
    books: () => books
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
