const manageSpinner = (isLoading) => {
  const loadingSection = document.getElementById("loading-section");
  const cardContainer = document.getElementById("card-container");
  if (isLoading) {
    loadingSection.classList?.remove("hidden");
    cardContainer.classList?.add("hidden");
  } else {
    loadingSection.classList?.add("hidden");
    cardContainer.classList?.remove("hidden");
  }
};

const loadeAllIssues = async () => {
  manageSpinner(true);
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  displayAllIssue(data.data);
  const All = document.getElementById("All");
  const open = document.getElementById("open");
  const closed = document.getElementById("closed");
  const buttons = document.querySelectorAll("#filter-btns button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("btn-primary"));
      button.classList.add("btn-primary");
    });
  });

  All.addEventListener("click", () => {
    displayAllIssue(data.data);
  });

  open.addEventListener("click", () => {
    const openIssues = data.data.filter((issue) => issue.status === "open");
    displayAllIssue(openIssues);
  });

  closed.addEventListener("click", () => {
    const closedIssues = data.data.filter((issue) => issue.status === "closed");
    displayAllIssue(closedIssues);
  });
};

loadeAllIssues();

function displayAllIssue(data) {
  const cardContainer = document.getElementById("card-container");
  const numberOfIssues = document.getElementById("Number-of-issues");
  numberOfIssues.innerText = `${data.length} Issues`;
  cardContainer.innerHTML = "";

  data.map((data) => {
    const {
      id,
      title,
      description,
      status,
      labels,
      priority,
      author,
      createdAt,
    } = data;

    cardContainer.innerHTML += `
            <div class="w-full space-y-3 shadow-2xl rounded-lg ${status === "open" ? "border-[#00A96E]" : "border-[#A855F7]"} border-t-4 cursor-pointer" onclick="loadSingleIssue(${id})">
              <!-- card top  -->
              <div class="p-6 space-y-3">
                <!-- issue title and description will be here -->
                <div class="flex justify-between">
                ${
                  status === "open"
                    ? `<img
                    src="./assets/Open-Status.png"
                    alt="Open Status"
                    class="w-7 h-7 object-cover"
                  />`
                    : `<img
                    src="./assets/Close.png"
                    alt="Closed Status"
                    class="w-7 h-7 object-cover"
                  />`
                }
                  <div
                    class="bg-[#FEECEC] px-6 py-1.5 rounded-full text-[#EF4444] text-[12px] font-medium"
                  >
                    ${priority.toUpperCase()}
                  </div>
                </div>
                <div class="space-y-2">
                  <h2 class="text-xl font-semibold mt-2">
                    ${title}
                  </h2>
                  <p class="text-[#64748B] mt-1">
                    ${description}
                  </p>
                </div>

                <!-- bug and help wanted tags will be here -->
                <div class="flex justify-baseline gap-1 flex-wrap">
                  <div
                    class="bg-[#FEECEC] px-6 py-1.5 rounded-full text-[#EF4444] text-[12px] font-medium flex items-center gap-1 w-fill"
                  >
                    <i class="fa-solid fa-bug"></i> ${labels[0]?.toUpperCase()}
                  </div>
                  <div
                    class="bg-[#FFF8DB] px-6 py-1.5 rounded-full text-[#D97706] text-[12px] font-medium flex items-center gap-1 w-fill"
                  >
                    <i class="fa-solid fa-life-ring"></i> ${labels[1]?.toUpperCase()}
                  </div>
                </div>
              </div>

              <!-- divider and comment count will be here -->
              <div class="divider"></div>
              
              <!-- bottom part of the card will be here  -->
              <div class="p-6 space-y-3">
                <p class="text-[#64748B] text-[12px] font-normal">#1 by ${author}</p>
                <p class="text-[#64748B] text-[12px] font-normal">${new Date(createdAt).toLocaleDateString()}</p>
              </div>
            </div>
        
        `;
  });
  manageSpinner(false);
}

const loadSingleIssue = async (id) => {
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );
  const data = await res.json();
  displaySingleIssue(data.data);
};

function displaySingleIssue(data) {
  const { title, description, status, labels, priority, author, createdAt } =
    data;
  console.log(data);
  const modalContainer = document.getElementById("modal-container");
  const issue_modal = document.getElementById("issue_modal");
  issue_modal.showModal();
  modalContainer.innerHTML = `
          <div class="space-y-2.5">
            <h3 class="font-bold text-2xl">${title}</h3>
            <div>
              <div
                class="text-[#64748B] text-[12px] font-normal flex items-center gap-2"
              >
                <p class="px-2 py-1 text-white ${status === "open" ? "bg-[#00A96E]" : "bg-[#A855F7]"} rounded-full">
                  ${status}
                </p>
                <div class="w-2 h-2 bg-[#64748B] rounded-full"></div>
                <p>Opened by ${author}</p>
                <div class="w-2 h-2 bg-[#64748B] rounded-full"></div>
                <p>${new Date(createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <!-- buttons  -->
          <div class="flex items-center gap-2 flex-wrap">
            <div
              class="bg-[#FEECEC] px-6 py-1.5 rounded-full text-[#EF4444] text-[12px] font-medium flex items-center gap-1 w-fill"
            >
              <i class="fa-solid fa-bug"></i> ${labels[0]?.toUpperCase()}
            </div>
            <div
              class="bg-[#FFF8DB] px-6 py-1.5 rounded-full text-[#D97706] text-[12px] font-medium flex items-center gap-1 w-fill"
            >
              <i class="fa-solid fa-life-ring"></i> ${labels[1]?.toUpperCase()}
            </div>
          </div>

          <p class="text-[#64748B] text-[16px]">
            ${description}
          </p>

          <div class="bg-[#F8FAFC] rounded-sm flex items-center p-4">
            <div class="w-full">
              <p class="text-[#64748B] text-[16px]">Assignee:</p>
              <h3 class="text-[#1F2937] font-semibold text-[16px]">
                ${data.assignee || "Unassigned"}
              </h3>
            </div>
            <div class="w-full">
              <p class="text-[#64748B] text-[16px]">Priority:</p>
              <div
                class="text-[12px] text-white font-medium rounded-lg bg-[#EF4444] text-center w-fit px-3 py-1"
              >
                ${priority.toUpperCase()}
              </div>
            </div>
          </div>

          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn btn-primary">Close</button>
            </form>
          </div>
  
  `;
}

document.getElementById("input-search").addEventListener("keyup", () => {
  const inputSearch = document.getElementById("input-search");
  const searchTerm = inputSearch.value.trim().toLowerCase();
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues?search=${searchTerm}`;
  manageSpinner(true);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const allIssues = data.data;
      const filteredIssues = allIssues.filter(
        (issue) =>
          issue.title.toLowerCase().includes(searchTerm) ||
          issue.description.toLowerCase().includes(searchTerm),
      );
      displayAllIssue(filteredIssues);
    })
    .catch((error) => {
      console.error("Error fetching search results:", error);
    })
    .finally(() => {
      manageSpinner(false);
    });
});
