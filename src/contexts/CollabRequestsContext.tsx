import React, { createContext, useContext, useState, ReactNode } from 'react';

interface IncomingRequest {
  id: number;
  fromUsername: string;
  profilePic: string;
  message: string;
}

interface SentRequest {
  id: number;
  toUsername: string;
  profilePic: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
}

interface CollabRequestsContextType {
  incomingRequests: IncomingRequest[];
  sentRequests: SentRequest[];
  setIncomingRequests: React.Dispatch<React.SetStateAction<IncomingRequest[]>>;
  setSentRequests: React.Dispatch<React.SetStateAction<SentRequest[]>>;
  acceptRequest: (id: number) => void;
  denyRequest: (id: number) => void;
}

const initialIncomingRequests: IncomingRequest[] = [
  {
    id: 1,
    fromUsername: 'explorer_ella',
    profilePic: 'https://randomuser.me/api/portraits/women/19.jpg',
    message: 'Saw your Tokyo trip — want to explore with me?'
  }
];

const initialSentRequests: SentRequest[] = [
  {
    id: 2,
    toUsername: 'adventure_bob',
    profilePic: 'https://randomuser.me/api/portraits/men/30.jpg',
    status: 'Pending'
  }
];

export const CollabRequestsContext = createContext<CollabRequestsContextType | undefined>(undefined);

export const CollabRequestsProvider = ({ children }: { children: ReactNode }) => {
  const [incomingRequests, setIncomingRequests] = useState<IncomingRequest[]>(initialIncomingRequests);
  const [sentRequests, setSentRequests] = useState<SentRequest[]>(initialSentRequests);

  const acceptRequest = (id: number) => {
    // Remove from incoming requests
    const acceptedRequest = incomingRequests.find(req => req.id === id);
    if (acceptedRequest) {
      setIncomingRequests(prev => prev.filter(req => req.id !== id));
      
      // Add to sent requests with "Accepted" status
      const newSentRequest: SentRequest = {
        id: Date.now(),
        toUsername: acceptedRequest.fromUsername,
        profilePic: acceptedRequest.profilePic,
        status: 'Accepted'
      };
      setSentRequests(prev => [...prev, newSentRequest]);
    }
  };

  const denyRequest = (id: number) => {
    // Simply remove from incoming requests
    setIncomingRequests(prev => prev.filter(req => req.id !== id));
  };

  const value: CollabRequestsContextType = {
    incomingRequests,
    sentRequests,
    setIncomingRequests,
    setSentRequests,
    acceptRequest,
    denyRequest
  };

  return (
    <CollabRequestsContext.Provider value={value}>
      {children}
    </CollabRequestsContext.Provider>
  );
};

// Custom hook for using the context
export const useCollabRequests = () => {
  const context = useContext(CollabRequestsContext);
  if (context === undefined) {
    throw new Error('useCollabRequests must be used within a CollabRequestsProvider');
  }
  return context;
};

// Example usage in child component:
/*
import { useCollabRequests } from './contexts/CollabRequestsContext';

function CollabRequests() {
  const { incomingRequests, sentRequests, acceptRequest, denyRequest } = useCollabRequests();
  
  return (
    <div>
      {incomingRequests.map(request => (
        <div key={request.id}>
          <button onClick={() => acceptRequest(request.id)}>Accept</button>
          <button onClick={() => denyRequest(request.id)}>Deny</button>
        </div>
      ))}
    </div>
  );
}
*/