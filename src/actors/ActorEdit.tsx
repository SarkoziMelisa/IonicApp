import React, {EffectCallback, useContext, useEffect, useState} from 'react';
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput, IonItem, IonLabel,
    IonLoading,
    IonTitle,
    IonPage, IonTextarea,
    IonToolbar
} from '@ionic/react';
import { getLogger } from '../core';
import { ActorContext } from './ActorProvider';
import { RouteComponentProps } from 'react-router';
import { ActorProps } from './ActorProps';
import {useNetwork} from "../core/useNetwork";

const log = getLogger('ActorEdit');

interface ActorEditProps extends RouteComponentProps<{
    id?: string;
}> {}

const ActorEdit: React.FC<ActorEditProps> = ({ history, match }) => {
    const { actors, saving, savingError, saveActor, deleting, deletingError, deleteActor, usingLocal } = useContext(ActorContext);
    const [ name , setName] = useState('');
    const [wikipediaLink, setWikipediaLink] = useState('');
    const [ matchingPercentage , setMatchingPercentage] = useState(0);
    const [actor, setActor] = useState<ActorProps>();

    const [goBack, setGoBack] = useState(false);

    const { networkStatus }  = useNetwork();

    useEffect(() => {
        log('useEffect');
        const routeId = match.params.id || '';
        const actor = actors?.find(it => it._id === routeId);
        setActor(actor);
        if (actor) {
            setName(actor.name);
            setWikipediaLink(actor.wikipediaLink);
            setMatchingPercentage(actor.matchingPercentage);
        }
    }, [match.params.id, actors]);

    useEffect(() => {
        log('useEffect using local');
        if(goBack && usingLocal)
            alert("Using local storage");
    }, [ goBack, usingLocal ]);

    useEffect(() => {
        log('useEffect errors');
        if(goBack && savingError == null && deletingError == null)
            history.goBack();
    }, [ goBack, savingError, deletingError]);

    const handleSave = () => {
        setGoBack(false);
        const editedActor = actor ? { ...actor,  name , wikipediaLink,  matchingPercentage } : {  name , wikipediaLink,  matchingPercentage };
        saveActor && saveActor(editedActor).then(() => { setGoBack(true)});
    };
    const handleDelete = () => {
        setGoBack(false);
        const editedActor = actor ? { ...actor,  name , wikipediaLink,  matchingPercentage } : {  name : '', wikipediaLink : '',  matchingPercentage : 0};
        deleteActor && deleteActor(editedActor).then(() => { setGoBack(true) });
    };
    log('render');
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    {
                        <div slot="start" className={`circle ${networkStatus.connected ? "connected" : "disconnected"}`}/>
                    }
                    <IonTitle> Edit actor </IonTitle>
                    <IonButtons slot="end">
                        {
                            (actor && actor._id) ?
                                <>
                                    <IonButton onClick={handleSave}>
                                        Save changes
                                    </IonButton>
                                    <IonButton onClick={handleDelete}>
                                        Delete
                                    </IonButton>
                                </>
                                :
                                <IonButton onClick={handleSave}>
                                    Save
                                </IonButton>
                        }
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonItem>
                    <IonLabel position="stacked">Name</IonLabel>
                    <IonInput value={ name } onIonChange={e => setName(e.detail.value || '')} />
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">WikipediaLink</IonLabel>
                    <IonTextarea rows={ 3 } value={ wikipediaLink } onIonChange={e => setWikipediaLink(e.detail.value || '')} />
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Matching Percentage</IonLabel>
                    <IonInput value={ matchingPercentage } onIonChange={e => setMatchingPercentage(Number(e.detail.value) || 0)} />
                </IonItem>
                <IonLoading isOpen={saving} />
                {savingError && (
                    <div>{savingError.message || 'Failed to save actor'}</div>
                )}
                <IonLoading isOpen={deleting} />
                {deletingError && (
                    <div>{deletingError.message || 'Failed to delete actor'}</div>
                )}
            </IonContent>
        </IonPage>
    );
};

export default ActorEdit;
