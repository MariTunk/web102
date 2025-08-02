import { useEffect, useState } from 'react';
import { supabase } from '../client';
import CrewCard from '../CrewCard';

function ReadCrew() {
  const [crew, setCrew] = useState([]);

  useEffect(() => {
    const fetchCrew = async () => {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*');

      if (error) {
        console.error('Error fetching crew:', error);
      } else {
        setCrew(data || []);
      }
    };

    
    fetchCrew();
  }, []);


  return (
    <section aria-labelledby="crewmate-heading">
      <h2 id="crewmate-heading">Crewmate Roster</h2>
      {crew.length === 0 ? (
        <p>No heroes recruited yet. Start building your team!</p>
      ) : (
        <div className="crew-grid">
          {crew.map((mate) => (
            <CrewCard key={mate.id} mate={mate} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ReadCrew;
