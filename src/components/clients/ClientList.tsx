
'use client';

import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/lib/redux/hooks';
import {
  fetchClients,
  selectAllClients,
  selectSelectedClientId,
  selectSearchQuery,
  selectSportFilter,
  selectClient,
  fetchClientPulse,
} from '@/src/lib/redux/slices/clientsSlice';
import { ClientRow } from './ClientRow';
import { Search } from 'lucide-react';

export function ClientList() {
  const dispatch = useAppDispatch();
  const clients = useAppSelector(selectAllClients);
  const selectedClientId = useAppSelector(selectSelectedClientId);
  const searchQuery = useAppSelector(selectSearchQuery);
  const sportFilter = useAppSelector(selectSportFilter);
  const clientsStatus = useAppSelector((state) => state.clients.status);
  const clientsPulse = useAppSelector((state) => state.clients.clientsPulse);

  useEffect(() => {
    if (clientsStatus === 'idle') {
      dispatch(fetchClients());
    }
  }, [clientsStatus, dispatch]);

  useEffect(() => {
    clients.forEach(client => {
        if (!clientsPulse[client.id]) {
            dispatch(fetchClientPulse(client.id));
        }
    });
  }, [clients, clientsPulse, dispatch]);

  const filteredClients = useMemo(() => {
    return clients
      .filter((client) => {
        if (sportFilter === 'all' || sportFilter === client.sport) {
          return true;
        }
        return false;
      })
      .filter((client) => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return true;
        const nameMatch = client.name.toLowerCase().includes(query);
        const leagueMatch = client.league.toLowerCase().includes(query);
        return nameMatch || leagueMatch;
      });
  }, [clients, searchQuery, sportFilter]);

  if (clientsStatus === 'loading') {
    return <div>Loading...</div>;
  }
  
  if (clientsStatus === 'failed') {
      return <div>Error loading clients.</div>
  }

  return (
    <div className="flex flex-col h-full bg-white p-2 rounded-lg shadow">
        {/* The search input will go in the SubToolbar, this is just for filtering */}
      <div className="space-y-1 overflow-y-auto">
        {filteredClients.map((client) => (
          <ClientRow
            key={client.id}
            client={client}
            pulse={clientsPulse[client.id] ?? null}
            isSelected={client.id === selectedClientId}
            onClick={() => dispatch(selectClient(client.id))}
          />
        ))}
      </div>
    </div>
  );
}
