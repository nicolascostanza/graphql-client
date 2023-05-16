import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { ALL_PERSONS } from "./App";

const CREATE_PERSON = gql`
  mutation createPerson(
    $name: String!
    $phone: String
    $street: String!
    $city: String!
  ) {
    addPerson(name: $name, phone: $phone, city: $city, street: $street) {
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

function PersonForm() {
  const [values, setValues] = useState(null);
	const [createPerson, {loading, data, error}] = useMutation(CREATE_PERSON, {
		refetchQueries: [{query: ALL_PERSONS}]
	});

  const handleOnChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
		createPerson({variables: values})

    setValues(null);
  };
  return (
    <div>
      <h2>Create new Person</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Name">Name</label>
          <input name="name" type="text" onChange={handleOnChange} />
        </div>
        <div>
          <label htmlFor="Phone">Phone</label>
          <input name="phone" type="number" onChange={handleOnChange} />
        </div>
        <div>
          <label htmlFor="City">City</label>
          <input name="city" type="text" onChange={handleOnChange} />
        </div>
        <div>
          <label htmlFor="street">Street</label>
          <input name="street" type="text" onChange={handleOnChange} />
        </div>
				<button>Create</button>
      </form>
    </div>
  );
}

export default PersonForm;
