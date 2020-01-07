import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Pages from "./containers/Pages/Pages";
import PageEdit from "./containers/PageEdit/PageEdit";

const App = () => {
    return (
        <BrowserRouter>
          <Layout>
          <Switch>
            <Route path='/pages/admin' exact component={PageEdit}/>
            <Route path='/pages/:name' exact component={Pages}/>
            <Route render={()=> <h1 style={{marginTop: '10%','font-size': '100px', textAlign: 'center'}}>Not found</h1>}/>
          </Switch>
          </Layout>
        </BrowserRouter>
    );
};

export default App;