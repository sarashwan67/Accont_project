let accountsDB = JSON.parse(localStorage.getItem("accountsDB")) || {};

// 🔥 عرض البيانات
function buildTable() {
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = "";

    Object.keys(accountsDB)
        .sort((a, b) => {

            // 1️⃣ حسب أول رقم (1 → 4)
            if (a[0] !== b[0]) {
                return a[0] - b[0];
            }

            // 2️⃣ حسب طول الكود (Hierarchy)
            if (a.length !== b.length) {
                return a.length - b.length;
            }

            // 3️⃣ ترتيب رقمي
            return Number(a) - Number(b);
        })
        .forEach(code => {

            const tr = document.createElement("tr");

            tr.innerHTML = `
            <td style="padding-left:${(code.length - 1) * 5}px">
                <input value="${code}" class="code">
            </td>

            <td>
                <input value="${accountsDB[code]}" class="name">
            </td>

            <td>
                <button onclick="deleteRow(this)">❌</button>
            </td>
            `;

            tbody.appendChild(tr);
        });
}

// ➕ إضافة صف جديد
function addRow() {
    const tbody = document.getElementById("tbody");

    const tr = document.createElement("tr");

    tr.innerHTML = `
    <td><input class="code"></td>
    <td><input class="name"></td>
    <td><button onclick="deleteRow(this)">❌</button></td>
    `;

    tbody.appendChild(tr);
}

// ❌ حذف
function deleteRow(btn) {
    btn.parentElement.parentElement.remove();
}

// 💾 حفظ
function saveAccounts() {
    const rows = document.querySelectorAll("#tbody tr");

    let newDB = {};

    rows.forEach(row => {
        const code = row.querySelector(".code").value.trim();
        const name = row.querySelector(".name").value.trim();

        if (code && name) {
            newDB[code] = name;
        }
    });

    localStorage.setItem("accountsDB", JSON.stringify(newDB));

    alert("Saved Successfully ✅");

    buildTable();
}

// تشغيل
buildTable();