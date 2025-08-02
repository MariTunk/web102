import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';

function CreateCrew() {
  const navigate = useNavigate();

  const [crewmate, setCrewmate] = useState({
    name: '',
    power_source: '',
    skills: '',
    core_value: '',
    origin_story: ''
  });

  const handleChange = (field) => (e) => {
    setCrewmate({ ...crewmate, [field]: e.target.value });
  };

  const createCrew = async (event) => {
    event.preventDefault();

    const { error } = await supabase
      .from('crewmates')
      .insert([crewmate]);

    if (error) {
      console.error('Insert error:', error);
    } else {
      navigate('/'); 
    }
  };

  return (
    <form onSubmit={createCrew}>
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        type="text"
        value={crewmate.name}
        onChange={handleChange('name')}
        required
      />


      <label htmlFor="power_source">Power Source:</label>
      <input
        id="power_source"
        type="text"
        value={crewmate.power_source}
        onChange={handleChange('power_source')}
        required
      />

      <label htmlFor="skills">Skills:</label>
      <input
        id="skills"
        type="text"
        value={crewmate.skills}
        onChange={handleChange('skills')}
      />

      <label htmlFor="core_value">Core Value:</label>
      <input
        id="core_value"
        type="text"
        value={crewmate.core_value}
        onChange={handleChange('core_value')}
      />

      <label htmlFor="origin_story">Origin Story:</label>
      <textarea
        id="origin_story"
        value={crewmate.origin_story}
        onChange={handleChange('origin_story')}
        rows={4}
      />

      <button type="submit">🚀 Create Crewmate</button>
    </form>
  );
}

export default CreateCrew;

