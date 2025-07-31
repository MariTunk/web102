import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';

function UpdateCrew() {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState({ name: '', attributes: '', power_source: '', skills: '', core_value: '', origin_story: '' });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from('crewmates')
        .select()
        .eq('id', id)
        .single();
      setCrewmate({ name: data.title, attributes: data.author, power_source: data.power_source, skills: data.skills, core_value: data.core_value, origin_story: data.origin_story });
    };

    fetchData();
  }, [id]);

  const updateCrew = async (event) => {
    event.preventDefault();
    await supabase
      .from('crewmates')
      .update({
        title: crewmate.name,
        author: crewmate.attributes
      })
      .eq('id', id);
    window.location = "/";
  };

  const deleteCrew = async (event) => {
    event.preventDefault();
    await supabase
      .from('crewmates')
      .delete()
      .eq('id', id);
    window.location = "/";
  };

  return (
    <form onSubmit={updateCrew}>
      <input
        type="text"
        value={crewmate.name}
        onChange={(e) => setCrewmate({ ...crewmate, name: e.target.value })}
        placeholder="Name"
      />
      <input
        type="text"
        value={crewmate.attributes}
        onChange={(e) => setCrewmate({ ...crewmate, attributes: e.target.value })}
        placeholder="Attributes"
      />
        <input
            type="text"
            value={crewmate.power_source}
            onChange={(e) => setCrewmate({ ...crewmate, power_source: e.target.value })}
            placeholder="Power Source"
        />
        <input
            type="text"
            value={crewmate.skills}
            onChange={(e) => setCrewmate({ ...crewmate, skills: e.target.value })}
            placeholder="Skills"
        />
        <input
            type="text"
            value={crewmate.core_value}
            onChange={(e) => setCrewmate({ ...crewmate, core_value: e.target.value })}
            placeholder="Core Value"
        />
        <input
            type="text"
            value={crewmate.origin_story}
            onChange={(e) => setCrewmate({ ...crewmate, origin_story: e.target.value })}
            placeholder="Origin Story"
        />
        
      <button type="submit">Update</button>
      <button onClick={deleteCrew}>Delete</button>
    </form>
  );
}

export default UpdateCrew;
