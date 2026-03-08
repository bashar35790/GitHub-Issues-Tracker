// All issues object is here
// {
//     "id": 1,
//     "title": "Fix navigation menu on mobile devices",
//     "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//     "status": "open",
//     "labels": [
//         "bug",
//         "help wanted"
//     ],
//     "priority": "high",
//     "author": "john_doe",
//     "assignee": "jane_smith",
//     "createdAt": "2024-01-15T10:30:00Z",
//     "updatedAt": "2024-01-15T10:30:00Z"
// }

const AllIssues = async () => {
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  displayIssue(data.data);
};

AllIssues();

function displayIssue(data) {
  const cardContainer = document.getElementById("card-container");
  const numberOfIssues = document.getElementById("Number-of-issues");
  numberOfIssues.innerText = `${data.length} Issues`;
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
            <div class="w-full space-y-3 shadow-2xl rounded-lg ${status === "open" ? "border-[#00A96E]" : "border-[#A855F7]"} border-t-4 ">
              <!-- card top  -->
              <div class="p-6 space-y-3">
                <!-- issue title and description will be here -->
                <div class="flex justify-between">
                  <img
                    src="./assets/Open-Status.png"
                    alt="Open Status"
                    class="w-7 h-7 object-cover"
                  />
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
    singleIssue(id);

  });
}

const singleIssue = async (id) => {
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );
  const data = await res.json();
  displaySingleIssue(data.data);
};

const displaySingleIssue = (data) => {
    console.log(data);

}

