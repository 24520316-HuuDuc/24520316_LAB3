
import { useId, useState } from 'react';
import { SMART_PEOPLE } from '../data/smartPeople';

export function ScientistDirectory() {
  const searchId = useId();
  const iqId = useId();
  const sortId = useId();

  // Four independent states
  const [people, setPeople] = useState(SMART_PEOPLE);
  const [query, setQuery] = useState('');
  const [minIq, setMinIq] = useState(160);
  const [sortBy, setSortBy] = useState('iq-desc');

  // Derived state: filter and sort without useEffect
  const visiblePeople = people
    .filter((person) => {
      const matchesName = person.name
        .toLowerCase()
        .includes(query.trim().toLowerCase());

      const matchesIq = person.iq >= minIq;

      return matchesName && matchesIq;
    })
    .toSorted((a, b) => {
      if (sortBy === 'iq-desc') {
        return b.iq - a.iq;
      }

      if (sortBy === 'age-asc') {
        return a.age - b.age;
      }

      return 0;
    });

  // Delete one scientist
  function handleDelete(id) {
    setPeople((prev) =>
      prev.filter((person) => person.id !== id)
    );
  }

  // Restore original data
  function handleReset() {
    setPeople(SMART_PEOPLE);
  }

  return (
    <section className="directory">
      <header className="directory-header">
        <p className="eyebrow">LAB 3 - EXERCISE 2</p>
        <h1>Scientist Directory</h1>
        <p>Interactive Scientist & Pioneer Directory</p>
      </header>

      <section className="controls" aria-label="Search and filters">
        <div className="control-group">
          <label htmlFor={searchId}>Search by name</label>
          <input
            id={searchId}
            type="search"
            placeholder="Enter scientist name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="control-group">
          <label htmlFor={iqId}>Minimum IQ: {minIq}</label>
          <input
            id={iqId}
            type="number"
            min="0"
            value={minIq}
            onChange={(e) => {
              const value = e.target.valueAsNumber;
              setMinIq(Number.isNaN(value) ? 0 : value);
            }}
          />
        </div>

        <div className="control-group">
          <label htmlFor={sortId}>Sort by</label>
          <select
            id={sortId}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="iq-desc">IQ: Highest first</option>
            <option value="age-asc">Age: Youngest first</option>
          </select>
        </div>

        <button type="button" onClick={handleReset}>
          Reset Directory
        </button>
      </section>

      <output role="status" aria-live="polite" className="result-count">
        Found {visiblePeople.length} pioneers
      </output>

      <section className="people-list" aria-label="Scientist list">
        {visiblePeople.length > 0 ? (
          visiblePeople.map((person) => (
            <article className="person-card" key={person.id}>
              <div className="person-info">
                <h2>{person.name}</h2>
                <p>Age: {person.age}</p>
                <p>IQ: {person.iq}</p>
              </div>

              <button
                type="button"
                className="delete-button"
                onClick={() => handleDelete(person.id)}
                aria-label={`Delete ${person.name}`}
              >
                Delete
              </button>
            </article>
          ))
        ) : (
          <p className="empty-message">No scientists found.</p>
        )}
      </section>
    </section>
  );
}
