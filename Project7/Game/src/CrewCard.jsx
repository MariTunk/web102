import React from 'react';
import { Link } from 'react-router-dom';

function CrewCard({ mate }) {
  return (
    <article
      className="crew-card"
      aria-labelledby={`crewmate-${mate.id}`}
    >
      <h3 id={`crewmate-${mate.id}`}>
        {mate.name || 'Unnamed Hero'}
      </h3>
      <p><strong>🔋 Power Source:</strong> {mate.power_source || 'Unknown'}</p>
      <p><strong>🛠 Skills:</strong> {mate.skills || 'None listed'}</p>
      <p><strong>💡 Core Value:</strong> {mate.core_value || 'N/A'}</p>
      <p><strong>📖 Origin Story:</strong> {mate.origin_story || 'No story shared'}</p>

      <div className="card-actions">
        <Link to={`/crewmate/${mate.id}`}>View</Link>{' '}
        <Link to={`/crewmate/${mate.id}/edit`}>Edit</Link>
      </div>
    </article>
  );
}

export default CrewCard;

