import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';

function ViewCrew() {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrewmate = async () => {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*') // Select all fields explicitly
        .eq('id', Number(id)) // Ensure ID type match
        .maybeSingle(); // Gracefully handle no result

      if (error) {
        console.error('Error fetching crewmate:', error);
        console.info('Supabase response data:', data);
      } else if (!data) {
        console.warn(`No crewmate found with ID: ${id}`);
      }

      setCrewmate(data);
      setLoading(false);
    };

    fetchCrewmate();
  }, [id]);

  if (loading) {
    return (
      <section aria-busy="true">
        <p>Loading crewmate details...</p>
      </section>
    );
  }

  if (!crewmate) {
    return (
      <div role="alert">
        <h2>🚫 Crewmate not found</h2>
        <p>We couldn't locate a crewmate with ID: {id}</p>
        <Link to="/">🔙 Back to crew list</Link>
      </div>
    );
  }

  return (
    <div role="region" aria-labelledby="crewmate-name">
      <h2 id="crewmate-name">Name: {crewmate.name || 'Unnamed Crewmate'}</h2>
      <p>Attributes: {crewmate.attributes || 'No attributes available'}</p>
      <p>Power Source: {crewmate.power_source || 'Unknown'}</p>
      <p>Skills: {crewmate.skills || 'None listed'}</p>
      <p>Core Value: {crewmate.core_value || 'Not specified'}</p>
      <p>Origin Story: {crewmate.origin_story || 'No story available'}</p>
      <br />
      <Link to={`/crewmate/${id}/edit`}>✏️ Edit this crewmate</Link>
      <br />
      <Link to="/">🔙 Back to crew list</Link>
    </div>
  );
}

export default ViewCrew;
// This code defines a React component that fetches and displays details of a specific crewmate from a Supabase database.