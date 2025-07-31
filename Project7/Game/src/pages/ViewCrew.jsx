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
        .select('*') // Explicitly select all columns
        .eq('id', Number(id)) // Cast to number to avoid type mismatch
        .single();

      if (error) {
        console.error('Error fetching crewmate:', error);
        setLoading(false);
      } else {
        console.log('Fetched crewmate:', data);
        setCrewmate(data);
        setLoading(false);
      }
    };

    fetchCrewmate();
  }, [id]);

  if (loading) return <p>Loading crewmate details...</p>;

  if (!crewmate) {
    return (
      <div>
        <h2>🚫 Crewmate not found</h2>
        <p>We couldn't locate a crewmate with ID: {id}</p>
        <Link to="/">🔙 Back to crew list</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Name: {crewmate.name || 'Unnamed Crewmate'}</h2>
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
