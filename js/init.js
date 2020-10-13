window.clientes = [];

window.cargarClientes = () => {
	const clientesDiv = document.querySelector("#clientes-lista");
	clientesDiv.innerHTML = "";
	for (let i = 0; i < window.clientes.length; ++i) {
		let cliente = window.clientes[i];
		let columna = document.createElement("div");
		columna.classList.add("col-sm-12", "col-md-4", "mb-2");
		
		let total = 0;
		if (cliente.plan === "1") {
			total = 14000;
		}
		else if (cliente.plan === "2") {
			total = 17000;
		}
		else if (cliente.plan === "3") {
			total = 20000;
		}
		
		let card = document.createElement("div");
		card.classList.add("card");
		let cardHeader = document.createElement("div");
		cardHeader.classList.add("card-header");
		cardHeader.innerHTML = cliente.nombre;
		let cardBody = document.createElement("div");
		cardBody.classList.add("card-body");
		let spanPlan = document.createElement("span");
		spanPlan.classList.add("d-block");
		spanPlan.innerHTML = "Total a pagar: $" + total;
		let spanMedio = document.createElement("span");
		spanMedio.classList.add("d-block");
		let imgMedio = document.createElement("img");
		if (cliente.medio === "1") {
			imgMedio.src = "img/efectivo.png";
		} else {
			imgMedio.src = "img/tarjeta.png";
		}
		spanMedio.innerHTML = "Medio de pago: ";
		spanMedio.appendChild(imgMedio);
		let spanEstado = document.createElement("span");
		spanEstado.classList.add("d-block");
		spanEstado.innerHTML = "Estado de pago: ";
		if (cliente.estado) {
			spanEstado.innerHTML += "Pagado";
		} else {
			spanEstado.classList.add("text-danger");
			spanEstado.innerHTML += "Adeudado";
		}
		cardBody.appendChild(spanPlan);
		cardBody.appendChild(spanMedio);
		cardBody.appendChild(spanEstado);
		card.appendChild(cardHeader);
		card.appendChild(cardBody);
		columna.appendChild(card);
		clientesDiv.appendChild(columna);
	}
}

window.mostrarErrores = (errores) => {
    let erroresDiv = document.querySelector("#errores-div");
    let ul = document.createElement("ul");
    ul.classList.add("alert", "alert-warning");
    errores.forEach(e => {
        let li = document.createElement("li");
        li.innerText = e;
        ul.appendChild(li);
    });
    erroresDiv.appendChild(ul);
};

let isPagado = false;

const agregar = document.querySelector("#agregar-btn");
agregar.addEventListener('click', () => {
    document.querySelector("#errores-div").innerHTML = "";
    let nombre = document.querySelector("#nombre-txt").value.trim();
    let plan = document.querySelector("#plan-select").value;
	let medio = document.querySelector("#medio-select").value;

    let errores = [];

    if (nombre === ''){
        errores.push("Debe ingresar un nombre");
    }
	if (plan === "0") {
		errores.push("Debe seleccionar un plan");
	}
	if (medio === "0") {
		errores.push("Debe seleccionar un medio de pago");
	}

    if (errores.length === 0) {
        let cliente = {};
        cliente.nombre = nombre;
        cliente.plan = plan;
		cliente.medio = medio;
		cliente.estado = isPagado;
		window.clientes.push(cliente);
		window.cargarClientes();
    } else {
        window.mostrarErrores(errores);
    }
});

const estadoSw = document.querySelector("#estado-sw");
estadoSw.addEventListener('click', () => {
	isPagado = !isPagado;
	let estadoLbl = document.querySelector("#estado-lbl");
	if (isPagado) {
		estadoLbl.innerHTML = "Pagado";
	}
	else {
		estadoLbl.innerHTML = "Adeudado";
	}
});