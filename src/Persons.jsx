/* eslint-disable react/prop-types */
import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
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
function Persons({ persons = [] }) {
	const [getPerson, result] = useLazyQuery(FIND_PERSON)
	const [person, setPerson] = useState(null);

	const showPerson = name => {
		getPerson({variables: {nameToSearch: name}})
	}

	useEffect(() => {
		if(result.data){
			setPerson(result.data.findPerson)
		}
	}, [result])

	if(persons === null) return null

	if(person){
		return (
			<div>
				<h2>{person.name}</h2>
				<h2>{person.address.city} - {person.address.street}</h2>
				<h2>{person.phone}</h2>
				<h2>{person.id}</h2>
				<button onClick={() => setPerson(null)}>Close</button>
			</div>
		)
	}

  return (
    <div>
      <h3>Persons</h3>
      {persons.map((person) => (
        <div key={person.id} onClick={() => showPerson(person.name)}>
          {person.name} - {person.phone}
        </div>
      ))}
    </div>
  );
}

export default Persons;
