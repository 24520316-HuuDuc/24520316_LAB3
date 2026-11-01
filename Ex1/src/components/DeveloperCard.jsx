
import { Fragment, useState } from 'react';
import { SkillBadge } from './SkillBadge';
import styles from './DeveloperCard.module.css';

const FALLBACK_IMAGE =
  'https://placehold.co/120x120/png?text=Developer';

export function DeveloperCard({
  fullName = 'Le Huu Duc',
  role = 'Frontend Developer | UIT Student',
  avatarUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240',
  metrics = {
    commits: 512,
    experience: '2 Years',
    projects: 15,
  },
  skills = [
    { id: 'sk1', name: 'React 19', tier: 'Core' },
    { id: 'sk2', name: 'JavaScript', tier: 'Advanced' },
    { id: 'sk3', name: 'HTML & CSS', tier: 'Core' },
    { id: 'sk4', name: 'Node.js', tier: 'Intermediate' },
  ],
}) {
  const [imageSrc, setImageSrc] = useState(avatarUrl);

  return (
    <article
      className={styles.card}
      aria-labelledby="dev-heading"
    >
      <header className={styles.header}>
        <img
          className={styles.avatar}
          src={imageSrc}
          alt={`${fullName} avatar`}
          width="80"
          height="80"
          onError={() => setImageSrc(FALLBACK_IMAGE)}
        />

        <hgroup>
          <h2 id="dev-heading">{fullName}</h2>
          <p>{role}</p>
        </hgroup>
      </header>

      <section aria-label="Developer statistics">
        <h3>Developer Statistics</h3>

        <dl className={styles.metrics}>
          {Object.entries(metrics).map(([key, value]) => (
            <Fragment key={key}>
              <dt>{key}</dt>
              <dd>{value}</dd>
            </Fragment>
          ))}
        </dl>
      </section>

      <section aria-label="Developer skills">
        <h3>Technical Skills</h3>

        <ul className={styles.skills}>
          {skills.map((skill) => (
            <li key={skill.id}>
              <SkillBadge
                name={skill.name}
                tier={skill.tier}
              />
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
