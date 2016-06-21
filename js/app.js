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
		var remove_user = this.removeUser;
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

			$(".remove").click(function(event){
				var caller_id = event.target.id;
				remove_user(getId(caller_id));
			});
		};

		var getId = function (element_id) {
			return document.getElementById(element_id).parentNode.parentNode.getAttribute('id');
		};

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
		var user = new User("Angélica ", "F", "test@gmail.com")
		saveUser(user);
	};

	var saveUser = function(data) {
			$.ajax({
				url:"http://localhost:8181/api/users/",
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
	};

	Crud.prototype.removeUser = function (user_id) {
		remove(user_id);
	};

	var remove = function (id) {

		$.ajax({
			url:"http://localhost:8181/api/users/" + "57671ef94430e45116a43b50" ,
			headers: {'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
			 'Access-Control-Allow-Origin': '*',
			 'Access-Control-Allow-Headers': 'origin, x-requested-with, content-type'
			},
			method: "DELETE",
			success: function() {
				alert("Usuário removido com sucesso");
			},
			error: function () {
				alert("Erro ao remover usuário")
			}
		});
	}

	Crud.prototype.init = function () {
		this.renderList();
	};

	crud = new Crud();
	crud.init();

});
