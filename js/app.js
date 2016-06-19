$(function(){

	var User = function (name, gender, email) {
		this.name = name;
		this.gender = gender;
		this.email = email;
	}

	var Crud = function() {

	}, crud;

	Crud.prototype.renderList = function () {
		var template = Handlebars.compile(document.getElementById('users-template').innerHTML);
		var new_user = this.createUser;
		var render = function(data) {
			var user_list = {
				users:data
			};

			var content = document.getElementById('content');
			content.innerHTML = template(user_list);

			document.getElementById("create").addEventListener('click',
			function () {
    		new_user();
			});
		}

		var error = function(data) {
        console.dir(data);
    };

		this.makeAjaxRequest("GET", render, error)
	};

	Crud.prototype.makeAjaxRequest = function(method, render, error, params) {
        $.ajax({
            url: "http://localhost:8181/api/users" + (params? ("/" + params): ""),
            method: method,
            success: function(data) {
                render(data);
            },
            error: function(data) {
                error(data);
            }
        });
    }

	Crud.prototype.createUser = function () {
		var user = new User("Maria 00000000000", 20 , "F", "maria@gmail.com")

		saveUser(user);
		};

	var saveUser = function(data) {
		$.ajax({
			url:"http://localhost:8181/api/users",
			method: "POST",
			data:data,
			success: function() {
				alert("Usuário cadastrado com sucesso");
				console.log(data);
			},
			error: function () {
				alert("Erro ao cadastrar usuário")
			}

		});
	}

	Crud.prototype.init = function () {
		this.renderList();
	};

	crud = new Crud();
	crud.init();

});
