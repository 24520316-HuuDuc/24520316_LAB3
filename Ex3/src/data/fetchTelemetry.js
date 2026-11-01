import { PUBG_SQUADS } from './pubgSquads';

// Simulate fetching live PUBG telemetry data
export function fetchSquadTelemetry(squadId, { signal } = {}) {
  return new Promise((resolve, reject) => {
    const squad = PUBG_SQUADS.find(
      (item) => item.id === squadId
    );

    const handleAbort = () => {
      clearTimeout(timeoutId);

      reject(
        new DOMException('Request was cancelled', 'AbortError')
      );
    };

    if (signal?.aborted) {
      handleAbort();
      return;
    }

    const timeoutId = setTimeout(() => {
      signal?.removeEventListener('abort', handleAbort);

      if (!squad) {
        reject(new Error('Squad not found.'));
        return;
      }

      // Simulate 35% satellite packet loss on Erangel and Miramar
      const isUnstableMap = ['Erangel', 'Miramar'].includes(
        squad.map
      );

      if (isUnstableMap && Math.random() < 0.35) {
        reject(
          new Error(
            'Satellite signal lost. Unable to receive match telemetry.'
          )
        );
        return;
      }

      resolve({
        ...squad,
        updatedAt: new Date().toLocaleTimeString(),
      });
    }, 1500);

    signal?.addEventListener('abort', handleAbort, {
      once: true,
    });
  });
}