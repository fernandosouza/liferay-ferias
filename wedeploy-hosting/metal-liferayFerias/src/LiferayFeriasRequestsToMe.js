'use strict';

import templates from './LiferayFeriasRequestsToMe.soy';
import Component from 'metal-component';
import DOM from 'metal-dom';
import Soy from 'metal-soy';

class LiferayFeriasRequestsToMe extends Component {
    created() {
        this.list();
    }

    attached() {
        DOM.delegate(this.element, 'click', '.card-content', this._showRequest.bind(this));     
        DOM.delegate(this.element, 'click', '#aproveRequest', this._aproveRequest.bind(this));
        DOM.delegate(this.element, 'click', '#rejectRequest', this._rejectRequest.bind(this));
    }

    list() {
        var instance = this;

        WeDeploy
            .url('http://liferayferiasdata.liferayferias.wedeploy.me/requests/')
            .filter('managerId', '=', 54321)
            .get()
            .then(function(weresponse) {
                instance.requests = weresponse.body_;
            });
    }

    _showRequest(event) {
        this.requestFeedBack = this.requests[event.delegateTarget.dataset.index];
    }

    _aproveRequest() {
        this._sendEmail(
            'You have been... APPROVED',
            'Yeah you are approved.',
            'manager_approved',
            this.requestFeedBack);
    }

    _rejectRequest() {
        var justification = this.element.querySelector('textarea').value;

        this._sendEmail(
            'You have been... REJECTED',
            'Yeah you are REJECTED. jUSTIFICATION: ' + justification,
            'manager_rejected',
            this.requestFeedBack);
    }

    _sendEmail(subject, message, status, request) {
        var instance = this;

        WeDeploy
            .url('http://liferayferiasdata.liferayferias.wedeploy.me/requests/' + request.id)
            .patch({
                status: status
            });

        WeDeploy.url('http://mamail.liferayferias.wedeploy.me/emails')
            .form('from', 'trololol@liferay.com')
            .form('to', 'fernando.souza@liferay.com')
            .form('subject', subject)
            .form('message', message)
            .post()
            .then(function(r){
                instance.list();
            })
            .catch(function(a){
                console.log('AAAAAAA', a);
            });
    }
}

LiferayFeriasRequestsToMe.STATE = {
    requests: {
        value: []
    },

    requestFeedBack: {
        value: null
    }
};

Soy.register(LiferayFeriasRequestsToMe, templates);

export default LiferayFeriasRequestsToMe;
