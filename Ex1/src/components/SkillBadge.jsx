
export function SkillBadge({ name = 'React', tier = 'Core' }) {
  return (
    <span
      className={`skill-badge skill-badge--${tier.toLowerCase()}`}
      aria-label={`${name}: ${tier}`}
    >
      {name}
      <span className="skill-badge__tier">{tier}</span>
    </span>
  );
}
