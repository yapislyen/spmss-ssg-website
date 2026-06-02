// ---------- STORAGE ----------
function getAnnouncements() {
  return JSON.parse(localStorage.getItem("announcements") || "[]");
}

function saveAnnouncements(list) {
  localStorage.setItem("announcements", JSON.stringify(list));
}

// ---------- OFFICER CHECK ----------
function isOfficer() {
  return localStorage.getItem("isOfficer") === "true";
}

// ---------- RENDER ----------
function renderAnnouncements() {
  const container = document.getElementById("announcementList");
  if (!container) return;

  const announcements = getAnnouncements();

  container.innerHTML = "";

  announcements.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "announcement";

    div.innerHTML = `
      <h3>📢 ${item.title}</h3>
      <p>${item.content}</p>
      <small>Posted: ${item.time}</small>

      ${
        isOfficer()
          ? `<button onclick="deleteAnnouncement(${index})" class="delete-btn">Delete</button>`
          : ""
      }
    `;

    container.appendChild(div);
  });
}

// ---------- ADD ----------
function addAnnouncement() {
  const title = document.getElementById("title");
  const content = document.getElementById("content");

  if (!title || !content) return;

  if (!title.value || !content.value) {
    alert("Please fill in both fields!");
    return;
  }

  const announcements = getAnnouncements();

  announcements.unshift({
    title: title.value,
    content: content.value,
    time: new Date().toLocaleString()
  });

  saveAnnouncements(announcements);

  title.value = "";
  content.value = "";

  renderAnnouncements();
}

// ---------- DELETE ----------
function deleteAnnouncement(index) {
  const announcements = getAnnouncements();

  announcements.splice(index, 1);

  saveAnnouncements(announcements);
  renderAnnouncements();
}

// ---------- LOGIN ----------
function login() {
  const user = document.getElementById("username");
  const pass = document.getElementById("password");

  if (!user || !pass) return;

  if (user.value === "ssg" && pass.value === "1234") {
    localStorage.setItem("isOfficer", "true");
    window.location.href = "announcements.html";
  } else {
    alert("Invalid login");
  }
}

// ---------- LOGOUT ----------
function logout() {
  localStorage.removeItem("isOfficer");
  location.reload();
}

// ---------- INIT ----------
window.addEventListener("load", renderAnnouncements);
function updateDashboardStats() {
  const announcements = JSON.parse(localStorage.getItem("announcements") || "[]");

  const counter = document.getElementById("announcementCount");
  if (counter) {
    counter.innerText = `📢 Announcements: ${announcements.length}`;
  }
}

window.addEventListener("load", updateDashboardStats);