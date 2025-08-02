import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

function UpdateCrew() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [powerSource, setPowerSource] = useState('');
  const [skills, setSkills] = useState('');
  const [coreValue, setCoreValue] = useState('');
  const [originStory, setOriginStory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrewmate = async () => {
      const { data, error } = await supabase
        .from('crewmates') // ✅ Make sure the table is correct
        .select('*')
        .eq('id', id) // Supabase handles `id` as a string internally, so no need for `Number(id)`
        .single(); // If you're sure the ID exists, otherwise use `maybeSingle()`

      if (error) {
        console.error('Fetch error:', error);
      } else if (!data) {
        console.warn(`No crewmate found with ID: ${id}`);
      } else {
        setName(data.name || '');
        setPowerSource(data.power_source || '');
        setSkills(data.skills || '');
        setCoreValue(data.core_value || '');
        setOriginStory(data.origin_story || '');
      }

      setLoading(false);
    };

    fetchCrewmate();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from('crewmates')
      .update({
        name,
        power_source: powerSource,
        skills,
        core_value: coreValue,
        origin_story: originStory,
      })
      .eq('id', id); // Same here—no need to convert to Number

    if (error) {
      console.error('Update error:', error);
    } else {
      navigate('/');
    }
  };

  if (loading) return <p>Loading crewmate details...</p>;

  return (
    <form onSubmit={handleUpdate}>
      <label htmlFor="name">Name:</label>
      <input id="name" value={name} onChange={(e) => setName(e.target.value)} required />

      <label htmlFor="powerSource">Power Source:</label>
      <input id="powerSource" value={powerSource} onChange={(e) => setPowerSource(e.target.value)} required />

      <label htmlFor="skills">Skills:</label>
      <input id="skills" value={skills} onChange={(e) => setSkills(e.target.value)} />

      <label htmlFor="coreValue">Core Value:</label>
      <input id="coreValue" value={coreValue} onChange={(e) => setCoreValue(e.target.value)} />

      <label htmlFor="originStory">Origin Story:</label>
      <textarea id="originStory" value={originStory} onChange={(e) => setOriginStory(e.target.value)} />

      <button type="submit">💾 Update Crewmate</button>
    </form>
  );
}

export default UpdateCrew;
