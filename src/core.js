import Graph from "graph-board";
import openContextMenu from "./context";
import toast from "./toast";

export default function core(onchange) {
	const g = new Graph({
		directed: false,
		showDistance: false,
		showGrid: true,
		character: true,
		motion: true,
	});

	let searchType = 0;
	let searchStep = 0;
	let searchData = [];
	let showConnected = false;

	g.appendTo("#canvas");

	const edgesComponent = document.getElementById("edges");
	const firstSearch = document.getElementById("firstSearch");

	function updateData() {
		updateEdges();
		updateTable();
		updateSearchNodes();
	}

	function updateEdges() {
		edgesComponent.innerHTML = "";
		g.edges.forEach((e) => {
			const Edge = document.createElement("div");
			Edge.addEventListener("click", () => {
				g.removeEdge(e);
				Edge.remove();
			});
			Edge.innerHTML = `<li class="edge list-group-item">
                <span>
                    ${g.character ? g.alphabet[e.from] : e.from}
                </span> 
                <div>
                    <i class="fas fa-long-arrow-alt-right"></i>
                </div>
                <span>
                    ${g.character ? g.alphabet[e.to] : e.to}
                </span>
            </li>`;
			edgesComponent.append(Edge);
		});
	}

	function updateTable() {
		const table = document.getElementById("matrix");
		const thead = table.querySelector("thead");
		const th = document.createElement("tr");
		const matrix = g.exportMatrix();

		matrix.forEach(
			(e, i) =>
				(th.innerHTML += `<td>${
					i ? g.getNodes()[i - 1]?.label : "X"
				}</td>`)
		);
		thead.innerHTML = "";
		if (g.nodes.length === 0) return;
		thead.append(th);

		const tbody = table.querySelector("tbody");
		tbody.innerHTML = "";
		for (let i = 1; i < matrix.length; i++) {
			const tr = document.createElement("tr");
			for (let j = 0; j < matrix.length; j++)
				if (j === 0)
					tr.innerHTML += `<td>${g.getNodes()[i - 1].label}</td>`;
				else
					tr.innerHTML += `<td class="${
						matrix[i][j] && "table-primary"
					}">${matrix[i][j]}</td>`;

			tbody.append(tr);
		}
	}

	function updateSearchNodes() {
		const searchNodes = firstSearch.querySelector("#searchNodes");
		if (
			searchNodes.querySelectorAll("button").length ===
				g.getNodes().length &&
			g.motionSteps.step === searchStep
		)
			return;

		searchNodes.innerHTML = ``;

		g.getNodes().forEach((node, index) => {
			const button = document.createElement("button");
			button.className = "btn btn-outline-primary";
			button.innerText = node.label;
			searchNodes.appendChild(button);

			button.onclick = () => {
				searchStep = 0;
				switch (searchType) {
					case 0:
						updateSearchResult(g.deepFirstSearch(index + 1));
						break;
					case 1:
						updateSearchResult(g.breadthFirstSearch(index + 1));
						break;
				}
			};
		});

		updateSearchButtons();
	}

	function updateSearchButtons() {
		const searchPrev = firstSearch.querySelector("#searchPrev");
		const searchNext = firstSearch.querySelector("#searchNext");

		searchPrev.onclick = () => {
			if (!searchStep) return;
			searchStep = g.prevStep();
			updateSearchResult({ steps: searchData });
		};
		searchNext.onclick = () => {
			if (searchStep === searchData.length - 1) return;
			searchStep = g.nextStep();
			updateSearchResult({ steps: searchData });
		};
	}

	function updateSearchResult(data) {
		searchData = data.steps;
		const deleteResult = firstSearch.querySelector("#deleteResult");
		const result = firstSearch.querySelector("#edges");
		result.innerHTML = ``;

		const graph = new Graph({
			...g,
			directed: true,
			showGrid: false,
		});
		graph.appendTo("#searchCanvas");
		g.nodes.forEach((node) => graph.addNode(node.label, node.x, node.y));

		data.steps.forEach((e, index) => {
			graph.addEdge(e.from, e.to);
			result.innerHTML += `<li class="edge list-group-item ${
				searchStep === index ? "active" : ""
			}">
            <span>
                ${g.getNodes()[e.from - 1].label}
            </span> 
            <div>
                <i class="fas fa-long-arrow-alt-right"></i>
            </div>
            <span>
                ${g.getNodes()[e.to - 1].label}
            </span>
        </li>`;
		});

		deleteResult.onclick = () => {
			result.innerHTML = "";
			g.motionSteps.steps = [];
		};
	}

	document.getElementById("connectedOn").onclick = () => {
		showConnected = true;
		updateConnected();
	};

	document.getElementById("connectedOff").onclick = () => {
		showConnected = false;
		updateConnected();
	};

	function updateConnected() {
		try {
			if (showConnected) return g.tarjanStart();
			g.tarjanStop();
		} catch {
			toast({
				message: "Chưa vẽ đồ thị rồi lấy gì mà tìm : )",
			});
		}
	}

	document.getElementById("removeNodeButton").onclick = () =>
		g.removeNode(g.nodes.length);

	const optionTab = document.getElementById("optionTab");
	const tabButtons = optionTab.querySelectorAll(".nav-item");
	const firstSearchButtons = firstSearch.querySelectorAll(".nav-item");

	firstSearchButtons.forEach((ele, index) => [
		(ele.onclick = () => {
			firstSearchButtons.forEach((e) =>
				e.querySelector("a").classList.remove("active")
			);
			firstSearchButtons[index]
				.querySelector("a")
				.classList.add("active");
			searchType = index;
		}),
	]);

	tabButtons.forEach((e, i) => {
		e.onclick = () => {
			tabButtons.forEach((e) =>
				e.querySelector("a").classList.remove("active")
			);
			e.querySelector("a").classList.add("active");

			const optionTabs = document.querySelectorAll(".options-tab");
			optionTabs.forEach(
				(optionTab) => (optionTab.style.display = "none")
			);

			optionTabs[i].style.display = "block";
		};
	});

	window.addEventListener("mousedown", (event) => {
		const optionsOverlay = document.getElementById("optionsOverlay");
		if (!optionsOverlay) return;

		const dx = event.clientX - optionsOverlay.offsetLeft;
		const dy = event.clientY - optionsOverlay.offsetTop;

		if (
			dx <= optionsOverlay.offsetWidth &&
			dx >= -optionsOverlay.offsetWidth
		)
			if (
				dy <= optionsOverlay.offsetHeight &&
				dy >= -optionsOverlay.offsetHeight
			)
				return;

		optionsOverlay.remove();

		if (event.buttons === 2) addContextMenu(event);
	});

	window.addEventListener("mousemove", (event) => {
		if (!event.buttons) return;
		const optionsOverlay = document.getElementById("optionsOverlay");
		if (!optionsOverlay) return;

		const dx = event.clientX - optionsOverlay.offsetLeft;
		const dy = event.clientY - optionsOverlay.offsetTop;

		if (dx <= optionsOverlay.offsetWidth && dx >= -100)
			if (dy <= optionsOverlay.offsetHeight && dy >= -100) {
				optionsOverlay.style.left = event.clientX + "px";
				optionsOverlay.style.top = event.clientY + "px";
			}
	});

	function addContextMenu(event) {
		event.preventDefault();
		openContextMenu(event.clientX, event.clientY);
	}

	window.addEventListener("contextmenu", addContextMenu);

	document.getElementById("directedToggle").onclick = () => {
		g.setDirected(!g.directed);
	};

	document.getElementById("showDistanceToggle").onclick = () => {
		g.setShowDistance(!g.showDistance);
	};

	document.getElementById("showGridToggle").onclick = () => {
		g.setShowGrid(!g.showGrid);
	};

	document.getElementById("characterToggle").onclick = () => {
		g.setCharacter(!g.character);
	};

	document.getElementById("animationToggle").onclick = () => {
		g.setMotion(!g.motion);
	};

	return { graph: g, onchange: updateData };
}
