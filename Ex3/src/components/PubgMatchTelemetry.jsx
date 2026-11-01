import { useEffect, useState } from 'react';
import { PUBG_SQUADS } from '../data/pubgSquads';
import { fetchSquadTelemetry } from '../data/fetchTelemetry';

export function PubgMatchTelemetry() {
  const [squadId, setSquadId] = useState('ces');

  const [view, setView] = useState({
    status: 'IDLE',
    data: null,
    error: null,
  });

  const [retryTick, setRetryTick] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    // Enter LOADING state
    setView({
      status: 'LOADING',
      data: null,
      error: null,
    });

    fetchSquadTelemetry(squadId, {
      signal: controller.signal,
    })
      .then((data) => {
        setView({
          status: 'SUCCESS',
          data,
          error: null,
        });
      })
      .catch((err) => {
        // Ignore intentional request cancellation
        if (err.name === 'AbortError') {
          return;
        }

        setView({
          status: 'ERROR',
          data: null,
          error: err.message,
        });
      });

    // Abort previous request when squad changes
    return () => {
      controller.abort();
    };
  }, [squadId, retryTick]);

  function handleRetry() {
    setRetryTick((prev) => prev + 1);
  }

  return (
    <section className="telemetry">
      <header className="telemetry-header">
        <p className="eyebrow">KRAFTON x PUBG VIETNAM SERIES</p>

        <h1>Live Match Telemetry</h1>

        <p>
          Real-time performance tracking for professional PUBG squads.
        </p>
      </header>

      <section className="squad-selector">
        <h2>Select Your Squad</h2>

        <div className="squad-buttons">
          {PUBG_SQUADS.map((squad) => (
            <button
              key={squad.id}
              type="button"
              className={
                squadId === squad.id ? 'active' : ''
              }
              onClick={() => setSquadId(squad.id)}
            >
              {squad.name}
            </button>
          ))}
        </div>
      </section>

      <section className="telemetry-content">
        <p className="status-label">
          Current State: {view.status}
        </p>

        {view.status === 'IDLE' && (
          <p>Waiting for telemetry data...</p>
        )}

      {view.status === 'LOADING' && (
  <div className="skeleton-card" aria-label="Loading telemetry">
    <div className="skeleton skeleton-title"></div>
    <div className="skeleton skeleton-line"></div>
    <div className="skeleton skeleton-line"></div>
    <div className="skeleton skeleton-line"></div>
    <div className="skeleton skeleton-line"></div>
  </div>
)}

        {view.status === 'SUCCESS' && view.data && (
          <article className="squad-card">
            <h2>{view.data.name}</h2>

            <p>Map: {view.data.map}</p>
            <p>Phase: {view.data.phase}</p>
            <p>Alive Players: {view.data.alive}</p>
            <p>Kills: {view.data.kills}</p>
            <p>Win Probability: {view.data.wucdProb}</p>
            <p>Status: {view.data.status}</p>
            <p>Last Updated: {view.data.updatedAt}</p>
          </article>
        )}

      {view.status === 'ERROR' && (
  <section className="error-card" role="alert">
    <h2>Satellite Connection Lost</h2>
    <p>{view.error}</p>

    <button
      type="button"
      onClick={handleRetry}
      className="retry-button"
    >
      Reconnect Satellite (Retry)
    </button>
  </section>
)}
      </section>
    </section>
  );
}