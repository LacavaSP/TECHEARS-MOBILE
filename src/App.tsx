import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { gift, home, business, card, person } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Filiais from './pages/filiais/Filiais';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Acesso from './pages/login/Acesso';
import React from 'react'; 
import { useLocation } from 'react-router-dom';
import Perfil from './pages/perfil/Perfil';
import FiliaisForm from './pages/filiaisForm/FiliaisForm';
import './Global.css'
import FiliaisEdit from './pages/filiaisEdit/FiliaisEdit';


setupIonicReact();


const App: React.FC = () => {
 

  React.useEffect(() => {
    
  }, [])


  return (
    <> 
       
      <IonApp>
        <IonReactRouter>
            
            <IonTabs>
              
              <IonRouterOutlet>
                <Route exact path="/filiais">
                  <Filiais />
                </Route>
                <Route exact path="/acesso">
                  <Acesso />
                </Route>
                <Route exact path="/home">
                  <Tab1 />
                </Route>
                <Route exact path="/filial-form">
                  <FiliaisForm />
                </Route>
                <Route exact path="/filial-edit/:id">
                  <FiliaisEdit />
                </Route>
                <Route path="/tab3">
                  <Tab3 />
                </Route>
                <Route path="/config">
                  <Perfil />
                </Route>
                <Route exact path="/">
                  <Redirect to="/acesso" />
                </Route>
              </IonRouterOutlet>

              <IonTabBar   slot="bottom">

              <IonTabButton tab="inicio" href="/home">
                  <IonIcon aria-hidden="true" icon={home} />
                  <IonLabel>Início </IonLabel>
                </IonTabButton>
                
                <IonTabButton tab="filiais" href="/filiais">
                  <IonIcon aria-hidden="true" icon={business} />
                  <IonLabel>Filiais </IonLabel>
                </IonTabButton>

                <IonTabButton tab="tab2" href="/tab2">
                  <IonIcon aria-hidden="true" icon={card} />
                  <IonLabel>Compras</IonLabel>
                </IonTabButton>

                <IonTabButton tab="tab3" href="/tab3">
                  <IonIcon aria-hidden="true" icon={gift} />
                  <IonLabel>Produtos</IonLabel>
                </IonTabButton>

                <IonTabButton tab="perfil" href="/config">
                  <IonIcon aria-hidden="true" icon={person} />
                  <IonLabel>Perfil</IonLabel>
                </IonTabButton>

              </IonTabBar>
            </IonTabs>
        </IonReactRouter>
      </IonApp>
    </>
  )
}

export default App;
