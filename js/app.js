$(function(){
	var data = {
    users: [
            {
              "_id": "5747c24c5d0bbba60619ed56",
              "gender": "Male",
              "email": "zevinagre@gmail.com",
              "name": "Zé Mauro"
            },
            {
              "_id": "574c7cc21201c90300b7252f",
              "gender": "Female",
              "email": "mariab@bethania.com",
              "name": "Maria Bethânia"
            },
            {
              "_id": "5754a95ef42fc50300b8f408",
              "gender": "Male",
              "email": "marcelom@gmail.com",
              "name": "Marcelo Martelo"
            },
            {
              "_id": "5754d72af42fc50300b8f409",
              "gender": "Female",
              "email": "janaina@gmail.com",
              "name": "Janaina Jana"
            },
            {
              "_id": "575604f634501d2c0b245572",
              "gender": "Male",
              "email": "drmilton@gmail.com",
              "name": "Milton Nascimento"
            }
          ]
        };

	var Crud = function() {

	}, crud;

	Crud.prototype.renderList = function () {
		var template = Handlebars.compile(document.getElementById('users-template').innerHTML);
		var content = document.getElementById('content');
		content.innerHTML = template(data);
	};

	Crud.prototype.init = function () {
		this.renderList();
	};

	crud = new Crud();
	crud.init();

});
