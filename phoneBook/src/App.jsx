import { useState, useEffect } from "react";
import personsService from "./services/persons";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const personsNames = persons.map((name) => name.name);
  const addPerson = (event) => {
    event.preventDefault();
    if (personsNames.includes(newName)) {
      const oldPerson = persons[personsNames.indexOf(newName)];
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...oldPerson, number: newNumber };
        personsService.update(oldPerson.id, updatedPerson).catch((error) => {
          setErrorMessage("This contact was already deleted from server");
          personsService.getAll().then((initialPersons) => {
            setPersons(initialPersons);
          });
        });
        setPersons(
          persons.map((person) =>
            person.id !== oldPerson.id ? person : updatedPerson
          )
        );
        setNewName("");
        setNewNumber("");

        setErrorMessage(`number updated sucessfully`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personsService
        .create(personObject)
        .then((newPerson) => {
          setPersons(persons.concat(newPerson));
          setNewName("");
          setNewNumber("");

          setErrorMessage(`contact added sucessfully`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.log(error.response.data.error);
          setErrorMessage(`${error.response.data.error}`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`delete ${name}?`)) {
      setPersons(persons.filter((person) => person.id !== id));
      personsService.remove(id);

      setErrorMessage("contact deleted successfully");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handlePersonNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePersonNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handlePersonNameChange={handlePersonNameChange}
        newNumber={newNumber}
        handlePersonNumberChange={handlePersonNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
