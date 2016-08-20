'use strict';

import templates from './LiferayFeriasAuth.soy';
import Component from 'metal-component';
import DOM from 'metal-dom';
import Soy from 'metal-soy';

class LiferayFeriasAuth extends Component {
    created() {
        this.auth = WeDeploy.auth('http://auth.liferayferias.wedeploy.me');
        this.auth.onSignInCallback = this._afterSingIn.bind(this);
        
        this.user = this.auth.currentUser;

        this.provider = new this.auth.provider.Google();
        this.provider.setProviderScope("email");
        // this.auth.onSignIn(this._afterSingIn);
    }

    rendered() {
        DOM.delegate(this.element, 'click', '#authButton', this._afterAuthSingInButtonClick.bind(this));
        DOM.delegate(this.element, 'click', '#logOutButton', this._afterAuthLogOutButtonClick.bind(this));
    }

    _afterAuthSingInButtonClick() {
        this.auth.signInWithRedirect(this.provider);
    }

    _afterSingIn(user) {
        this.user = user;
    }

    _afterAuthLogOutButtonClick() {
        WeDeploy
            .auth()
            .signOut()
            .then(function() {
                console.log('user singed out!');
                window.location.reload();
            })
            .catch(function(err) {  
                console.log('User was signed out.');
            });
    }
 }

 LiferayFeriasAuth.STATE = {
    user: {
        value: null
    }
 }

Soy.register(LiferayFeriasAuth, templates);

export default LiferayFeriasAuth;
