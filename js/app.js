$(function(){
	var Crud = function() {

	}, crud;

	Crud.prototype.renderList = function () {
		var template = Handlebars.compile(document.getElementById('users-template').innerHTML);

		var render = function(data) {
			var user_list = {
				users:data
			};

			var content = document.getElementById('content');
			content.innerHTML = template(user_list);
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

	Crud.prototype.init = function () {
		this.renderList();
	};

	crud = new Crud();
	crud.init();

});
