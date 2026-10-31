// ===========================
// LibraryOS - app.js
// Library Management System
// MongoDB + Neo4j NoSQL Project
// ===========================

// ===== DATA STORE =====
let DB = {
  books: [],
  members: [],
  transactions: [],
};

// ===== SEED DATA =====
const seedBooks = [
  { id: 'B001', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', isbn: '978-0-7432-7356-5', publisher: 'Scribner', year: 1925, copies: 4, available: 3, shelf: 'A-1', desc: 'A classic tale of wealth, class, love and idealism in 1920s America.', emoji: '📗', rating: 4.5, borrowed: 18 },
  { id: 'B002', title: 'Clean Code', author: 'Robert C. Martin', genre: 'Technology', isbn: '978-0-13-235088-4', publisher: 'Prentice Hall', year: 2008, copies: 6, available: 2, shelf: 'C-3', desc: 'A handbook of agile software craftsmanship.', emoji: '💻', rating: 4.8, borrowed: 32 },
  { id: 'B003', title: 'Sapiens', author: 'Yuval Noah Harari', genre: 'History', isbn: '978-0-06-231609-7', publisher: 'Harper', year: 2011, copies: 5, available: 5, shelf: 'D-2', desc: 'A brief history of humankind.', emoji: '🌍', rating: 4.7, borrowed: 27 },
  { id: 'B004', title: 'The Alchemist', author: 'Paulo Coelho', genre: 'Fiction', isbn: '978-0-06-112241-5', publisher: 'HarperOne', year: 1988, copies: 7, available: 4, shelf: 'A-3', desc: 'A philosophical novel about a shepherd following his dreams.', emoji: '📙', rating: 4.6, borrowed: 41 },
  { id: 'B005', title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', genre: 'Non-Fiction', isbn: '978-0-37-440341-0', publisher: 'Farrar', year: 2011, copies: 3, available: 1, shelf: 'B-7', desc: 'How two systems drive the way we think.', emoji: '🧠', rating: 4.5, borrowed: 22 },
  { id: 'B006', title: 'Atomic Habits', author: 'James Clear', genre: 'Self-Help', isbn: '978-0-73-521129-2', publisher: 'Avery', year: 2018, copies: 8, available: 6, shelf: 'E-1', desc: 'An easy and proven way to build good habits.', emoji: '⚡', rating: 4.9, borrowed: 55 },
  { id: 'B007', title: 'The Da Vinci Code', author: 'Dan Brown', genre: 'Mystery', isbn: '978-0-38-550420-5', publisher: 'Doubleday', year: 2003, copies: 5, available: 0, shelf: 'A-5', desc: 'A fast-paced thriller involving the Catholic Church.', emoji: '🔍', rating: 4.3, borrowed: 38 },
  { id: 'B008', title: 'A Brief History of Time', author: 'Stephen Hawking', genre: 'Science', isbn: '978-0-55-305340-1', publisher: 'Bantam', year: 1988, copies: 4, available: 3, shelf: 'C-8', desc: 'From the Big Bang to black holes.', emoji: '🔭', rating: 4.7, borrowed: 19 },
  { id: 'B009', title: 'Becoming', author: 'Michelle Obama', genre: 'Biography', isbn: '978-1-52-476313-8', publisher: 'Crown', year: 2018, copies: 6, available: 4, shelf: 'F-2', desc: 'An intimate and powerful memoir by the former First Lady.', emoji: '📔', rating: 4.8, borrowed: 30 },
  { id: 'B010', title: 'The Pragmatic Programmer', author: 'Andrew Hunt', genre: 'Technology', isbn: '978-0-13-595705-9', publisher: 'Addison-Wesley', year: 1999, copies: 3, available: 3, shelf: 'C-1', desc: 'From journeyman to master programmer.', emoji: '🖥️', rating: 4.7, borrowed: 24 },
  { id: 'B011', title: 'Deep Work', author: 'Cal Newport', genre: 'Self-Help', isbn: '978-1-45-557653-4', publisher: 'Grand Central', year: 2016, copies: 4, available: 2, shelf: 'E-3', desc: 'Rules for focused success in a distracted world.', emoji: '🎯', rating: 4.6, borrowed: 28 },
  { id: 'B012', title: 'The Selfish Gene', author: 'Richard Dawkins', genre: 'Science', isbn: '978-0-19-857519-1', publisher: 'Oxford University', year: 1976, copies: 2, available: 2, shelf: 'C-5', desc: 'An influential biology book on evolutionary theory.', emoji: '🧬', rating: 4.5, borrowed: 12 },
];

const seedMembers = [
  { id: 'M001', name: 'Arjun Sharma', email: 'arjun@college.edu', phone: '+91 98765 43210', type: 'Student', status: 'Active', address: '12 Gandhi Nagar, Chennai', expiry: '2027-06-30', avatar: 'A', color: '#6366f1', booksRead: 5 },
  { id: 'M002', name: 'Priya Nair', email: 'priya@college.edu', phone: '+91 97654 32109', type: 'Student', status: 'Active', address: '45 Anna Salai, Chennai', expiry: '2027-06-30', avatar: 'P', color: '#ec4899', booksRead: 8 },
  { id: 'M003', name: 'Dr. Rajan Kumar', email: 'rajan@college.edu', phone: '+91 94321 54321', type: 'Faculty', status: 'Active', address: '7 University Road, Chennai', expiry: '2028-12-31', avatar: 'R', color: '#10b981', booksRead: 15 },
  { id: 'M004', name: 'Meena Suresh', email: 'meena@college.edu', phone: '+91 98901 23456', type: 'Student', status: 'Active', address: '23 Patel Street, Chennai', expiry: '2027-06-30', avatar: 'M', color: '#f59e0b', booksRead: 3 },
  { id: 'M005', name: 'Karthik Raj', email: 'karthik@college.edu', phone: '+91 91234 56789', type: 'Staff', status: 'Suspended', address: '56 MG Road, Chennai', expiry: '2026-12-31', avatar: 'K', color: '#ef4444', booksRead: 2 },
  { id: 'M006', name: 'Divya Lakshmi', email: 'divya@college.edu', phone: '+91 99876 54321', type: 'Student', status: 'Active', address: '34 Nehru Place, Chennai', expiry: '2027-06-30', avatar: 'D', color: '#8b5cf6', booksRead: 11 },
];

const today = new Date();
const fmtDate = (d) => d.toISOString().split('T')[0];
const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate()+n); return r; };

const seedTransactions = [
  { id: 'T001', memberId: 'M001', bookId: 'B002', issueDate: fmtDate(addDays(today,-10)), dueDate: fmtDate(addDays(today,4)), returnDate: null, status: 'Active', fine: 0 },
  { id: 'T002', memberId: 'M002', bookId: 'B004', issueDate: fmtDate(addDays(today,-5)), dueDate: fmtDate(addDays(today,9)), returnDate: null, status: 'Active', fine: 0 },
  { id: 'T003', memberId: 'M003', bookId: 'B001', issueDate: fmtDate(addDays(today,-20)), dueDate: fmtDate(addDays(today,-6)), returnDate: null, status: 'Overdue', fine: 30 },
  { id: 'T004', memberId: 'M004', bookId: 'B006', issueDate: fmtDate(addDays(today,-30)), dueDate: fmtDate(addDays(today,-16)), returnDate: fmtDate(addDays(today,-15)), status: 'Returned', fine: 0 },
  { id: 'T005', memberId: 'M006', bookId: 'B007', issueDate: fmtDate(addDays(today,-7)), dueDate: fmtDate(addDays(today,7)), returnDate: null, status: 'Active', fine: 0 },
  { id: 'T006', memberId: 'M001', bookId: 'B009', issueDate: fmtDate(addDays(today,-25)), dueDate: fmtDate(addDays(today,-11)), returnDate: null, status: 'Overdue', fine: 55 },
  { id: 'T007', memberId: 'M002', bookId: 'B003', issueDate: fmtDate(addDays(today,-14)), dueDate: fmtDate(addDays(today,0)), returnDate: fmtDate(addDays(today,-1)), status: 'Returned', fine: 0 },
  { id: 'T008', memberId: 'M006', bookId: 'B005', issueDate: fmtDate(addDays(today,-3)), dueDate: fmtDate(addDays(today,11)), returnDate: null, status: 'Active', fine: 0 },
];

// ===== INIT =====
function init() {
  DB.books = [...seedBooks];
  DB.members = [...seedMembers];
  DB.transactions = [...seedTransactions];
  updateStats();
  updateBooksBadge();
}

// ===== LOGIN =====
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const pass = document.getElementById('loginPass').value;
  const btn = document.getElementById('loginBtn');
  btn.innerHTML = '<span>Signing in...</span>';
  btn.disabled = true;
  setTimeout(() => {
    if (email === 'admin@library.com' && pass === 'admin123') {
      document.getElementById('loginPage').style.display = 'none';
      document.getElementById('appPage').style.display = 'flex';
      init();
      renderAll();
      showPage('dashboard');
      toast('Welcome back, Admin! 👋', 'success');
    } else {
      toast('Invalid credentials. Try admin@library.com / admin123', 'error');
      btn.innerHTML = '<span>Sign In to Dashboard</span><span class="btn-arrow">→</span>';
      btn.disabled = false;
    }
  }, 800);
});

// ===== LOGOUT =====
document.getElementById('logoutBtn').addEventListener('click', () => {
  document.getElementById('appPage').style.display = 'none';
  document.getElementById('loginPage').style.display = 'block';
  toast('Logged out successfully', 'info');
});

// ===== SIDEBAR TOGGLE =====
document.getElementById('sidebarToggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('collapsed');
  document.getElementById('mainContent').classList.toggle('collapsed');
});

// ===== NAVIGATION =====
function showPage(pageName) {
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.content-section').forEach(el => el.classList.remove('active'));
  const navEl = document.getElementById('nav-' + pageName);
  if (navEl) navEl.classList.add('active');
  const section = document.getElementById('section-' + pageName);
  if (section) section.classList.add('active');
  const titles = { dashboard: 'Dashboard', books: 'Books Management', members: 'Members', transactions: 'Transactions', recommendations: 'Book Recommendations', fines: 'Fines & Payments', reports: 'Reports & Analytics' };
  const breadcrumbs = { dashboard: 'Home / Dashboard', books: 'Home / Books', members: 'Home / Members', transactions: 'Home / Transactions', recommendations: 'Home / Neo4j / Recommendations', fines: 'Home / Fines', reports: 'Home / Reports' };
  document.getElementById('pageTitle').textContent = titles[pageName] || pageName;
  document.getElementById('breadcrumb').textContent = breadcrumbs[pageName] || '';
  if (pageName === 'recommendations') { drawGraph(); populateRecSelect(); }
  if (pageName === 'reports') { drawCharts(); }
  if (pageName === 'fines') { renderFines(); }
}

document.querySelectorAll('.nav-item').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    showPage(el.dataset.page);
  });
});

// ===== RENDER ALL =====
function renderAll() {
  renderBooks();
  renderMembers();
  renderTransactions();
  renderRecentTrans();
  renderGenreChart();
  updateStats();
  updateBooksBadge();
  populateMemberSelects();
  populateBookSelect();
  populateReturnSelect();
  updateFinesSummary();
}

// ===== STATS =====
function updateStats() {
  document.getElementById('totalBooks').textContent = DB.books.length;
  document.getElementById('totalMembers').textContent = DB.members.filter(m => m.status === 'Active').length;
  const active = DB.transactions.filter(t => t.status === 'Active').length;
  document.getElementById('activeLoans').textContent = active;
  const overdue = DB.transactions.filter(t => t.status === 'Overdue').length;
  document.getElementById('overdueCount').textContent = overdue;
}

function updateBooksBadge() {
  document.getElementById('booksBadge').textContent = DB.books.length;
}

// ===== BOOKS =====
let bookView = 'grid';
let filteredBooks = [];

function renderBooks() {
  filteredBooks = getFilteredBooks();
  if (bookView === 'grid') renderBooksGrid();
  else renderBooksList();
}

function getFilteredBooks() {
  const q = (document.getElementById('bookSearch')?.value || '').toLowerCase();
  const genre = document.getElementById('genreFilter')?.value || '';
  return DB.books.filter(b =>
    (!q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.isbn.includes(q)) &&
    (!genre || b.genre === genre)
  );
}

function filterBooks() { renderBooks(); }

function setBookView(view) {
  bookView = view;
  document.getElementById('gridViewBtn').classList.toggle('active', view === 'grid');
  document.getElementById('listViewBtn').classList.toggle('active', view === 'list');
  document.getElementById('booksGrid').style.display = view === 'grid' ? 'grid' : 'none';
  document.getElementById('booksListWrap').style.display = view === 'list' ? 'block' : 'none';
  renderBooks();
}

function renderBooksGrid() {
  const grid = document.getElementById('booksGrid');
  if (!filteredBooks.length) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon">📭</div><h3>No books found</h3><p>Try adjusting your search or add a new book.</p></div>`;
    return;
  }
  grid.innerHTML = filteredBooks.map(b => {
    const statusText = b.available === 0 ? 'Unavailable' : b.available <= 2 ? 'Limited' : 'Available';
    const statusClass = b.available === 0 ? 'status-unavailable' : b.available <= 2 ? 'status-limited' : 'status-available';
    const bgColors = { Fiction:'#ede9fe', Technology:'#e0f2fe', History:'#fef9c3', Science:'#d1fae5', 'Non-Fiction':'#fce7f3', Mystery:'#fef2f2', Biography:'#e0f2fe', 'Self-Help':'#ecfdf5' };
    const bg = bgColors[b.genre] || '#f3f4f6';
    return `
    <div class="book-card" onclick="showBookDetail('${b.id}')">
      <div class="book-cover" style="background:${bg}">
        <span>${b.emoji}</span>
        <span class="book-genre-tag">${b.genre}</span>
      </div>
      <div class="book-title">${b.title}</div>
      <div class="book-author">by ${b.author}</div>
      <div class="book-meta">
        <span class="book-copies">${b.available}/${b.copies} copies</span>
        <span class="book-status ${statusClass}">${statusText}</span>
      </div>
      <div class="book-actions">
        <button class="book-act-btn" onclick="event.stopPropagation();editBook('${b.id}')">✏️ Edit</button>
        <button class="book-act-btn del" onclick="event.stopPropagation();deleteBook('${b.id}')">🗑️</button>
      </div>
    </div>`;
  }).join('');
}

function renderBooksList() {
  const tbody = document.getElementById('booksListBody');
  tbody.innerHTML = filteredBooks.map((b, i) => {
    const statusText = b.available === 0 ? 'Unavailable' : b.available <= 2 ? 'Limited' : 'Available';
    const statusClass = b.available === 0 ? 'status-unavailable' : b.available <= 2 ? 'status-limited' : 'status-available';
    return `<tr>
      <td>${i+1}</td>
      <td><strong>${b.title}</strong></td>
      <td>${b.author}</td>
      <td>${b.genre}</td>
      <td><code style="font-size:11px;color:#6366f1">${b.isbn}</code></td>
      <td>${b.available}/${b.copies}</td>
      <td><span class="book-status ${statusClass}">${statusText}</span></td>
      <td>
        <button class="tbl-btn tbl-btn-primary" onclick="showBookDetail('${b.id}')">View</button>
        <button class="tbl-btn tbl-btn-danger" onclick="deleteBook('${b.id}')">Delete</button>
      </td>
    </tr>`;
  }).join('');
}

function addBook() {
  const title = document.getElementById('bookTitle').value.trim();
  const author = document.getElementById('bookAuthor').value.trim();
  const isbn = document.getElementById('bookISBN').value.trim();
  const genre = document.getElementById('bookGenre').value;
  const copies = parseInt(document.getElementById('bookCopies').value) || 1;
  if (!title || !author || !isbn) { toast('Please fill all required fields', 'error'); return; }
  const emojis = { Fiction:'📗', Technology:'💻', History:'🌍', Science:'🔭', 'Non-Fiction':'📘', Mystery:'🔍', Biography:'📔', 'Self-Help':'⚡' };
  const newBook = {
    id: 'B' + String(DB.books.length + 1).padStart(3,'0'),
    title, author, isbn, genre,
    publisher: document.getElementById('bookPublisher').value.trim() || 'Unknown',
    year: parseInt(document.getElementById('bookYear').value) || 2024,
    copies, available: copies,
    shelf: document.getElementById('bookShelf').value.trim() || 'TBD',
    desc: document.getElementById('bookDesc').value.trim() || 'No description.',
    emoji: emojis[genre] || '📚',
    rating: (3.5 + Math.random() * 1.5).toFixed(1),
    borrowed: 0,
  };
  DB.books.push(newBook);
  renderAll();
  closeModal('addBookModal');
  toast(`"${title}" added to library! 📚`, 'success');
  clearForm(['bookTitle','bookAuthor','bookISBN','bookPublisher','bookYear','bookCopies','bookShelf','bookDesc']);
}

function deleteBook(id) {
  const book = DB.books.find(b => b.id === id);
  if (!book) return;
  const active = DB.transactions.find(t => t.bookId === id && t.status === 'Active');
  if (active) { toast('Cannot delete: book has active loans', 'error'); return; }
  if (confirm(`Delete "${book.title}"?`)) {
    DB.books = DB.books.filter(b => b.id !== id);
    renderAll();
    toast(`"${book.title}" removed from library`, 'warning');
  }
}

function editBook(id) {
  toast('Edit mode: opening book editor...', 'info');
  showBookDetail(id);
}

function showBookDetail(id) {
  const b = DB.books.find(b => b.id === id);
  if (!b) return;
  const activeTrans = DB.transactions.filter(t => t.bookId === id && t.status === 'Active');
  document.getElementById('detailBookTitle').textContent = `${b.emoji} ${b.title}`;
  document.getElementById('bookDetailBody').innerHTML = `
    <div style="display:grid;grid-template-columns:140px 1fr;gap:24px;align-items:start">
      <div style="background:${getGenreBg(b.genre)};border-radius:12px;height:180px;display:flex;align-items:center;justify-content:center;font-size:72px">${b.emoji}</div>
      <div>
        <div style="font-size:22px;font-weight:800;margin-bottom:4px">${b.title}</div>
        <div style="color:#6b7280;margin-bottom:12px">by ${b.author} · ${b.year}</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px">
          <span class="member-tag">${b.genre}</span>
          <span class="member-tag">${b.isbn}</span>
          <span class="member-tag">Shelf: ${b.shelf}</span>
          <span style="background:#fef9c3;border-radius:6px;padding:2px 8px;font-size:11px;font-weight:700">⭐ ${b.rating}</span>
        </div>
        <div style="font-size:13px;color:#374151;margin-bottom:16px;line-height:1.6">${b.desc}</div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">
          <div style="background:#f8f9fc;border-radius:8px;padding:10px;text-align:center">
            <div style="font-size:20px;font-weight:800;color:#6366f1">${b.copies}</div>
            <div style="font-size:11px;color:#6b7280">Total Copies</div>
          </div>
          <div style="background:#f8f9fc;border-radius:8px;padding:10px;text-align:center">
            <div style="font-size:20px;font-weight:800;color:#10b981">${b.available}</div>
            <div style="font-size:11px;color:#6b7280">Available</div>
          </div>
          <div style="background:#f8f9fc;border-radius:8px;padding:10px;text-align:center">
            <div style="font-size:20px;font-weight:800;color:#f59e0b">${b.borrowed}</div>
            <div style="font-size:11px;color:#6b7280">Times Borrowed</div>
          </div>
        </div>
      </div>
    </div>
    ${activeTrans.length > 0 ? `
    <div style="margin-top:20px">
      <div style="font-size:14px;font-weight:700;margin-bottom:8px">Currently Borrowed by:</div>
      ${activeTrans.map(t => {
        const m = DB.members.find(m => m.id === t.memberId);
        return `<div style="display:flex;align-items:center;gap:10px;padding:8px;background:#f8f9fc;border-radius:8px;margin-bottom:6px">
          <div style="width:30px;height:30px;border-radius:8px;background:${m?.color||'#6366f1'};color:#fff;font-weight:800;display:flex;align-items:center;justify-content:center;font-size:12px">${m?.avatar||'?'}</div>
          <div><div style="font-size:13px;font-weight:600">${m?.name||'Unknown'}</div><div style="font-size:11px;color:#6b7280">Due: ${t.dueDate}</div></div>
          <span class="status-pill ${t.status==='Overdue'?'pill-overdue':'pill-active'}" style="margin-left:auto">${t.status}</span>
        </div>`;
      }).join('')}
    </div>` : ''}
    <div style="margin-top:16px">
      <div style="background:#e8f0fe;border-radius:8px;padding:12px">
        <div style="font-size:11px;font-weight:700;color:#1a73e8;margin-bottom:4px">📦 MongoDB Document</div>
        <code style="font-size:11px;color:#1a73e8;font-family:monospace;line-height:1.8">
          { _id: ObjectId("${b.id}"), title: "${b.title}", author: "${b.author}", genre: "${b.genre}", isbn: "${b.isbn}", available: ${b.available}, copies: ${b.copies} }
        </code>
      </div>
    </div>
  `;
  openModal('bookDetailModal');
}

function getGenreBg(genre) {
  const map = { Fiction:'#ede9fe', Technology:'#e0f2fe', History:'#fef9c3', Science:'#d1fae5', 'Non-Fiction':'#fce7f3', Mystery:'#fef2f2', Biography:'#e0f2fe', 'Self-Help':'#ecfdf5' };
  return map[genre] || '#f3f4f6';
}

// ===== MEMBERS =====
function renderMembers() {
  const grid = document.getElementById('membersGrid');
  const filtered = getFilteredMembers();
  if (!filtered.length) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon">👥</div><h3>No members found</h3></div>`;
    return;
  }
  grid.innerHTML = filtered.map(m => {
    const activeLoans = DB.transactions.filter(t => t.memberId === m.id && t.status === 'Active').length;
    const overdueLoans = DB.transactions.filter(t => t.memberId === m.id && t.status === 'Overdue').length;
    return `
    <div class="member-card">
      <div class="member-avatar" style="background:${m.color}">${m.avatar}</div>
      <div class="member-info">
        <div class="member-name">${m.name}</div>
        <div class="member-email">${m.email}</div>
        <div class="member-meta">
          <span class="member-tag">${m.type}</span>
          <span class="member-tag" style="${m.status==='Active'?'background:#dcfce7;color:#16a34a':'background:#fef2f2;color:#dc2626'}">${m.status}</span>
          ${activeLoans > 0 ? `<span class="member-tag" style="background:#e0f2fe;color:#0369a1">${activeLoans} active</span>` : ''}
          ${overdueLoans > 0 ? `<span class="member-tag" style="background:#fef2f2;color:#dc2626">⚠️ ${overdueLoans} overdue</span>` : ''}
        </div>
      </div>
      <div class="member-actions">
        <button class="member-act-btn" onclick="viewMemberDetail('${m.id}')" title="View">👁</button>
        <button class="member-act-btn del" onclick="deleteMember('${m.id}')" title="Delete">🗑</button>
      </div>
    </div>`;
  }).join('');
}

function getFilteredMembers() {
  const q = (document.getElementById('memberSearch')?.value || '').toLowerCase();
  const status = document.getElementById('memberStatusFilter')?.value || '';
  return DB.members.filter(m =>
    (!q || m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q)) &&
    (!status || m.status === status)
  );
}
function filterMembers() { renderMembers(); }

function addMember() {
  const name = document.getElementById('memberName').value.trim();
  const email = document.getElementById('memberEmail').value.trim();
  if (!name || !email) { toast('Name and Email are required', 'error'); return; }
  const colors = ['#6366f1','#ec4899','#10b981','#f59e0b','#8b5cf6','#06b6d4','#f97316','#14b8a6'];
  const newMember = {
    id: 'M' + String(DB.members.length + 1).padStart(3, '0'),
    name, email,
    phone: document.getElementById('memberPhone').value.trim(),
    type: document.getElementById('memberType').value,
    status: 'Active',
    address: document.getElementById('memberAddress').value.trim(),
    expiry: document.getElementById('memberExpiry').value || fmtDate(addDays(today, 365)),
    avatar: name.charAt(0).toUpperCase(),
    color: colors[DB.members.length % colors.length],
    booksRead: 0,
  };
  DB.members.push(newMember);
  renderAll();
  closeModal('addMemberModal');
  toast(`${name} registered as a member! 👤`, 'success');
  clearForm(['memberName','memberEmail','memberPhone','memberAddress','memberExpiry']);
}

function deleteMember(id) {
  const m = DB.members.find(m => m.id === id);
  const active = DB.transactions.find(t => t.memberId === id && t.status === 'Active');
  if (active) { toast('Cannot remove: member has active loans', 'error'); return; }
  if (confirm(`Remove ${m.name} from the system?`)) {
    DB.members = DB.members.filter(m => m.id !== id);
    renderAll();
    toast(`${m.name} removed`, 'warning');
  }
}

function viewMemberDetail(id) {
  const m = DB.members.find(m => m.id === id);
  const borrowed = DB.transactions.filter(t => t.memberId === id);
  toast(`${m.name} — ${borrowed.length} total transactions`, 'info');
}

// ===== TRANSACTIONS =====
function renderTransactions() {
  const tbody = document.getElementById('transBody');
  const filtered = getFilteredTrans();
  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="9" class="empty-state"><div class="empty-state-icon">🔄</div><h3>No transactions</h3></td></tr>`;
    return;
  }
  tbody.innerHTML = filtered.map(t => {
    const m = DB.members.find(m => m.id === t.memberId);
    const b = DB.books.find(b => b.id === t.bookId);
    const pillClass = { Active: 'pill-active', Returned: 'pill-returned', Overdue: 'pill-overdue' }[t.status] || 'pill-active';
    return `<tr>
      <td><code style="font-size:11px;color:#6366f1">${t.id}</code></td>
      <td><div style="font-weight:600">${m?.name||'Unknown'}</div><div style="font-size:11px;color:#9ca3af">${m?.type||''}</div></td>
      <td><div style="font-weight:600">${b?.title||'Unknown'}</div><div style="font-size:11px;color:#9ca3af">${b?.author||''}</div></td>
      <td>${t.issueDate}</td>
      <td>${t.dueDate}</td>
      <td>${t.returnDate || '<span style="color:#9ca3af">—</span>'}</td>
      <td>${t.fine > 0 ? `<span style="color:#dc2626;font-weight:700">₹${t.fine}</span>` : '<span style="color:#16a34a">₹0</span>'}</td>
      <td><span class="status-pill ${pillClass}">${t.status}</span></td>
      <td>
        ${t.status !== 'Returned' ? `<button class="tbl-btn tbl-btn-success" onclick="quickReturn('${t.id}')">Return</button>` : ''}
        <button class="tbl-btn tbl-btn-danger" onclick="deleteTrans('${t.id}')">Delete</button>
      </td>
    </tr>`;
  }).join('');
}

function getFilteredTrans() {
  const q = (document.getElementById('transSearch')?.value || '').toLowerCase();
  const status = document.getElementById('transStatusFilter')?.value || '';
  return DB.transactions.filter(t => {
    const m = DB.members.find(m => m.id === t.memberId);
    const b = DB.books.find(b => b.id === t.bookId);
    return (!q || (m?.name||'').toLowerCase().includes(q) || (b?.title||'').toLowerCase().includes(q) || t.id.toLowerCase().includes(q)) &&
      (!status || t.status === status);
  });
}
function filterTrans() { renderTransactions(); }

function renderRecentTrans() {
  const tbody = document.getElementById('recentTransBody');
  const recent = [...DB.transactions].slice(-5).reverse();
  tbody.innerHTML = recent.map(t => {
    const m = DB.members.find(m => m.id === t.memberId);
    const b = DB.books.find(b => b.id === t.bookId);
    const pillClass = { Active: 'pill-active', Returned: 'pill-returned', Overdue: 'pill-overdue' }[t.status] || 'pill-active';
    return `<tr>
      <td>${m?.name||'?'}</td>
      <td title="${b?.title||''}">${(b?.title||'').length > 15 ? b.title.substring(0,15)+'…' : (b?.title||'?')}</td>
      <td>${t.issueDate}</td>
      <td><span class="status-pill ${pillClass}">${t.status}</span></td>
    </tr>`;
  }).join('');
}

function issueBook() {
  const memberId = document.getElementById('issueMember').value;
  const bookId = document.getElementById('issueBook').value;
  const issueDate = document.getElementById('issueDate').value || fmtDate(today);
  const dueDate = document.getElementById('dueDate').value || fmtDate(addDays(today, 14));
  if (!memberId || !bookId) { toast('Please select a member and a book', 'error'); return; }
  const book = DB.books.find(b => b.id === bookId);
  if (!book || book.available < 1) { toast('Book is not available', 'error'); return; }
  const member = DB.members.find(m => m.id === memberId);
  if (member.status === 'Suspended') { toast('Member account is suspended', 'error'); return; }
  const t = {
    id: 'T' + String(DB.transactions.length + 1).padStart(3, '0'),
    memberId, bookId, issueDate, dueDate,
    returnDate: null, status: 'Active', fine: 0,
  };
  DB.transactions.push(t);
  book.available--;
  member.booksRead++;
  renderAll();
  closeModal('issueBookModal');
  toast(`"${book.title}" issued to ${member.name} 📤`, 'success');
}

function returnBook() {
  const transId = document.getElementById('returnTrans').value;
  const returnDate = document.getElementById('returnDate').value || fmtDate(today);
  if (!transId) { toast('Please select a transaction', 'error'); return; }
  const t = DB.transactions.find(t => t.id === transId);
  if (!t) return;
  const dueDate = new Date(t.dueDate);
  const retDate = new Date(returnDate);
  const days = Math.max(0, Math.floor((retDate - dueDate) / (1000*60*60*24)));
  const fine = days * 5;
  t.returnDate = returnDate;
  t.status = 'Returned';
  t.fine = fine;
  const book = DB.books.find(b => b.id === t.bookId);
  if (book) book.available++;
  renderAll();
  closeModal('returnBookModal');
  toast(`Book returned! ${fine > 0 ? `Fine: ₹${fine}` : 'No late fee 🎉'}`, fine > 0 ? 'warning' : 'success');
}

function quickReturn(transId) {
  const t = DB.transactions.find(t => t.id === transId);
  if (!t) return;
  const retDate = fmtDate(today);
  const dueDate = new Date(t.dueDate);
  const days = Math.max(0, Math.floor((new Date(retDate) - dueDate) / (1000*60*60*24)));
  t.returnDate = retDate;
  t.status = 'Returned';
  t.fine = days * 5;
  const book = DB.books.find(b => b.id === t.bookId);
  if (book) book.available++;
  renderAll();
  toast(`Book returned! ${t.fine > 0 ? `Fine: ₹${t.fine}` : 'No late fee 🎉'}`, t.fine > 0 ? 'warning' : 'success');
}

function deleteTrans(id) {
  if (confirm('Delete this transaction record?')) {
    DB.transactions = DB.transactions.filter(t => t.id !== id);
    renderAll();
    toast('Transaction deleted', 'warning');
  }
}

// ===== POPULATE SELECTS =====
function populateMemberSelects() {
  const opts = DB.members.map(m => `<option value="${m.id}">${m.name} (${m.type})</option>`).join('');
  document.getElementById('issueMember').innerHTML = '<option value="">-- Select Member --</option>' + opts;
}

function populateBookSelect() {
  const available = DB.books.filter(b => b.available > 0);
  document.getElementById('issueBook').innerHTML = '<option value="">-- Select Book --</option>' +
    available.map(b => `<option value="${b.id}">${b.title} (${b.available} left)</option>`).join('');
  // Set default dates
  document.getElementById('issueDate').value = fmtDate(today);
  document.getElementById('dueDate').value = fmtDate(addDays(today, 14));
}

function populateReturnSelect() {
  const active = DB.transactions.filter(t => t.status === 'Active' || t.status === 'Overdue');
  document.getElementById('returnTrans').innerHTML = '<option value="">-- Select Transaction --</option>' +
    active.map(t => {
      const m = DB.members.find(m => m.id === t.memberId);
      const b = DB.books.find(b => b.id === t.bookId);
      return `<option value="${t.id}">${t.id}: ${m?.name||'?'} — ${b?.title||'?'}</option>`;
    }).join('');
  document.getElementById('returnDate').value = fmtDate(today);
}

// ===== FINES =====
function renderFines() {
  const tbody = document.getElementById('finesBody');
  const overdueOrFines = DB.transactions.filter(t => t.status === 'Overdue' || (t.fine > 0 && t.status !== 'Returned'));
  tbody.innerHTML = overdueOrFines.map(t => {
    const m = DB.members.find(m => m.id === t.memberId);
    const b = DB.books.find(b => b.id === t.bookId);
    const daysOverdue = Math.floor((today - new Date(t.dueDate)) / (1000*60*60*24));
    const fine = Math.max(0, daysOverdue * 5);
    return `<tr>
      <td><strong>${m?.name||'?'}</strong></td>
      <td>${b?.title||'?'}</td>
      <td style="color:#dc2626;font-weight:700">${daysOverdue} days</td>
      <td style="color:#dc2626;font-weight:800">₹${fine}</td>
      <td><span class="status-pill pill-overdue">Overdue</span></td>
      <td><button class="tbl-btn tbl-btn-success" onclick="quickReturn('${t.id}')">Mark Returned</button></td>
    </tr>`;
  }).join('') || `<tr><td colspan="6" style="text-align:center;padding:30px;color:#9ca3af">No outstanding fines 🎉</td></tr>`;
  updateFinesSummary();
}

function updateFinesSummary() {
  const overdue = DB.transactions.filter(t => t.status === 'Overdue');
  let totalOwed = 0;
  overdue.forEach(t => {
    const d = Math.floor((today - new Date(t.dueDate)) / (1000*60*60*24));
    totalOwed += Math.max(0, d * 5);
  });
  const collected = DB.transactions.reduce((a,t) => a + (t.fine || 0), 0);
  document.getElementById('totalFinesOwed').textContent = '₹' + totalOwed;
  document.getElementById('totalFinesCollected').textContent = '₹' + collected;
  document.getElementById('overdueMembers').textContent = new Set(overdue.map(t => t.memberId)).size;
}

// ===== GENRE CHART =====
function renderGenreChart() {
  const counts = {};
  DB.books.forEach(b => { counts[b.genre] = (counts[b.genre] || 0) + 1; });
  const sorted = Object.entries(counts).sort((a,b) => b[1]-a[1]);
  const max = sorted[0]?.[1] || 1;
  const colors = ['#6366f1','#10b981','#f59e0b','#ef4444','#06b6d4','#8b5cf6','#ec4899','#14b8a6'];
  document.getElementById('genreChart').innerHTML = sorted.map(([genre, count], i) => `
    <div class="genre-bar">
      <span class="genre-name">${genre}</span>
      <div class="genre-track"><div class="genre-fill" style="width:${(count/max*100)}%;background:${colors[i%colors.length]}"></div></div>
      <span class="genre-count">${count}</span>
    </div>`).join('');
}

// ===== REPORTS =====
function drawCharts() {
  drawCheckoutChart();
  drawGenrePie();
  renderTopBooks();
}

function drawCheckoutChart() {
  const canvas = document.getElementById('checkoutChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth || 400;
  canvas.height = 220;
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  const months = ['May','Jun','Jul','Aug','Sep','Oct'];
  const data = [28, 35, 22, 41, 38, 55];
  const max = Math.max(...data);
  const pad = { t: 20, r: 20, b: 40, l: 40 };
  const cW = W - pad.l - pad.r, cH = H - pad.t - pad.b;
  // Grid lines
  ctx.strokeStyle = '#e5e7eb'; ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad.t + (cH / 4) * i;
    ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(pad.l + cW, y); ctx.stroke();
    ctx.fillStyle = '#9ca3af'; ctx.font = '11px Inter'; ctx.textAlign = 'right';
    ctx.fillText(Math.round(max - (max/4)*i), pad.l - 5, y + 4);
  }
  // Bars
  const bw = (cW / months.length) * 0.5;
  const gap = (cW / months.length) * 0.5;
  months.forEach((m, i) => {
    const x = pad.l + i * (bw + gap) + gap/2;
    const bh = (data[i] / max) * cH;
    const y = pad.t + cH - bh;
    // Gradient bar
    const grad = ctx.createLinearGradient(0, y, 0, y + bh);
    grad.addColorStop(0, '#6366f1'); grad.addColorStop(1, '#a5b4fc');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(x, y, bw, bh, 4) : ctx.rect(x, y, bw, bh);
    ctx.fill();
    // Label
    ctx.fillStyle = '#6b7280'; ctx.font = '11px Inter'; ctx.textAlign = 'center';
    ctx.fillText(m, x + bw/2, H - pad.b + 16);
    ctx.fillStyle = '#1f2937'; ctx.font = 'bold 11px Inter';
    ctx.fillText(data[i], x + bw/2, y - 5);
  });
}

function drawGenrePie() {
  const canvas = document.getElementById('genrePieChart');
  if (!canvas) return;
  canvas.width = canvas.offsetWidth || 400;
  canvas.height = 220;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  const counts = {};
  DB.books.forEach(b => { counts[b.genre] = (counts[b.genre] || 0) + 1; });
  const entries = Object.entries(counts);
  const total = entries.reduce((s, [,v]) => s+v, 0);
  const colors = ['#6366f1','#10b981','#f59e0b','#ef4444','#06b6d4','#8b5cf6','#ec4899','#14b8a6'];
  const cx = W * 0.35, cy = H / 2, r = Math.min(H,W*0.7) * 0.4;
  let start = -Math.PI / 2;
  entries.forEach(([genre, count], i) => {
    const angle = (count / total) * Math.PI * 2;
    ctx.beginPath(); ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, start + angle);
    ctx.closePath(); ctx.fillStyle = colors[i % colors.length]; ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
    start += angle;
  });
  // Inner circle (donut)
  ctx.beginPath(); ctx.arc(cx, cy, r * 0.55, 0, Math.PI*2);
  ctx.fillStyle = '#fff'; ctx.fill();
  ctx.fillStyle = '#374151'; ctx.font = 'bold 14px Outfit'; ctx.textAlign = 'center';
  ctx.fillText(total, cx, cy); ctx.font = '11px Inter'; ctx.fillStyle = '#9ca3af';
  ctx.fillText('books', cx, cy + 15);
  // Legend
  const lx = W * 0.65, ly = 20;
  entries.slice(0,6).forEach(([genre, count], i) => {
    const y = ly + i * 22;
    ctx.fillStyle = colors[i%colors.length];
    ctx.fillRect(lx, y + 2, 12, 12);
    ctx.fillStyle = '#374151'; ctx.font = '12px Inter'; ctx.textAlign = 'left';
    ctx.fillText(`${genre} (${count})`, lx + 18, y + 13);
  });
}

function renderTopBooks() {
  const tbody = document.getElementById('topBooksBody');
  const sorted = [...DB.books].sort((a,b) => b.borrowed - a.borrowed).slice(0, 8);
  tbody.innerHTML = sorted.map((b, i) => `
    <tr>
      <td><span style="font-weight:800;color:${['#f59e0b','#9ca3af','#cd7c2f'][i]||'#6b7280'}">#${i+1}</span></td>
      <td><strong>${b.emoji} ${b.title}</strong></td>
      <td>${b.author}</td>
      <td><span class="member-tag">${b.genre}</span></td>
      <td><strong>${b.borrowed}</strong></td>
      <td>⭐ ${b.rating}</td>
    </tr>`).join('');
}

function exportReport() {
  const rows = [['Rank','Title','Author','Genre','Times Borrowed','Rating']];
  [...DB.books].sort((a,b)=>b.borrowed-a.borrowed).forEach((b,i) => {
    rows.push([i+1, b.title, b.author, b.genre, b.borrowed, b.rating]);
  });
  const csv = rows.map(r => r.join(',')).join('\n');
  const a = document.createElement('a');
  a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  a.download = 'library_report.csv';
  a.click();
  toast('Report exported as CSV 📊', 'success');
}

// ===== NEO4J RECOMMENDATIONS =====
const graphData = {
  nodes: [
    { id:'M1', label:'Arjun', type:'member', color:'#6366f1', x:80, y:170 },
    { id:'M2', label:'Priya', type:'member', color:'#ec4899', x:80, y:270 },
    { id:'M3', label:'Divya', type:'member', color:'#8b5cf6', x:80, y:70 },
    { id:'B1', label:'Clean Code', type:'book', color:'#06b6d4', x:250, y:120 },
    { id:'B2', label:'Atomic Habits', type:'book', color:'#10b981', x:250, y:220 },
    { id:'B3', label:'Sapiens', type:'book', color:'#f59e0b', x:400, y:80 },
    { id:'B4', label:'Alchemist', type:'book', color:'#ef4444', x:400, y:260 },
    { id:'B5', label:'Pragmatic Prog.', type:'book', color:'#8b5cf6', x:520, y:170 },
  ],
  edges: [
    { from:'M1', to:'B1' }, { from:'M1', to:'B2' }, { from:'M1', to:'B3' },
    { from:'M2', to:'B2' }, { from:'M2', to:'B4' }, { from:'M2', to:'B1' },
    { from:'M3', to:'B3' }, { from:'M3', to:'B4' }, { from:'M3', to:'B5' },
    { from:'B3', to:'B5' }, { from:'B1', to:'B5' },
  ]
};

function drawGraph() {
  const canvas = document.getElementById('graphCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth || 600;
  canvas.height = 340;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const W = canvas.width, H = canvas.height;
  const scaleX = W / 620, scaleY = H / 340;

  // Draw edges
  ctx.strokeStyle = '#c7d2fe'; ctx.lineWidth = 2;
  graphData.edges.forEach(e => {
    const from = graphData.nodes.find(n => n.id === e.from);
    const to = graphData.nodes.find(n => n.id === e.to);
    if (!from || !to) return;
    ctx.beginPath();
    ctx.moveTo(from.x * scaleX, from.y * scaleY);
    ctx.lineTo(to.x * scaleX, to.y * scaleY);
    ctx.stroke();
  });

  // Draw nodes
  graphData.nodes.forEach(n => {
    const x = n.x * scaleX, y = n.y * scaleY;
    const r = n.type === 'member' ? 22 : 18;
    // Shadow
    ctx.shadowColor = n.color + '66'; ctx.shadowBlur = 12;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2);
    ctx.fillStyle = n.color; ctx.fill();
    ctx.shadowBlur = 0;
    // Icon
    ctx.fillStyle = '#fff'; ctx.font = `bold ${n.type==='member'?11:10}px Inter`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(n.type === 'member' ? '👤' : '📚', x, y);
    // Label
    ctx.fillStyle = '#374151'; ctx.font = '10px Inter'; ctx.textBaseline = 'top';
    ctx.fillText(n.label, x, y + r + 4);
  });

  // Legend
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#6366f1'; ctx.beginPath(); ctx.arc(20, 20, 8, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#374151'; ctx.font = '12px Inter'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
  ctx.fillText('Member', 34, 20);
  ctx.fillStyle = '#06b6d4'; ctx.beginPath(); ctx.arc(100, 20, 8, 0, Math.PI*2); ctx.fill();
  ctx.fillText('Book', 114, 20);
  ctx.fillStyle = '#c7d2fe'; ctx.fillRect(170, 15, 30, 2);
  ctx.fillStyle = '#374151'; ctx.fillText('BORROWED', 206, 20);
}

function populateRecSelect() {
  const sel = document.getElementById('recMemberSelect');
  sel.innerHTML = '<option value="">-- Choose a member --</option>' +
    DB.members.filter(m => m.status === 'Active').map(m =>
      `<option value="${m.id}">${m.name}</option>`).join('');
}

function showRecommendations() {
  const memberId = document.getElementById('recMemberSelect').value;
  const grid = document.getElementById('recGrid');
  if (!memberId) {
    grid.innerHTML = '<div class="rec-placeholder">Select a member to see personalized book recommendations</div>';
    return;
  }
  const member = DB.members.find(m => m.id === memberId);
  const borrowed = DB.transactions.filter(t => t.memberId === memberId).map(t => t.bookId);
  const borrowedGenres = [...new Set(borrowed.map(bid => DB.books.find(b=>b.id===bid)?.genre).filter(Boolean))];

  // Simulate Neo4j collaborative filtering
  const candidates = DB.books.filter(b => !borrowed.includes(b.id) && b.available > 0);
  const scored = candidates.map(b => {
    let score = 0;
    if (borrowedGenres.includes(b.genre)) score += 40;
    score += b.rating * 8;
    score += Math.min(b.borrowed, 30);
    score += Math.random() * 10;
    return { ...b, score: Math.round(score) };
  }).sort((a,b) => b.score - a.score).slice(0, 6);

  if (!scored.length) {
    grid.innerHTML = '<div class="rec-placeholder">No recommendations available</div>';
    return;
  }

  const reasons = [
    `Similar genre to your reads`,
    `Popular among similar members`,
    `Highly rated in your genre`,
    `Trending this month`,
    `Matches your reading pattern`,
    `Graph similarity score high`,
  ];

  grid.innerHTML = scored.map((b, i) => `
    <div class="rec-card">
      <span class="rec-score">Score: ${b.score}</span>
      <span class="rec-book-emoji">${b.emoji}</span>
      <div class="rec-title">${b.title}</div>
      <div class="rec-author">by ${b.author}</div>
      <div style="display:flex;gap:6px;margin-top:8px;flex-wrap:wrap">
        <span class="member-tag">${b.genre}</span>
        <span style="font-size:11px;font-weight:700">⭐ ${b.rating}</span>
      </div>
      <div class="rec-reason">🔗 ${reasons[i % reasons.length]}</div>
    </div>`).join('');
}

// ===== MODALS =====
function openModal(id) {
  const el = document.getElementById(id);
  el.classList.add('open');
  el.style.display = 'flex';
  if (id === 'issueBookModal') { populateMemberSelects(); populateBookSelect(); }
  if (id === 'returnBookModal') { populateReturnSelect(); }
}

function closeModal(id) {
  const el = document.getElementById(id);
  el.classList.remove('open');
  el.style.display = 'none';
}

// Close modal on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal(overlay.id);
  });
});

// Return modal fine calculator
document.getElementById('returnTrans')?.addEventListener('change', function() {
  const t = DB.transactions.find(t => t.id === this.value);
  const preview = document.getElementById('finePreview');
  if (!t || !this.value) { preview.style.display = 'none'; return; }
  const retDate = document.getElementById('returnDate').value || fmtDate(today);
  const days = Math.max(0, Math.floor((new Date(retDate) - new Date(t.dueDate)) / (1000*60*60*24)));
  const fine = days * 5;
  if (fine > 0) {
    document.getElementById('fineAmount').textContent = `₹${fine} (${days} days × ₹5)`;
    preview.style.display = 'flex';
  } else {
    preview.style.display = 'none';
  }
});

// ===== GLOBAL SEARCH =====
document.getElementById('globalSearch')?.addEventListener('input', function() {
  const q = this.value.toLowerCase();
  if (!q) return;
  const bookMatch = DB.books.filter(b => b.title.toLowerCase().includes(q));
  const memberMatch = DB.members.filter(m => m.name.toLowerCase().includes(q));
  if (bookMatch.length > 0) { showPage('books'); document.getElementById('bookSearch').value = q; filterBooks(); }
  else if (memberMatch.length > 0) { showPage('members'); document.getElementById('memberSearch').value = q; filterMembers(); }
});

// ===== TOAST =====
function toast(msg, type = 'info') {
  const container = document.getElementById('toastContainer');
  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span class="toast-icon">${icons[type]||'ℹ️'}</span><span>${msg}</span>`;
  container.appendChild(el);
  setTimeout(() => {
    el.classList.add('toast-out');
    setTimeout(() => el.remove(), 300);
  }, 3500);
}

// ===== UTILS =====
function clearForm(ids) { ids.forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; }); }

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => closeModal(m.id));
  }
});

// Handle window resize for charts
window.addEventListener('resize', () => {
  const active = document.querySelector('.content-section.active');
  if (active?.id === 'section-reports') drawCharts();
  if (active?.id === 'section-recommendations') drawGraph();
});
