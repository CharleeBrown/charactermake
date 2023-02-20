import React, { useState, useEffect } from "react";
import axios from "axios";

function CharacterCreator() {
  const [formData, setFormData] = useState({
    name: "",
    race: "",
    charClass: "",
    level: 1,
    strength: 8,
    dexterity: 8,
    constitution: 8,
    intelligence: 8,
    wisdom: 8,
    charisma: 8,
  });

  const [races, setRaces] = useState([]);
  const [classes, setClasses] = useState([]);
  const [lockedStats, setLockedStats] = useState(false);

  useEffect(() => {
    axios
      .get("https://www.dnd5eapi.co/api/races")
      .then((response) => setRaces(response.data.results))
      .catch((error) => console.log(error));

    axios
      .get("https://www.dnd5eapi.co/api/classes")
      .then((response) => setClasses(response.data.results))
      .catch((error) => console.log(error));
  }, []);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleStatChange = (event) => {
    if (!lockedStats) {
      const { name, value } = event.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: parseInt(value),
      }));
    }
  };

  const handleLockStats = () => {
    setLockedStats(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Save character to long-term storage
    localStorage.setItem("character", JSON.stringify(formData));
    console.log("Character saved to long-term storage:", formData);
  };

  return (
    <div >
          <h1>Create Your D&D Character</h1>
              <form onSubmit={handleSubmit}>
              <div class="col">
                <div class="row">
                        <label>
                          Name:
                        <input type="text" name="name" onChange={handleFormChange} />
                      </label>
              </div>
              </div>
              <br />
              <div class="row">
                <label>
                          Race:
                        <select name="race" onChange={handleFormChange}>
                          <option value="">Select a race</option>
                                {races.map((race) => (
                          <option key={race.index} value={race.name}>
                                {race.name}
                          </option>
                                                      ))}
                        </select>
                      </label>
        <br />
                <label>
                    Class:
                  <select name="charClass" onChange={handleFormChange}>
                    <option value="">Select a class</option>
                          {classes.map((charClass) => (
                    <option key={charClass.index} value={charClass.name}>
                          {charClass.name}
                    </option>
                                                ))}
                  </select>
                </label>
                </div>
        <br />
              <label>
                  Level:
                  <input type="number" name="level" onChange={handleFormChange} />
              </label>
        <br />
              <label>
                  Strength:
                <input
                  type="number"
                  name="strength"
                  value={formData.strength}
                  onChange={handleStatChange}
                  max="20"
                />
              </label>
        <br />
              <label>
                  Dexterity:
                <input
                  type="number"
                  name="dexterity"
                  value={formData.dexterity}
                  onChange={handleStatChange}
                  max="20"
                />
              </label>
        <br />
              <label>
                  Constitution:
                <input
                type="number"
                name="constitution"
                value={formData.constitution}
                onChange={handleStatChange}
                max="20"
                />
        </label>
        <br />
        <label>
          Intelligence:
          <input
            type="number"
            name="intelligence"
            value={formData.intelligence}
            onChange={handleStatChange}
            max="20"
          />
        </label>
        <br />
        <label>
          Wisdom:
          <input
            type="number"
            name="wisdom"
            value={formData.wisdom}
            onChange={handleStatChange}
            max="20"
          />
        </label>
        <br />
        <label>
          Charisma:
          <input
            type="number"
            name="charisma"
            value={formData.charisma}
            onChange={handleStatChange}
            max="20"
          />
        </label>
        <br />
        {!lockedStats && (
          <button type="button" onClick={handleLockStats}>
            Lock Stats
          </button>
        )}
        <button type="submit">Save Character</button>
      </form>
    </div>
  );
}

export default CharacterCreator;
