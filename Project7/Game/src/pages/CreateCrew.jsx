import { useState } from 'react';
import { supabase } from '../client';

function CreateCrew() {
  const [crewmate, setCrewmate] = useState({ name: '', attributes: '',power_source: '', skills: '', core_value: '', origin_story: '' });

  const createCrew = async (event) => {
    event.preventDefault();

    await supabase
      .from('crewmates')
      .insert({
        title: crewmate.name,
        author: crewmate.attributes
      })
      .select();

    window.location = "/";
  };

  return (
    <form onSubmit={createCrew}>
      <input
        type="text"
        placeholder="Name"
        value={crewmate.name}
        onChange={(e) =>
          setCrewmate({ ...crewmate, name: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Attributes"
        value={crewmate.attributes}
        onChange={(e) =>
          setCrewmate({ ...crewmate, attributes: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="power_source"
        value={crewmate.power_source}
        onChange={(e) =>
          setCrewmate({ ...crewmate, power_source: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="skills"
        value={crewmate.skills}
        onChange={(e) =>
          setCrewmate({ ...crewmate, skills: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="core_value"
        value={crewmate.core_value}
        onChange={(e) =>
          setCrewmate({ ...crewmate, core_value: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="origin_story"
        value={crewmate.origin_story}
        onChange={(e) =>
          setCrewmate({ ...crewmate, origin_story: e.target.value })
        }
      />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default CreateCrew;
// This code defines a React component for creating a new crewmate in a game.
