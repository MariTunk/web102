import { TAGS } from '../data/tags';
import '../App.css';

function TagView({ tags = [], onSelect, isInteractive = false }) {
  if (!tags.length) return null;

  // Create a map for quick lookup
  const tagMap = Object.fromEntries(TAGS.map(tag => [tag.name, tag]));

  // Group tags by category
  const groupedTags = {};
  tags.forEach(tag => {
    const tagData = tagMap[tag];
    if (!tagData) return;

    const { category } = tagData;
    if (!groupedTags[category]) groupedTags[category] = [];
    groupedTags[category].push(tagData);
  });

  return (
    <div className="tag-groups">
      {Object.entries(groupedTags).map(([category, tagList]) => (
        <div key={category} className="tag-category">
          <h4 className="tag-category-title">{category}</h4>
          <div className="tag-list">
            {tagList.map(({ name, label, color, emoji, description }) => {
              const TagElement = isInteractive ? 'button' : 'span';
              const commonProps = {
                key: name,
                className: `tag-pill ${isInteractive ? 'clickable' : ''}`,
                style: { backgroundColor: color },
                title: description,
                ...(isInteractive && {
                  onClick: () => onSelect?.(name),
                  'aria-label': label,
                  type: 'button'
                })
              };

              return (
                <TagElement {...commonProps}>
                  {emoji && <span className="tag-emoji">{emoji}</span>}
                  {label}
                </TagElement>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TagView;
