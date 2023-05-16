import "./App.css";
import { gql, useQuery } from "@apollo/client";
import Persons from "./Persons.jsx";
import PersonForm from './PersonForm.jsx';

export const ALL_PERSONS = gql`
  query {
    allPersons(phone: YES) {
      name
      phone
      id
      address {
        city
        street
      }
    }
  }
`;

function App() {
  const { data, error, loading } = useQuery(ALL_PERSONS);

  if (error) return <p>Error</p>;

  if (loading) return <p>Loading...</p>;

  return <>
  <PersonForm />
  <Persons persons={data?.allPersons} />
  </>
}

export default App;
