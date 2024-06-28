const Persons = (props) => {
  return props.persons.map((person) =>
    person.name.toLowerCase().indexOf(props.filter.toLowerCase()) !== -1 ? (
      <p key={person.name}>
        {person.name} {person.number}
        <button onClick={() => props.deletePerson(person.id, person.name)}>
          Delete
        </button>
      </p>
    ) : null
  );
};

export default Persons;
