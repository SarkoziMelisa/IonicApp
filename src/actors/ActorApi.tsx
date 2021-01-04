import axios from 'axios';
import { authConfig, baseUrl, getLogger, withLogs } from '../core';
import { ActorProps } from './ActorProps';

const log = getLogger('ActorApi');

const actorUrl = `http://${baseUrl}/api/actor`;


export const getActors: (token: string, query: string) => Promise<ActorProps[]> = (token, query) => {
    return withLogs(axios.get(`${actorUrl}${query}`, authConfig(token)), 'getActors');
};

export const createActor: (token: string, actor: ActorProps) => Promise<ActorProps[]> = (token, actor) => {
    return withLogs(axios.post(actorUrl, actor, authConfig(token)), 'createActor');
};

export const updateActor: (token: string, actor: ActorProps) => Promise<ActorProps[]> = (token, actor) => {
    return withLogs(axios.put(`${actorUrl}/${actor._id}`, actor, authConfig(token, actor.version)), 'updateActor');
};

export const apiDeleteActor: (token: string, actor: ActorProps) => Promise<ActorProps[]> = (token, actor) => {
    return withLogs(axios.delete(`${actorUrl}/${actor._id}`, authConfig(token)), 'apiDeleteActor');
};

interface MessageData {
    type: string;
    payload: ActorProps;
}

export const newWebSocket = (token: string, onMessage: (data: MessageData) => void) => {
    const ws = new WebSocket(`ws://${baseUrl}`);
    ws.onopen = () => {
        log('web socket onopen');
        ws.send(JSON.stringify({ type: 'authorization', payload: { token } }));
    };
    ws.onclose = () => {
        log('web socket onclose');
    };
    ws.onerror = error => {
        log('web socket onerror', error);
    };
    ws.onmessage = messageEvent => {
        log('web socket onmessage');
        onMessage(JSON.parse(messageEvent.data));
    };
    return () => {
        ws.close();
    }
};
