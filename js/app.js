$(function(){

	var User = function (name, gender, email) {
		this.name = name;
		this.gender = gender;
		this.email = email;
	}
	var User2 = function (id, name, gender, email) {
		this.id = id;
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
		var update_user = this.updateUser;
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

			$(".update").click(function(event){
				var caller_id = event.target.id;
				update_user(getId(caller_id));
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
            url: "http://web-mobile.herokuapp.com/api/users/" + (params? ("/" + params): ""),
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
		var name = document.getElementById("userName").value;
		var gender = document.getElementById("userGender").value;
		var email = document.getElementById("userEmail").value;
		var user = new User(name, gender, email);
		saveUser(user);
	};

	var saveUser = function(data) {
			$.ajax({
				url:"http://web-mobile.herokuapp.com/api/users/",
				method: "POST",
				data:data,
				success: function() {
					alert("Usuário cadastrado com sucesso");
					console.log(data);
					location.reload();
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
			url:"http://web-mobile.herokuapp.com/api/users/" + id,
			method: "DELETE",
			success: function() {
				alert("Usuário removido com sucesso");
				location.reload();
			},
			error: function () {
				alert("Erro ao remover usuário")
			}
		});
	}

	Crud.prototype.updateUser = function (user_id) {
		var user2 = new User2(user_id, prompt("Name"),prompt("Gender"),prompt("Email"))
		update(user2);
	};

	var update = function (data) {
		$.ajax({
			url:"http://web-mobile.herokuapp.com/api/users/",
			method: "PUT",
			data:data,
			success: function() {
				alert("Usuário atualizado com sucesso");
				location.reload();
			},
			error: function () {
				alert("Erro ao atualizar usuário")
			}
		});
	}

	Crud.prototype.init = function () {
		this.renderList();
	};

	crud = new Crud();
	crud.init();

});
