import React from 'react';
import { IonItem, IonLabel } from '@ionic/react';
import { ActorProps } from './ActorProps';

interface ActorPropsExt extends ActorProps {
    onEdit: (_id?: string) => void;
}

const Actor: React.FC<ActorPropsExt> = ({ _id, name, wikipediaLink, matchingPercentage, onEdit }) => {
    return (
        <IonItem onClick={() => onEdit(_id)}>
            <IonLabel>{ name }</IonLabel>
            <a href={wikipediaLink}>Wikipedia link</a>
            <IonLabel/>
            <IonLabel>{ matchingPercentage }</IonLabel>
        </IonItem>

    );
};

export default Actor;
