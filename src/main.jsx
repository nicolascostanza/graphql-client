import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApolloClient, ApolloProvider ,HttpLink, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  // la prop cache siempre se necesita para setearlo
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000'
  })
})

// client.query({ query}).then((res) => console.log('res', res.data))

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
)
