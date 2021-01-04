import React, {useContext, useState} from 'react';
import { RouteComponentProps} from 'react-router';
import {
    IonButton, IonButtons,
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon, IonInfiniteScroll, IonInfiniteScrollContent,
    IonList, IonLoading,
    IonPage, IonSearchbar,
    IonTitle,
    IonToolbar, useIonViewDidEnter
} from '@ionic/react';
import {add} from 'ionicons/icons';
import Actor from './Actor';
import { getLogger, Storage } from '../core';
import { ActorContext } from './ActorProvider';
import {useNetwork} from "../core/useNetwork";

const log = getLogger('ActorList');

const ActorList: React.FC<RouteComponentProps> = ({ history }) => {
    const { actors, fetching, fetchingError, filterActor, filterString, pageActor, crtPage} = useContext(ActorContext);
    const [disableInfiniteScroll, setDisableInfiniteScroll] = useState<boolean>(false);

    const { networkStatus }  = useNetwork();

    log('render');

    useIonViewDidEnter( async () => {

    });

    async function searchNext($event: CustomEvent<void>) {
        log("search next");
        if (pageActor) {
            await pageActor(crtPage + 1)
        }
        ($event.target as HTMLIonInfiniteScrollElement).complete();
    }

    const handleLogout = () => {
        Storage.clear();
        window.location.reload();
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    {
                        <div slot="start" className={`circle ${networkStatus.connected ? "connected" : "disconnected"}`} />
                    }
                    <IonTitle>Actors List</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={handleLogout}>Logout</IonButton>
                    </IonButtons>

                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonSearchbar
                    value={filterString}
                    debounce={100}
                    disabled={!networkStatus.connected}
                    onIonChange={e => filterActor && filterActor(e.detail.value!) && setDisableInfiniteScroll(false)}>
                </IonSearchbar>
                <IonLoading isOpen={fetching} message="Fetching actors" />
                {actors && (
                    <IonList>
                        {actors.map(({ _id, name, wikipediaLink, matchingPercentage}) =>
                            <Actor key={_id} _id={_id} name={name} wikipediaLink={wikipediaLink} matchingPercentage={matchingPercentage} onEdit={id => history.push(`/actor/${id}`)} />)}
                    </IonList>
                )}
                <IonInfiniteScroll threshold="100px" disabled={disableInfiniteScroll}
                                   onIonInfinite={(e: CustomEvent<void>) => searchNext(e)}>
                    <IonInfiniteScrollContent
                        loadingText="Loading...">
                    </IonInfiniteScrollContent>
                </IonInfiniteScroll>
                {fetchingError && (
                    <div>{fetchingError.message || 'Failed to fetch actors'}</div>
                )}
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={() => history.push('/actor')}>
                        <IonIcon icon={add} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default ActorList;
