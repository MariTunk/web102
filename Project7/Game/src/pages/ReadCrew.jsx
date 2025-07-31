import { useEffect, useState } from 'react';
import { supabase } from '../client';

function ReadCrew() {
  const [crew, setCrew] = useState([]);

  const fetchCrew = async () => {
    const { data, error } = await supabase
      .from('crewmates')
      .select();

    if (error) {
      console.error('Error fetching crew:', error);
    } else {
      setCrew(data);
    }
  };

  useEffect(() => {
    fetchCrew();
  }, []);

  return (
    <div>
      <h2>Crewmates</h2>
      <ul>
        {crew.map((mate) => (
          <li key={mate.id}>
            <strong>{mate.title}</strong> — {mate.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReadCrew;
// This code defines a React component for reading and displaying a list of crewmates from a Supabase database.