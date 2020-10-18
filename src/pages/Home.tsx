import {
    IonLabel,
    IonBadge,
    IonNote,
    IonItem,
    IonCheckbox,
    IonList,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonFab,
    IonFabButton,
    IonIcon
} from '@ionic/react';
import React from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { add } from 'ionicons/icons';
import {RouteComponentProps} from "react-router";

const Home: React.FC<RouteComponentProps> = (props) => {
  return (
      <IonPage>
          <IonHeader>
              <IonToolbar>
                  <IonTitle>Lab1 - getting started</IonTitle>
              </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
              <p>Define the features of your apps (write them in README)</p>
              <p>Setup the Ionic app</p>
              <p>Setup the Android/iOS app</p>
              <p>Create two repositories for Ionic & Android/iOS apps</p>
              <p>
                  AM site -> {' '}
                  <a
                      target="_blank"
                      rel="noopener"
                      href="http://www.cs.ubbcluj.ro/~ilazar/am/"
                  >
                      link
                  </a>{' '}
                  .
              </p>
              <IonList>
                  <IonItem>
                      <IonCheckbox slot="start" />
                      <IonLabel>
                          <h1>Ionic app</h1>
                          <IonNote>create a project and a git repository</IonNote>
                      </IonLabel>
                      <IonBadge color="success" slot="end">
                          Week 4
                      </IonBadge>
                  </IonItem>
                  <IonItem>
                      <IonCheckbox slot="start" />
                      <IonLabel>
                          <h1>Android app</h1>
                          <IonNote>create a oroject and a git repository</IonNote>
                      </IonLabel>
                      <IonBadge color="success" slot="end">
                          Week 4
                      </IonBadge>
                  </IonItem>
              </IonList>

              <IonFab vertical="bottom" horizontal="end" slot="fixed">
                  <IonFabButton onClick={() => props.history.push('/new')}>
                      <IonIcon icon={add} />
                  </IonFabButton>
              </IonFab>

          </IonContent>
      </IonPage>
  );
};

export default Home;
