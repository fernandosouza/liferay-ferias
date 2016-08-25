'use strict';

import templates from './LiferayFeriasMyRequests.soy';
import Component from 'metal-component';
import Soy from 'metal-soy';

class LiferayFeriasMyRequests extends Component {
    attached() {
        var instance = this;

        instance.setupForm();
        instance.list();
    }

    setupForm() {
        var instance = this;
        var form = instance.element.querySelector('form');

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            instance.createNewOne();
        });
    }

    list() {
        var instance = this;

        WeDeploy
            .url('http://liferayferiasdata.liferayferias.wedeploy.me/requests/')
            .limit(100)
            .get()
            .then(function(weresponse) {
                var requests = weresponse.body_;

                console.log(requests);

                instance.requests = requests;
            });
    }

    getRowWithDatesAsDates(request) {
        var instance = this;

        return '<div class="row"><span class="start-date">'
                    + instance.getDateFromDateAsString(request.startDate)+
                    '</span> <span class="end-date">'+
                    instance.getDateFromDateAsString(request.endDate)+'</span> <span class="status">'
                    +request.status+'</span></div>';
    }

    getDateFromDateAsString(date) {
        return date.year + '-' + (date.month)+'-'+date.day;
    }

    getDateFromDate(date) {
        var date = date.split('-')
        return {
            year: parseInt(date[0]),
            month: parseInt(date[1]),
            day: parseInt(date[2])
        };
    }

    createNewOne() {
        var instance = this;

        var button = document.getElementsByClassName('create')[0];
        var startDate = document.getElementsByName('first_day')[0];
        var endDate = document.getElementsByName('last_day')[0];
        var select = document.getElementsByName('intention')[0];
        var managerId = parseInt(select.value);

        WeDeploy
            .url('http://liferayferiasdata.liferayferias.wedeploy.me/requests/')
            .post({
                userId: 12345,
                managerId: 54321,
                startDate: instance.getDateFromDate(startDate.value),//startDate.value,
                endDate: instance.getDateFromDate(endDate.value),//endDate.value,
                sellDays: false,
                intention: 2,
                status: "pending"
            })
            .then(function(res) {
                instance.list();
            });
    }
}

LiferayFeriasMyRequests.STATE = {
    requests: {
        value: []
    }
};

Soy.register(LiferayFeriasMyRequests, templates);

export default LiferayFeriasMyRequests;
