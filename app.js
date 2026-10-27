const entityDefinitions = {
  customers: {
    table: 'customers', title: 'Pelanggan', eyebrow: 'DATA PELANGGAN',
    fields: [
      { name: 'full_name', label: 'Nama lengkap', required: true },
      { name: 'phone', label: 'Nomor telepon', type: 'tel' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'address', label: 'Alamat', type: 'textarea', wide: true }
    ],
    columns: [{ key: 'full_name', label: 'Nama pelanggan', primary: true }, { key: 'phone', label: 'Telepon' }, { key: 'email', label: 'Email' }, { key: 'address', label: 'Alamat' }]
  },
  services: {
    table: 'services', title: 'Layanan & produk', eyebrow: 'KATALOG',
    fields: [
      { name: 'name', label: 'Nama layanan / produk', required: true },
      { name: 'product_code', label: 'Kode produk (opsional)', placeholder: 'Contoh: SKU-001', maxLength: 120 },
      { name: 'category', label: 'Kategori', type: 'select', options: ['Jasa', 'Produk'], required: true },
      { name: 'brand', label: 'Merek', type: 'select', options: ['GUCCI', 'PEDRO', 'HUSH PUPPIES', 'LACOSTE', 'LOUIS VUITTON', 'PRADA', 'CHANEL', 'DIOR', 'HERMÈS', 'FENDI', 'BURBERRY', 'VALENTINO', 'Lainnya'] },
      { name: 'product_type', label: 'Jenis katalog', type: 'select', options: ['Sepatu', 'Tas', 'Pakaian', 'Aksesori', 'Lainnya'] },
      { name: 'price', label: 'Harga (Rp)', type: 'number', min: 0, step: '0.01', required: true },
      { name: 'product_image', label: 'Upload foto produk', type: 'file', wide: true },
      { name: 'image_url', label: 'URL foto alternatif (opsional)', type: 'url', placeholder: 'https://...', wide: true },
      { name: 'description', label: 'Deskripsi', type: 'textarea', wide: true },
      { name: 'is_active', label: 'Aktif ditawarkan', type: 'checkbox', defaultValue: true }
    ],
    columns: [{ key: 'name', label: 'Nama', primary: true }, { key: 'product_code', label: 'Kode produk' }, { key: 'brand', label: 'Merek' }, { key: 'product_type', label: 'Jenis katalog' }, { key: 'category', label: 'Tipe data' }, { key: 'price', label: 'Harga', format: 'currency' }, { key: 'description', label: 'Deskripsi' }, { key: 'is_active', label: 'Status', format: 'active' }]
  },
  transactions: {
    table: 'transactions', title: 'Transaksi', eyebrow: 'PENJUALAN',
    fields: [
      { name: 'customer_id', label: 'Pelanggan', type: 'relation', relation: 'customers', required: true },
      { name: 'transaction_date', label: 'Tanggal transaksi', type: 'date', required: true },
      { name: 'payment_policy', label: 'Ketentuan pembayaran', type: 'select', options: [
        { value: 'flexible', label: 'Pembayaran fleksibel' },
        { value: 'full_before_shipping', label: 'Harus lunas sebelum dikirim' }
      ], defaultValue: 'flexible', required: true },
      { name: 'payment_status', label: 'Status pembayaran otomatis', type: 'computed', defaultValue: 'Belum dibayar' },
      { name: 'service_fee', label: 'Biaya jasa (Rp)', type: 'number', min: 0, step: '0.01', defaultValue: 0 },
      { name: 'amount_paid', label: 'Total pembayaran diterima (Rp)', type: 'computedCurrency', defaultValue: 0 },
      { name: 'new_payment', label: 'Catat pembayaran baru (Rp)', type: 'number', min: 0, step: '0.01', defaultValue: 0 },
      { name: 'notes', label: 'Catatan', type: 'textarea', wide: true }
    ],
    columns: [{ key: 'id', label: 'No. transaksi', primary: true, format: 'transaction' }, { key: 'customer_id', label: 'Pelanggan', format: 'customer' }, { key: 'transaction_date', label: 'Tanggal', format: 'date' }, { key: 'order_status', label: 'Status pesanan', format: 'orderStatus' }, { key: 'payment_status', label: 'Pembayaran', format: 'status' }, { key: 'service_fee', label: 'Biaya jasa', format: 'currency' }, { key: 'amount_paid', label: 'Dibayar', format: 'currency' }]
  },
  transaction_details: {
    table: 'transaction_details', title: 'Detail transaksi', eyebrow: 'RINCIAN PESANAN',
    fields: [
      { name: 'transaction_id', label: 'Transaksi', type: 'relation', relation: 'transactions', required: true },
      { name: 'service_id', label: 'Layanan / produk', type: 'relation', relation: 'services', required: true },
      { name: 'quantity', label: 'Kuantitas', type: 'number', min: 1, step: 1, defaultValue: 1, required: true },
      { name: 'unit_price', label: 'Harga satuan (Rp)', type: 'number', min: 0, step: '0.01', required: true }
    ],
    columns: [{ key: 'transaction_id', label: 'Transaksi', format: 'transaction' }, { key: 'service_id', label: 'Layanan / produk', format: 'service' }, { key: 'quantity', label: 'Kuantitas' }, { key: 'unit_price', label: 'Harga satuan', format: 'currency' }, { key: 'subtotal', label: 'Subtotal', format: 'currency', primary: true }]
  }
};

const curatedBrands = [
  { name: 'GUCCI', slug: 'gucci', categories: 'LEATHER · READY-TO-WEAR' },
  { name: 'PEDRO', slug: 'pedro', categories: 'FOOTWEAR · ACCESSORIES' },
  { name: 'HUSH PUPPIES', slug: 'hush', categories: 'FOOTWEAR · LIFESTYLE' },
  { name: 'LACOSTE', slug: 'lacoste', categories: 'APPAREL · SPORT LUXURY' },
  { name: 'LOUIS VUITTON', slug: 'lv', categories: 'LEATHER GOODS · MAISON' },
  { name: 'PRADA', slug: 'prada', categories: 'READY-TO-WEAR · ACCESSORIES' },
  { name: 'CHANEL', slug: 'chanel', categories: 'FASHION · ACCESSORIES' },
  { name: 'DIOR', slug: 'dior', categories: 'COUTURE · LEATHER GOODS' },
  { name: 'HERMÈS', slug: 'hermes', categories: 'LEATHER · SILK · LIFESTYLE' },
  { name: 'FENDI', slug: 'fendi', categories: 'LEATHER GOODS · READY-TO-WEAR' },
  { name: 'BURBERRY', slug: 'burberry', categories: 'OUTERWEAR · ACCESSORIES' },
  { name: 'VALENTINO', slug: 'valentino', categories: 'COUTURE · SHOES · BAGS' }
];
const catalogCategories = ['Semua', 'Sepatu', 'Tas', 'Pakaian', 'Aksesori', 'Lainnya'];
const orderStatuses = ['Pesanan dibuat', 'Menunggu konfirmasi', 'Diproses', 'Dikirim / dalam penyelesaian', 'Selesai', 'Dibatalkan'];
const paymentMethods = ['Transfer bank', 'QRIS', 'E-wallet', 'Kartu debit/kredit', 'Tunai'];

const state = {
  activeView: 'dashboard',
  editingId: null,
  data: { customers: [], services: [], transactions: [], transaction_details: [] },
  selectedRows: { customers: new Set(), services: new Set(), transactions: new Set() },
  table: { search: '', filter: 'all', sort: 'id', direction: 'desc' },
  finance: { activeTab: 'journal', accounts: [], entries: [], lines: [], ready: false, error: '', reportData: null },
  catalog: { brand: '', category: 'Semua', search: '', cart: [], page: 0 },
  leaderboard: { period: 'all', customerSort: 'count' },
  invoiceTransactionId: null
};
const currencyFormatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });
const dateFormatter = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
let supabaseClient = null;
let toastTimer = null;
let productPreviewUrl = '';
let authMode = 'login';
let currentUserId = '';

document.addEventListener('DOMContentLoaded', initialize);

async function initialize() {
  document.getElementById('today-label').textContent = dateFormatter.format(new Date());
  document.querySelectorAll('[data-view]').forEach((button) => button.addEventListener('click', () => showView(button.dataset.view)));
  document.querySelectorAll('[data-go]').forEach((button) => button.addEventListener('click', () => showView(button.dataset.go)));
  document.getElementById('entity-form').addEventListener('submit', saveEntity);
  document.getElementById('entity-form').addEventListener('input', updatePaymentStatusPreview);
  document.getElementById('entity-form').addEventListener('change', handleProductImageSelection);
  document.getElementById('cancel-edit').addEventListener('click', resetForm);
  document.getElementById('entity-table-body').addEventListener('click', handleTableAction);
  document.getElementById('entity-table-body').addEventListener('change', handleRowSelection);
  document.getElementById('entity-table-head').addEventListener('change', handleSelectAll);
  document.getElementById('bulk-delete-button').addEventListener('click', deleteSelectedRows);
  document.getElementById('clear-selection-button').addEventListener('click', clearSelectedRows);
  document.getElementById('entity-search').addEventListener('input', (event) => {
    state.table.search = event.currentTarget.value.trim().toLocaleLowerCase();
    renderTable(state.activeView, entityDefinitions[state.activeView]);
  });
  document.getElementById('entity-filter').addEventListener('change', (event) => {
    state.table.filter = event.currentTarget.value;
    renderTable(state.activeView, entityDefinitions[state.activeView]);
  });
  document.getElementById('entity-sort').addEventListener('change', (event) => {
    state.table.sort = event.currentTarget.value;
    renderTable(state.activeView, entityDefinitions[state.activeView]);
  });
  document.getElementById('entity-sort-direction').addEventListener('click', (event) => {
    state.table.direction = state.table.direction === 'asc' ? 'desc' : 'asc';
    event.currentTarget.textContent = state.table.direction === 'asc' ? 'Terlama dulu' : 'Terbaru dulu';
    renderTable(state.activeView, entityDefinitions[state.activeView]);
  });
  document.getElementById('brand-wall').addEventListener('click', handleBrandClick);
  document.getElementById('dashboard-products-section').addEventListener('click', handleDashboardProductClick);
  document.getElementById('catalog-products').addEventListener('error', handleCatalogImageError, true);
  document.getElementById('dashboard-products').addEventListener('error', handleCatalogImageError, true);
  document.getElementById('catalog-products').addEventListener('click', handleCatalogProductClick);
  document.getElementById('order-items').addEventListener('click', handleOrderItemClick);
  document.getElementById('order-customer').addEventListener('change', renderOrderDesk);
  document.getElementById('order-service-fee').addEventListener('input', renderOrderDesk);
  document.getElementById('order-payment-policy').addEventListener('change', renderOrderDesk);
  document.getElementById('order-initial-payment').addEventListener('input', renderOrderDesk);
  document.getElementById('catalog-order-form').addEventListener('submit', createCatalogOrder);
  document.getElementById('catalog-close').addEventListener('click', () => document.getElementById('catalog-dialog').close());
  document.getElementById('catalog-categories').addEventListener('click', handleCatalogCategory);
  document.getElementById('catalog-search').addEventListener('input', (event) => {
    state.catalog.search = event.currentTarget.value.trim().toLowerCase();
    renderCatalog();
  });
  document.getElementById('catalog-add-product').addEventListener('click', prepareCatalogProduct);
  document.getElementById('catalog-dialog').addEventListener('click', (event) => {
    if (event.target === event.currentTarget) event.currentTarget.close();
  });
  document.querySelectorAll('[data-finance-tab]').forEach((button) => button.addEventListener('click', () => {
    state.finance.activeTab = button.dataset.financeTab;
    renderFinance();
  }));
  document.getElementById('finance-start').addEventListener('change', renderFinance);
  document.getElementById('finance-end').addEventListener('change', renderFinance);
  document.getElementById('ledger-account').addEventListener('change', renderFinance);
  document.getElementById('leaderboard-period').addEventListener('change', (event) => {
    state.leaderboard.period = event.currentTarget.value;
    renderLeaderboards();
  });
  document.getElementById('leaderboard-customer-sort').addEventListener('change', (event) => {
    state.leaderboard.customerSort = event.currentTarget.value;
    renderLeaderboards();
  });
  document.getElementById('entity-table-body').addEventListener('click', handleOrderTableAction);
  document.getElementById('order-detail-close').addEventListener('click', () => document.getElementById('order-detail-dialog').close());
  document.getElementById('order-detail-invoice').addEventListener('click', () => {
    const id = Number(document.getElementById('order-detail-dialog').dataset.transactionId);
    document.getElementById('order-detail-dialog').close();
    openInvoice(id);
  });
  document.getElementById('order-status-form').addEventListener('submit', saveOrderStatus);
  document.getElementById('invoice-back').addEventListener('click', () => showView('transactions'));
  document.getElementById('invoice-print').addEventListener('click', printInvoice);
  document.getElementById('expense-form').addEventListener('submit', saveExpense);
  document.getElementById('manual-journal-form').addEventListener('submit', saveManualJournal);
  document.getElementById('add-journal-line').addEventListener('click', () => addManualJournalLine());
  document.getElementById('manual-journal-lines').addEventListener('click', removeManualJournalLine);
  document.getElementById('finance-export').addEventListener('click', exportFinanceCsv);
  document.getElementById('finance-print').addEventListener('click', printFinanceReport);
  document.getElementById('auth-form').addEventListener('submit', submitAuth);
  document.getElementById('auth-toggle').addEventListener('click', toggleAuthMode);
  document.getElementById('sign-out-button').addEventListener('click', signOut);

  const today = localDateString(new Date());
  document.getElementById('finance-start').value = '';
  document.getElementById('finance-end').value = today;
  document.getElementById('expense-date').value = today;
  document.getElementById('manual-journal-date').value = today;
  addManualJournalLine();
  addManualJournalLine();
  renderBrandWall();
  renderDashboardProducts();

  if (typeof SUPABASE_URL === 'undefined' || typeof SUPABASE_ANON_KEY === 'undefined' ||
      !SUPABASE_URL || SUPABASE_URL.includes('xxxxxxxx') ||
      !SUPABASE_ANON_KEY || SUPABASE_ANON_KEY === 'isi-anon-key-di-sini') {
    setConnection(false, 'Konfigurasi belum diisi');
    document.getElementById('auth-panel').hidden = false;
    setAuthFeedback('Konfigurasi Supabase belum diisi. Periksa Project URL dan publishable key di frontend/config.js.', true);
    return;
  }
  if (!window.supabase || typeof window.supabase.createClient !== 'function') {
    setConnection(false, 'CDN tidak tersedia');
    document.getElementById('auth-panel').hidden = false;
    setAuthFeedback('Library Supabase gagal dimuat. Periksa koneksi internet, lalu muat ulang halaman.', true);
    return;
  }

  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  document.getElementById('auth-panel').hidden = false;
  setAuthFeedback('Memeriksa sesi akun...', false);
  const { data, error } = await supabaseClient.auth.getSession();
  if (error) {
    setAuthFeedback(`Gagal memeriksa sesi: ${error.message}`, true);
    return;
  }
  supabaseClient.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT' || event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
      window.setTimeout(() => handleSession(session), 0);
    }
  }).data.subscription;
  await handleSession(data.session);
}

async function handleSession(session) {
  const authPanel = document.getElementById('auth-panel');
  const appShell = document.getElementById('app-shell');
  if (!session?.user) {
    currentUserId = '';
    state.data = { customers: [], services: [], transactions: [], transaction_details: [] };
    state.finance = { activeTab: 'journal', accounts: [], entries: [], lines: [], ready: false, error: '', reportData: null };
    appShell.hidden = true;
    authPanel.hidden = false;
    setConnection(false, 'Belum masuk');
    setAuthFeedback('Masuk atau daftar untuk membuka workspace Anda.', false);
    return;
  }
  if (currentUserId === session.user.id && !appShell.hidden) return;
  if (currentUserId !== session.user.id) {
    state.data = { customers: [], services: [], transactions: [], transaction_details: [] };
    state.finance = { activeTab: 'journal', accounts: [], entries: [], lines: [], ready: false, error: '', reportData: null };
    state.selectedRows = { customers: new Set(), services: new Set(), transactions: new Set() };
  }
  currentUserId = session.user.id;
  authPanel.hidden = true;
  appShell.hidden = false;
  setConnection(false, 'Memuat workspace');
  await Promise.all([refreshData(), refreshFinanceData()]);
}

function toggleAuthMode() {
  authMode = authMode === 'login' ? 'signup' : 'login';
  document.getElementById('auth-title').textContent = authMode === 'login' ? 'Masuk ke workspace Anda' : 'Buat workspace baru';
  document.getElementById('auth-submit').textContent = authMode === 'login' ? 'Masuk' : 'Daftar';
  document.getElementById('auth-password').autocomplete = authMode === 'login' ? 'current-password' : 'new-password';
  document.getElementById('auth-toggle').textContent = authMode === 'login' ? 'Belum punya akun? Daftar' : 'Sudah punya akun? Masuk';
  setAuthFeedback('', false);
}

async function submitAuth(event) {
  event.preventDefault();
  const email = document.getElementById('auth-email').value.trim().toLocaleLowerCase();
  const password = document.getElementById('auth-password').value;
  const button = document.getElementById('auth-submit');
  button.disabled = true;
  setAuthFeedback(authMode === 'login' ? 'Memeriksa akun...' : 'Membuat workspace...', false);
  try {
    const result = authMode === 'login'
      ? await supabaseClient.auth.signInWithPassword({ email, password })
      : await supabaseClient.auth.signUp({ email, password });
    if (result.error) throw result.error;
    if (authMode === 'signup' && !result.data.session) {
      setAuthFeedback('Akun dibuat. Periksa email untuk mengonfirmasi alamat sebelum masuk.', false);
    } else if (authMode === 'login') {
      setAuthFeedback('Berhasil masuk. Memuat workspace...', false);
    }
  } catch (error) {
    setAuthFeedback(`Tidak dapat ${authMode === 'login' ? 'masuk' : 'mendaftar'}: ${error.message || 'periksa email, kata sandi, dan koneksi.'}`, true);
  } finally {
    button.disabled = false;
  }
}

async function signOut() {
  try {
    const { error } = await supabaseClient.auth.signOut();
    if (error) showToast(`Gagal keluar: ${error.message}`, true);
  } catch (error) {
    showToast(`Gagal keluar: ${error.message || 'periksa koneksi.'}`, true);
  }
}

function setAuthFeedback(message, isError) {
  const feedback = document.getElementById('auth-feedback');
  if (!feedback) return;
  feedback.textContent = message;
  feedback.classList.toggle('error', isError);
}

async function fetchAllRows(table) {
  const rows = [];
  const pageSize = 1000;
  for (let offset = 0; ; offset += pageSize) {
    const { data, error } = await supabaseClient
      .from(table)
      .select('*')
      .order('id', { ascending: true })
      .range(offset, offset + pageSize - 1);
    if (error) throw error;
    const page = data || [];
    rows.push(...page);
    if (page.length < pageSize) return rows;
  }
}

async function refreshData() {
  try {
    const entityKeys = Object.keys(entityDefinitions).filter((key) => key !== 'transaction_details');
    const results = await Promise.all(entityKeys.map((key) => fetchAllRows(entityDefinitions[key].table)));
    entityKeys.forEach((key, index) => {
      state.data[key] = results[index].sort((a, b) => Number(b.id) - Number(a.id));
      if (state.selectedRows[key]) {
        const visibleIds = new Set(state.data[key].map((record) => record.id));
        state.selectedRows[key] = new Set([...state.selectedRows[key]].filter((id) => visibleIds.has(id)));
      }
    });
    state.data.transaction_details = state.data.transactions.flatMap((transaction) =>
      (Array.isArray(transaction.details) ? transaction.details : []).map((detail) => ({
        ...detail,
        transaction_id: transaction.id
      }))
    );
    renderBrandWall();
    renderDashboardProducts();
    setConnection(true, 'Terhubung ke Supabase');
    hidePageError();
    renderDashboard();
    if (state.activeView !== 'dashboard') renderEntity(state.activeView);
    if (state.activeView === 'finance') renderFinance();
  } catch (error) {
    setConnection(false, 'Koneksi bermasalah');
    showPageError(`Tidak dapat membaca data Supabase: ${error.message || 'periksa URL, publishable key, koneksi, skema, dan kebijakan akses.'}`);
  }
}

async function refreshFinanceData() {
  if (!supabaseClient) return;
  try {
    const records = await fetchAllRows('finance_records');
    state.finance.accounts = records.filter((record) => record.record_type === 'account').map((record) => ({
      id: record.account_code,
      code: record.account_code,
      name: record.account_code === '2202' ? 'Kewajiban pesanan belum selesai' : record.account_name,
      account_type: record.account_type
    })).sort((a, b) => a.code.localeCompare(b.code));
    const requiredAccountCodes = ['1001', '1101', '2201', '2202', '4001', '4101'];
    const missingAccountCodes = requiredAccountCodes.filter((code) => !state.finance.accounts.some((account) => account.code === code));
    if (missingAccountCodes.length) {
      throw new Error(`Akun keuangan belum lengkap (${missingAccountCodes.join(', ')}). Jalankan skrip backend/database.sql yang sudah diperbarui di Supabase SQL Editor; skrip ini tidak menghapus data pelanggan, layanan, atau transaksi.`);
    }
    state.finance.entries = records.filter((record) => record.record_type === 'journal').map((record) => ({
      id: record.id,
      entry_date: record.entry_date,
      reference: record.reference,
      description: record.description,
      lines: Array.isArray(record.lines) ? record.lines : []
    })).sort((a, b) => String(b.entry_date).localeCompare(String(a.entry_date)));
    state.finance.lines = state.finance.entries.flatMap((entry) => entry.lines.map((line) => ({
      journal_entry_id: entry.id,
      account_id: line.account_code,
      description: line.description,
      debit: line.debit,
      credit: line.credit
    })));
    state.finance.ready = true;
    state.finance.error = '';
  } catch (error) {
    state.finance.ready = false;
    state.finance.error = error.message || 'Tabel akuntansi belum tersedia.';
  }
  if (state.activeView === 'finance') renderFinance();
}

function showView(view) {
  if (view !== 'dashboard' && view !== 'finance' && view !== 'invoice' && !entityDefinitions[view]) return;
  state.activeView = view;
  document.querySelectorAll('[data-view]').forEach((button) => button.classList.toggle('active', button.dataset.view === view));
  document.getElementById('view-dashboard').hidden = view !== 'dashboard';
  document.getElementById('view-entity').hidden = view === 'dashboard' || view === 'finance' || view === 'invoice';
  document.getElementById('view-finance').hidden = view !== 'finance';
  document.getElementById('view-invoice').hidden = view !== 'invoice';
  document.getElementById('breadcrumb-label').textContent = view === 'dashboard' ? 'Dashboard' : view === 'finance' ? 'Keuangan' : view === 'invoice' ? 'Invoice' : entityDefinitions[view].title;
  if (view === 'finance') renderFinance();
  else if (view !== 'dashboard' && view !== 'invoice') renderEntity(view);
}

function renderDashboard() {
  const received = state.data.transactions.reduce((sum, transaction) => sum + servicePaymentsReceived(transaction), 0);
  const activeTransactions = state.data.transactions.filter((transaction) => transaction.order_status !== 'Dibatalkan');
  const receivables = activeTransactions.reduce((sum, transaction) =>
    sum + Math.max(transactionFinancials(transaction).serviceRevenue - servicePaymentsReceived(transaction), 0), 0);
  const today = localDateString(new Date());
  const monthSales = activeTransactions.reduce((sum, transaction) => {
    const date = transaction.completed_at || (transaction.order_status === 'Selesai' ? transaction.transaction_date : '');
    return date.startsWith(today.slice(0, 7)) ? sum + transactionFinancials(transaction).serviceRevenue : sum;
  }, 0);
  document.getElementById('stat-revenue').textContent = currencyFormatter.format(received);
  document.getElementById('stat-transactions').textContent = state.data.transactions.length.toLocaleString('id-ID');
  document.getElementById('stat-customers').textContent = state.data.customers.length.toLocaleString('id-ID');
  document.getElementById('stat-receivables').textContent = currencyFormatter.format(receivables);
  document.getElementById('stat-month-sales').textContent = currencyFormatter.format(monthSales);
  renderSalesTrend();
  renderLeaderboards();

  const recent = [...state.data.transactions].sort((a, b) => String(b.transaction_date).localeCompare(String(a.transaction_date))).slice(0, 5);
  const body = document.getElementById('recent-transactions');
  if (!recent.length) {
    body.innerHTML = '<tr><td class="empty-row" colspan="6">Belum ada transaksi. Data baru akan muncul di sini.</td></tr>';
    return;
  }
  body.innerHTML = recent.map((transaction) => {
    const customer = state.data.customers.find((item) => item.id === transaction.customer_id);
    return `<tr><td class="table-primary">TRX-${escapeHtml(transaction.id)}</td><td>${escapeHtml(customer?.full_name || 'Pelanggan tidak ditemukan')}</td><td>${formatDate(transaction.transaction_date)}</td><td>${orderStatusBadge(transaction.order_status)}</td><td>${statusBadge(transaction.payment_status)}</td><td class="table-primary">${currencyFormatter.format(servicePaymentsReceived(transaction))}</td></tr>`;
  }).join('');
}

function renderSalesTrend() {
  const now = new Date();
  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - 5 + index, 1);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const total = state.data.transactions.filter((transaction) => transaction.order_status !== 'Dibatalkan').reduce((sum, transaction) => {
      const transactionDate = transaction.transaction_date || String(transaction.created_at || '').slice(0, 10);
      return transactionDate.startsWith(key) ? sum + transactionTotal(transaction) : sum;
    }, 0);
    return { key, label: new Intl.DateTimeFormat('id-ID', { month: 'short' }).format(date), total };
  });
  const maximum = Math.max(...months.map((month) => month.total), 0);
  const compactCurrency = new Intl.NumberFormat('id-ID', { notation: 'compact', maximumFractionDigits: 1 });
  document.getElementById('sales-trend-chart').innerHTML = months.map((month) => {
    const height = maximum > 0 ? Math.max(month.total > 0 ? 4 : 0, month.total / maximum * 100) : 0;
    return `<div class="sales-month" title="${escapeHtml(month.label)} ${escapeHtml(month.key)}: ${currencyFormatter.format(month.total)}">
      <strong class="sales-month-value">Rp ${compactCurrency.format(month.total)}</strong>
      <div class="sales-bar-track"><span class="sales-bar" style="height:${height}%"></span></div>
      <span class="sales-month-label">${escapeHtml(month.label)}</span>
    </div>`;
  }).join('');
}

function getSuccessfulTransactions(period = 'all') {
  const today = localDateString(new Date());
  return state.data.transactions.filter((transaction) => {
    if (transaction.order_status === 'Dibatalkan') return false;
    const date = transaction.transaction_date || String(transaction.created_at || '').slice(0, 10);
    if (period === 'month') return date.startsWith(today.slice(0, 7));
    if (period === 'year') return date.startsWith(today.slice(0, 4));
    return true;
  });
}

function renderLeaderboards() {
  const productRoot = document.getElementById('top-products');
  const customerRoot = document.getElementById('top-customers');
  if (!productRoot || !customerRoot) return;
  const transactions = getSuccessfulTransactions(state.leaderboard.period);
  const productTotals = new Map();
  transactions.forEach((transaction) => {
    const seenInTransaction = new Set();
    (Array.isArray(transaction.details) ? transaction.details : []).forEach((detail) => {
      const service = state.data.services.find((item) => Number(item.id) === Number(detail.service_id));
      if ((detail.category || service?.category) === 'Jasa') return;
      const name = String(detail.service_name || service?.name || 'Produk tidak ditemukan');
      const brand = String(detail.brand || service?.brand || 'Private edit');
      const key = detail.service_id ? `service-${detail.service_id}` : `${brand.toLocaleLowerCase()}|${name.toLocaleLowerCase()}`;
      const quantity = Number(detail.quantity || 0);
      const subtotal = Number(detail.subtotal ?? quantity * Number(detail.unit_price || 0));
      if (!Number.isFinite(quantity) || quantity <= 0 || !Number.isFinite(subtotal) || subtotal < 0) return;
      const current = productTotals.get(key) || {
        name, brand, quantity: 0, amount: 0, transactions: new Set(), image: safeImageUrl(service?.image_url)
      };
      current.quantity += quantity;
      current.amount = roundMoney(current.amount + subtotal);
      if (!seenInTransaction.has(key)) current.transactions.add(transaction.id);
      seenInTransaction.add(key);
      productTotals.set(key, current);
    });
  });
  const products = [...productTotals.values()].sort((a, b) => b.quantity - a.quantity || b.amount - a.amount || a.name.localeCompare(b.name, 'id')).slice(0, 5);
  productRoot.innerHTML = products.length ? products.map((product, index) => `<article class="leaderboard-row product-rank">
    <span class="leaderboard-rank">${index + 1}</span>${product.image ? `<img src="${escapeHtml(product.image)}" alt="" loading="lazy">` : '<span class="leaderboard-photo-placeholder">S</span>'}
    <div class="leaderboard-copy"><strong>${escapeHtml(product.name)}</strong><small>${escapeHtml(product.brand)} · ${product.transactions.size} transaksi</small></div>
    <div class="leaderboard-value"><strong>${product.quantity.toLocaleString('id-ID')} terjual</strong><small>${currencyFormatter.format(product.amount)}</small></div>
  </article>`).join('') : '<p class="leaderboard-empty">Belum ada rincian produk dari pesanan yang berhasil.</p>';

  const customerTotals = new Map();
  getSuccessfulTransactions('all').forEach((transaction) => {
    const customerId = Number(transaction.customer_id);
    const customer = state.data.customers.find((item) => Number(item.id) === customerId);
    if (!customerTotals.has(customerId)) customerTotals.set(customerId, { name: customer?.full_name || 'Pelanggan tidak ditemukan', transactions: new Set(), amount: 0 });
    const current = customerTotals.get(customerId);
    if (!current.transactions.has(transaction.id)) {
      current.transactions.add(transaction.id);
      current.amount = roundMoney(current.amount + transactionTotal(transaction));
    }
  });
  const sortByAmount = state.leaderboard.customerSort === 'amount';
  const customers = [...customerTotals.values()].sort((a, b) =>
    (sortByAmount ? b.amount - a.amount || b.transactions.size - a.transactions.size : b.transactions.size - a.transactions.size || b.amount - a.amount) || a.name.localeCompare(b.name, 'id')
  ).slice(0, 5);
  customerRoot.innerHTML = customers.length ? customers.map((customer, index) => {
    const count = customer.transactions.size;
    const label = count >= 5 ? 'Pelanggan Loyal' : count >= 2 ? 'Pelanggan Aktif' : 'Pelanggan Baru';
    return `<article class="leaderboard-row customer-rank"><span class="leaderboard-rank">${index + 1}</span><span class="customer-avatar">${escapeHtml(customer.name.trim().slice(0, 1).toLocaleUpperCase())}</span>
      <div class="leaderboard-copy"><strong>${escapeHtml(customer.name)}</strong><small>${count} transaksi · <span class="customer-label">${label}</span></small></div>
      <div class="leaderboard-value"><strong>${currencyFormatter.format(customer.amount)}</strong><small>Total pembelian</small></div>
    </article>`;
  }).join('') : '<p class="leaderboard-empty">Belum ada transaksi berhasil untuk ditampilkan.</p>';
}

function renderBrandWall() {
  const brandWall = document.getElementById('brand-wall');
  if (!brandWall) return;
  brandWall.innerHTML = curatedBrands.map((brand, index) => `<li class="brand-item"><button type="button" class="brand-label brand-${brand.slug}" data-brand="${escapeHtml(brand.name)}" aria-label="Buka katalog ${escapeHtml(brand.name)}">
    <span class="brand-number">${String(index + 1).padStart(2, '0')}</span><strong>${escapeHtml(brand.name)}</strong><small>${escapeHtml(brand.categories)}</small>
  </button></li>`).join('');
}

function renderDashboardProducts() {
  const container = document.getElementById('dashboard-products');
  if (!container) return;
  const products = state.data.services
    .filter((product) => product.category === 'Produk' && product.is_active !== false)
    .sort((a, b) => String(a.name).localeCompare(String(b.name), 'id'));
  const pageSize = 12;
  const pageCount = Math.ceil(products.length / pageSize);
  state.catalog.page = Math.min(state.catalog.page, Math.max(pageCount - 1, 0));
  const pageProducts = products.slice(state.catalog.page * pageSize, (state.catalog.page + 1) * pageSize);
  const pageLabel = pageCount
    ? `Halaman ${state.catalog.page + 1} dari ${pageCount}`
    : 'Belum ada produk';
  document.getElementById('dashboard-product-count').textContent =
    `${products.length.toLocaleString('id-ID')} produk tersedia`;
  document.getElementById('dashboard-product-page').textContent = pageLabel;
  document.getElementById('dashboard-product-previous').disabled = state.catalog.page === 0;
  document.getElementById('dashboard-product-next').disabled = state.catalog.page >= pageCount - 1;
  document.getElementById('dashboard-product-empty').hidden = products.length > 0;
  container.innerHTML = pageProducts.map((product) => {
    const imageUrl = safeImageUrl(product.image_url);
    const brand = String(product.brand || '').trim();
    const image = imageUrl
      ? `<img class="dashboard-product-photo" src="${escapeHtml(imageUrl)}" alt="${escapeHtml(product.name)}" data-brand="${escapeHtml(brand || 'SHOPLY')}" loading="lazy">`
      : `<div class="catalog-product-placeholder"><span>FOTO PRODUK</span><strong>${escapeHtml(brand || 'SHOPLY')}</strong><small>UNGGAH FOTO PRODUK</small></div>`;
    return `<article class="dashboard-product-card">
      <div class="dashboard-product-visual">${image}<span class="catalog-product-type">${escapeHtml(product.product_type || 'Produk')}</span></div>
      <div class="dashboard-product-info">
        <span class="catalog-product-brand">${escapeHtml(brand || 'KATALOG SHOPLY')}</span>
        <h3>${escapeHtml(product.name)}</h3>
        <strong>${currencyFormatter.format(Number(product.price || 0))}</strong>
        <button type="button" class="catalog-product-add" data-dashboard-add="${escapeHtml(product.id)}">Pilih barang</button>
      </div>
    </article>`;
  }).join('');
}

function handleDashboardProductClick(event) {
  const pageButton = event.target.closest('[data-dashboard-page]');
  if (pageButton) {
    state.catalog.page = Math.max(0, state.catalog.page + Number(pageButton.dataset.dashboardPage));
    renderDashboardProducts();
    document.getElementById('dashboard-products-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }
  const productButton = event.target.closest('[data-dashboard-add]');
  if (!productButton) return;
  const product = state.data.services.find((item) =>
    String(item.id) === productButton.dataset.dashboardAdd && item.category === 'Produk' && item.is_active !== false
  );
  if (!product) {
    showToast('Produk tidak tersedia. Muat ulang data, lalu coba lagi.', true);
    return;
  }
  const brand = String(product.brand || '').trim();
  state.catalog.brand = brand;
  state.catalog.category = 'Semua';
  state.catalog.search = '';
  document.getElementById('catalog-search').value = '';
  document.getElementById('catalog-brand-name').textContent = brand || 'Produk pilihan';
  document.getElementById('order-feedback').textContent = '';
  document.getElementById('catalog-dialog').showModal();
  addToCatalogOrder(product.id);
  renderCatalog();
}

function handleBrandClick(event) {
  const button = event.target.closest('button[data-brand]');
  if (!button) return;
  state.catalog.brand = button.dataset.brand;
  state.catalog.category = 'Semua';
  state.catalog.search = '';
  document.getElementById('catalog-search').value = '';
  document.getElementById('catalog-brand-name').textContent = button.dataset.brand;
  document.getElementById('order-feedback').textContent = '';
  document.getElementById('catalog-dialog').showModal();
  renderCatalog();
}

function handleCatalogCategory(event) {
  const button = event.target.closest('button[data-catalog-category]');
  if (!button) return;
  state.catalog.category = button.dataset.catalogCategory;
  renderCatalog();
}

function renderCatalog() {
  const categories = document.getElementById('catalog-categories');
  const productContainer = document.getElementById('catalog-products');
  categories.innerHTML = catalogCategories.map((category) => `<button type="button" class="catalog-category${state.catalog.category === category ? ' active' : ''}" data-catalog-category="${escapeHtml(category)}" aria-pressed="${state.catalog.category === category}">${escapeHtml(category)}</button>`).join('');

  const brandProducts = state.data.services.filter((product) => product.category === 'Produk' &&
    String(product.brand || '').trim().toLocaleUpperCase() === state.catalog.brand.toLocaleUpperCase() && product.is_active !== false);
  const matchingProducts = brandProducts.filter((product) => {
    const type = product.product_type || 'Lainnya';
    const matchesCategory = state.catalog.category === 'Semua' || type === state.catalog.category;
    const searchText = `${product.name} ${product.product_code || ''} ${product.description || ''}`.toLocaleLowerCase();
    return matchesCategory && (!state.catalog.search || searchText.includes(state.catalog.search));
  });
  document.getElementById('catalog-count').textContent = `${matchingProducts.length} pilihan · ${brandProducts.length} produk ${state.catalog.brand}`;
  document.getElementById('catalog-empty').hidden = matchingProducts.length > 0;
  productContainer.innerHTML = matchingProducts.map((product) => {
    const imageUrl = safeImageUrl(product.image_url);
    const cartItem = state.catalog.cart.find((item) => item.productId === product.id);
    const image = imageUrl
      ? `<img class="catalog-product-photo" src="${escapeHtml(imageUrl)}" alt="${escapeHtml(product.name)}" data-brand="${escapeHtml(product.brand || state.catalog.brand)}" loading="lazy">`
      : `<div class="catalog-product-placeholder"><span>FOTO MENUNGGU VERIFIKASI</span><strong>${escapeHtml(product.brand || state.catalog.brand)}</strong><small>TAMBAHKAN FOTO PRODUK ASLI</small></div>`;
    return `<article class="catalog-product">
      <div class="catalog-product-visual">${image}<span class="catalog-product-type">${escapeHtml(product.product_type || 'Lainnya')}</span></div>
      <div class="catalog-product-info"><span class="catalog-product-brand">${escapeHtml(product.brand || state.catalog.brand)} · HARGA ESTIMASI</span><h3>${escapeHtml(product.name)}</h3>${product.product_code ? `<small class="catalog-product-code">Kode: ${escapeHtml(product.product_code)}</small>` : ''}<p>${escapeHtml(product.description || 'Curated for your private edit.')}</p><strong>${currencyFormatter.format(Number(product.price || 0))}</strong><button type="button" class="catalog-product-add" data-add-order="${product.id}">${cartItem ? `＋ Tambah lagi · ${cartItem.quantity}` : '＋ Tambah pesanan'}</button></div>
    </article>`;
  }).join('');
  renderOrderDesk();
}

function safeImageUrl(value) {
  if (!value) return '';
  try {
    const url = new URL(value);
    if (url.hostname === 'images.unsplash.com') return '';
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : '';
  } catch {
    return '';
  }
}

function prepareCatalogProduct() {
  const { brand, category } = state.catalog;
  document.getElementById('catalog-dialog').close();
  state.editingId = null;
  showView('services');
  document.getElementById('field-category').value = 'Produk';
  document.getElementById('field-brand').value = brand;
  if (category !== 'Semua') document.getElementById('field-product_type').value = category;
  document.getElementById('entity-form').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function handleCatalogImageError(event) {
  const image = event.target.closest('img.catalog-product-photo, img.dashboard-product-photo');
  if (!image) return;
  const placeholder = document.createElement('div');
  placeholder.className = 'catalog-product-placeholder';
  const label = document.createElement('span');
  label.textContent = 'FOTO PRODUK TIDAK DAPAT DIMUAT';
  const brand = document.createElement('strong');
  brand.textContent = image.dataset.brand || 'SHOPLY';
  const note = document.createElement('small');
  note.textContent = 'PERIKSA URL FOTO PRODUK';
  placeholder.append(label, brand, note);
  image.replaceWith(placeholder);
}

function handleCatalogProductClick(event) {
  const button = event.target.closest('[data-add-order]');
  if (!button) return;
  addToCatalogOrder(Number(button.dataset.addOrder));
}

function addToCatalogOrder(productId) {
  const product = state.data.services.find((item) => item.id === productId && item.category === 'Produk' && item.is_active !== false);
  if (!product) return;
  const cartItem = state.catalog.cart.find((item) => item.productId === productId);
  if (cartItem) {
    if (cartItem.quantity >= 1000) {
      showToast('Kuantitas maksimum per produk adalah 1.000.', true);
      return;
    }
    cartItem.quantity += 1;
  }
  else state.catalog.cart.push({ productId, quantity: 1 });
  renderCatalog();
}

function handleOrderItemClick(event) {
  const button = event.target.closest('[data-order-action]');
  if (!button) return;
  const productId = Number(button.dataset.productId);
  const cartItem = state.catalog.cart.find((item) => item.productId === productId);
  if (!cartItem) return;
  if (button.dataset.orderAction === 'remove' || (button.dataset.orderAction === 'decrease' && cartItem.quantity <= 1)) {
    state.catalog.cart = state.catalog.cart.filter((item) => item.productId !== productId);
  } else if (button.dataset.orderAction === 'decrease') cartItem.quantity -= 1;
  else if (button.dataset.orderAction === 'increase') {
    if (cartItem.quantity >= 1000) {
      showToast('Kuantitas maksimum per produk adalah 1.000.', true);
      return;
    }
    cartItem.quantity += 1;
  }
  renderCatalog();
}

function renderOrderDesk() {
  const customerSelect = document.getElementById('order-customer');
  const selectedCustomer = customerSelect.value;
  const customers = state.data.customers;
  customerSelect.innerHTML = `<option value="">${customers.length ? 'Pilih pelanggan' : 'Tambahkan pelanggan terlebih dahulu'}</option>${customers.map((customer) => `<option value="${customer.id}">${escapeHtml(customer.full_name)}</option>`).join('')}`;
  if (customers.some((customer) => String(customer.id) === selectedCustomer)) customerSelect.value = selectedCustomer;

  const items = state.catalog.cart.map((cartItem) => ({
    ...cartItem,
    product: state.data.services.find((product) => product.id === cartItem.productId)
  })).filter((item) => item.product);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = roundMoney(items.reduce((sum, item) => sum + Number(item.product.price || 0) * item.quantity, 0));
  const fee = roundMoney(Number(document.getElementById('order-service-fee').value || 0));
  const initialPaymentInput = document.getElementById('order-initial-payment');
  const initialPayment = Number(initialPaymentInput.value || 0);
  const orderTotal = roundMoney(subtotal + fee);
  initialPaymentInput.max = String(orderTotal);
  initialPaymentInput.setCustomValidity(initialPayment > orderTotal ? 'Pembayaran awal tidak boleh melebihi total pesanan.' : '');
  document.getElementById('order-item-count').textContent = `${String(itemCount).padStart(2, '0')} ITEM`;
  document.getElementById('order-subtotal').textContent = currencyFormatter.format(subtotal);
  document.getElementById('order-fee-total').textContent = currencyFormatter.format(fee);
  document.getElementById('order-total').textContent = currencyFormatter.format(orderTotal);
  document.getElementById('order-submit').disabled = items.length === 0 || customers.length === 0;

  const orderItems = document.getElementById('order-items');
  if (!items.length) {
    orderItems.innerHTML = '<p class="order-empty">Pilih produk untuk mulai menyusun pesanan.</p>';
    return;
  }
  orderItems.innerHTML = items.map(({ product, quantity }) => `<article class="order-line">
    <div class="order-line-copy"><strong>${escapeHtml(product.name)}</strong><small>${escapeHtml(product.brand || 'Private edit')} · ${currencyFormatter.format(Number(product.price || 0))}</small>${product.product_code ? `<small>Kode: ${escapeHtml(product.product_code)}</small>` : ''}</div>
    <div class="order-line-controls"><button type="button" data-order-action="decrease" data-product-id="${product.id}" aria-label="Kurangi ${escapeHtml(product.name)}">−</button><span>${quantity}</span><button type="button" data-order-action="increase" data-product-id="${product.id}" aria-label="Tambah ${escapeHtml(product.name)}">＋</button><button type="button" class="order-remove" data-order-action="remove" data-product-id="${product.id}" aria-label="Hapus ${escapeHtml(product.name)}">×</button></div>
    <strong class="order-line-total">${currencyFormatter.format(Number(product.price || 0) * quantity)}</strong>
  </article>`).join('');
}

async function createCatalogOrder(event) {
  event.preventDefault();
  const customerId = Number(document.getElementById('order-customer').value);
  const customer = state.data.customers.find((item) => item.id === customerId);
  const cart = state.catalog.cart.map((item) => ({
    ...item,
    product: state.data.services.find((product) => product.id === item.productId)
  })).filter((item) => item.product);
  if (!customer || !cart.length) {
    document.getElementById('order-feedback').textContent = 'Pilih pelanggan dan setidaknya satu produk sebelum membuat pesanan.';
    return;
  }

  const button = document.getElementById('order-submit');
  const serviceFee = roundMoney(Number(document.getElementById('order-service-fee').value || 0));
  const initialPayment = roundMoney(Number(document.getElementById('order-initial-payment').value || 0));
  const paymentMethod = document.getElementById('order-payment-method').value;
  const paymentPolicy = document.getElementById('order-payment-policy').value;
  const totalDue = roundMoney(cart.reduce((sum, item) => sum + Number(item.product.price || 0) * item.quantity, 0) + serviceFee);
  if (!Number.isFinite(serviceFee) || serviceFee < 0 || serviceFee > 9999999999.99 ||
      !Number.isFinite(initialPayment) || initialPayment < 0 || initialPayment > totalDue ||
      !paymentMethods.includes(paymentMethod) ||
      !['flexible', 'full_before_shipping'].includes(paymentPolicy)) {
    document.getElementById('order-feedback').textContent = 'Pilih metode pembayaran yang tersedia dan pastikan biaya jasa serta pembayaran awal valid.';
    return;
  }
  button.disabled = true;
  button.textContent = 'Menyimpan pesanan…';
  try {
    const brandNames = [...new Set(cart.map((item) => item.product.brand).filter(Boolean))];
    const { data, error } = await supabaseClient.from('transactions').insert({
      customer_id: customerId,
      transaction_date: localDateString(new Date()),
      order_status: 'Pesanan dibuat',
      payment_policy: paymentPolicy,
      service_fee: serviceFee,
      payments: initialPayment > 0 ? [{
        id: `pay-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        payment_date: localDateString(new Date()),
        amount: initialPayment,
        method: paymentMethod
      }] : [],
      notes: `Metode pembayaran pilihan: ${paymentMethod}\nPesanan katalog · ${brandNames.join(', ')}`,
      details: cart.map((item, index) => ({
        id: Date.now() + index,
        service_id: item.product.id,
        service_name: item.product.name,
        product_code: item.product.product_code || '',
        brand: item.product.brand || '',
        category: item.product.category,
        quantity: item.quantity,
        unit_price: Number(item.product.price || 0),
        subtotal: roundMoney(Number(item.product.price || 0) * item.quantity)
      }))
    }).select('id').single();
    if (error) throw error;
    document.getElementById('order-feedback').textContent = `Pesanan TRX-${data.id} untuk ${customer.full_name} berhasil dibuat · Total ${currencyFormatter.format(totalDue)} · Dibayar ${currencyFormatter.format(initialPayment)}.`;
    state.catalog.cart = [];
    document.getElementById('order-service-fee').value = '0';
    document.getElementById('order-initial-payment').value = '0';
    document.getElementById('order-payment-method').value = '';
    document.getElementById('order-payment-policy').value = 'flexible';
    showToast(`Pesanan TRX-${data.id} berhasil dibuat.`);
    await Promise.all([refreshData(), refreshFinanceData()]);
    renderCatalog();
  } catch (error) {
    document.getElementById('order-feedback').textContent = `Pesanan belum tersimpan: ${error.message || 'periksa skema transaksi dan koneksi Supabase.'}`;
  } finally {
    button.disabled = false;
    button.innerHTML = 'Buat pesanan <span aria-hidden="true">→</span>';
    renderOrderDesk();
  }
}

function renderFinance() {
  const tabDetails = {
    journal: { title: 'Jurnal umum', eyebrow: 'TAHAP 01 · PENCATATAN' },
    ledger: { title: 'Buku besar', eyebrow: 'TAHAP 02 · PENGELOMPOKAN' },
    'trial-balance': { title: 'Neraca saldo', eyebrow: 'TAHAP 03 · PENGIKHTISARAN' },
    'income-statement': { title: 'Laba rugi', eyebrow: 'TAHAP 04 · PELAPORAN' }
  };
  const tab = tabDetails[state.finance.activeTab] ? state.finance.activeTab : 'journal';
  state.finance.activeTab = tab;
  document.querySelectorAll('[data-finance-tab]').forEach((button) => button.classList.toggle('active', button.dataset.financeTab === tab));
  document.getElementById('finance-report-title').textContent = tabDetails[tab].title;
  document.getElementById('finance-report-eyebrow').textContent = tabDetails[tab].eyebrow;
  document.getElementById('ledger-account-control').hidden = tab !== 'ledger';

  if (!state.finance.ready) {
    state.finance.reportData = null;
    document.querySelector('.expense-drawer').hidden = true;
    document.querySelector('.manual-journal-drawer').hidden = true;
    document.getElementById('finance-content').innerHTML = `<div class="finance-empty"><strong>Data keuangan belum siap</strong><span>Pastikan skrip backend/database.sql terbaru sudah berhasil dijalankan di Supabase SQL Editor. Baris pelanggan, layanan, dan transaksi tidak dihapus oleh skrip.</span><small>${escapeHtml(state.finance.error)}</small></div>`;
    document.getElementById('balance-indicator').hidden = true;
    ['finance-revenue', 'finance-cash', 'finance-receivables', 'finance-deferred', 'finance-expenses', 'finance-profit']
      .forEach((id) => { document.getElementById(id).textContent = currencyFormatter.format(0); });
    document.getElementById('finance-transaction-count').textContent = '0 transaksi';
    document.getElementById('finance-transaction-rows').innerHTML = '<tr><td class="empty-row" colspan="8">Ringkasan transaksi menunggu data keuangan.</td></tr>';
    return;
  }

  document.querySelector('.expense-drawer').hidden = false;
  document.querySelector('.manual-journal-drawer').hidden = false;
  document.getElementById('balance-indicator').hidden = false;
  populateFinanceSelects();
  const startDate = document.getElementById('finance-start').value;
  const endDate = document.getElementById('finance-end').value;
  const content = document.getElementById('finance-content');
  content.classList.remove('report-enter');
  void content.offsetWidth;
  content.classList.add('report-enter');
  if (startDate && endDate && startDate > endDate) {
    state.finance.reportData = null;
    content.innerHTML = '<div class="finance-empty"><strong>Rentang tanggal tidak valid</strong><span>Tanggal awal harus sama dengan atau sebelum tanggal akhir.</span></div>';
    document.getElementById('finance-transaction-count').textContent = '—';
    document.getElementById('finance-transaction-rows').innerHTML = '<tr><td class="empty-row" colspan="8">Perbaiki rentang tanggal untuk melihat transaksi.</td></tr>';
    return;
  }

  const periodEntries = buildFinanceEntries(startDate, endDate);
  const reportData = buildFinanceReport(tab, startDate, endDate, periodEntries);
  state.finance.reportData = reportData;
  const totals = summarizeJournal(periodEntries);
  const revenue = totals.filter((item) => item.account_type === 'Pendapatan').reduce((sum, item) => sum + item.credit - item.debit, 0);
  const expenses = totals.filter((item) => item.account_type === 'Beban').reduce((sum, item) => sum + item.debit - item.credit, 0);
  const historicalTotals = summarizeJournal(buildFinanceEntries('', endDate));
  const accountBalance = (code) => {
    const account = historicalTotals.find((item) => item.code === code);
    return account ? roundMoney(account.debit - account.credit) : 0;
  };
  const cashReceived = periodEntries
    .filter((entry) => entry.source === 'Pembayaran')
    .flatMap((entry) => entry.lines)
    .filter((line) => line.account?.code === '1001')
    .reduce((sum, line) => sum + line.debit, 0);
  document.getElementById('finance-revenue').textContent = currencyFormatter.format(revenue);
  document.getElementById('finance-cash').textContent = currencyFormatter.format(cashReceived);
  document.getElementById('finance-receivables').textContent = currencyFormatter.format(Math.max(accountBalance('1101'), 0));
  const contractLiability = Math.max(-accountBalance('2201'), 0) + Math.max(-accountBalance('2202'), 0);
  document.getElementById('finance-deferred').textContent = currencyFormatter.format(contractLiability);
  document.getElementById('finance-expenses').textContent = currencyFormatter.format(expenses);
  document.getElementById('finance-profit').textContent = currencyFormatter.format(revenue - expenses);
  renderFinanceTransactions(startDate, endDate);

  const balanceIndicator = document.getElementById('balance-indicator');
  balanceIndicator.hidden = !reportData.isBalancedReport;
  balanceIndicator.classList.toggle('unbalanced', reportData.isBalancedReport && !reportData.isBalanced);
  if (reportData.isBalancedReport) {
    balanceIndicator.innerHTML = `<i></i>${reportData.isBalanced ? 'Seimbang' : `Selisih ${currencyFormatter.format(reportData.difference)}`}`;
  }
  content.innerHTML = renderFinanceReport(reportData);
}

function populateFinanceSelects() {
  const expenseSelect = document.getElementById('expense-account');
  const paymentSelect = document.getElementById('payment-account');
  const ledgerSelect = document.getElementById('ledger-account');
  const oldLedgerValue = ledgerSelect.value;
  const expenseAccounts = state.finance.accounts.filter((account) => account.account_type === 'Beban');
  const paymentAccounts = state.finance.accounts.filter((account) => ['1001', '2101'].includes(account.code));
  const accountLabel = (account) => `${account.code} · ${account.name}`;
  expenseSelect.innerHTML = expenseAccounts.map((account) => `<option value="${account.id}">${escapeHtml(accountLabel(account))}</option>`).join('');
  paymentSelect.innerHTML = paymentAccounts.map((account) => `<option value="${account.id}">${escapeHtml(accountLabel(account))}</option>`).join('');
  ledgerSelect.innerHTML = state.finance.accounts.map((account) => `<option value="${account.id}">${escapeHtml(accountLabel(account))}</option>`).join('');
  if (oldLedgerValue && state.finance.accounts.some((account) => String(account.id) === oldLedgerValue)) ledgerSelect.value = oldLedgerValue;
  document.querySelectorAll('[data-journal-account]').forEach((select) => {
    const oldValue = select.value;
    select.innerHTML = `<option value="">Pilih akun</option>${state.finance.accounts.map((account) =>
      `<option value="${escapeHtml(account.code)}">${escapeHtml(accountLabel(account))} · ${escapeHtml(account.account_type)}</option>`
    ).join('')}`;
    if (state.finance.accounts.some((account) => String(account.code) === oldValue)) select.value = oldValue;
  });
  const defaultExpense = expenseAccounts.find((account) => account.code === '5101');
  if (defaultExpense && !expenseSelect.dataset.initialized) expenseSelect.value = String(defaultExpense.id);
  expenseSelect.dataset.initialized = 'true';
}

function addManualJournalLine() {
  const container = document.getElementById('manual-journal-lines');
  if (!container) return;
  const rowNumber = container.children.length + 1;
  const accountOptions = state.finance.accounts.map((account) =>
    `<option value="${escapeHtml(account.code)}">${escapeHtml(`${account.code} · ${account.name}`)} · ${escapeHtml(account.account_type)}</option>`
  ).join('');
  const row = document.createElement('div');
  row.className = 'manual-journal-line';
  row.innerHTML = `<label class="journal-line-account">Akun<select data-journal-account required><option value="">Pilih akun</option>${accountOptions}</select></label>
    <label>Debit (Rp)<input type="number" data-journal-debit min="0" max="9999999999.99" step="0.01" inputmode="decimal" placeholder="0"></label>
    <label>Kredit (Rp)<input type="number" data-journal-credit min="0" max="9999999999.99" step="0.01" inputmode="decimal" placeholder="0"></label>
    <button type="button" class="journal-line-remove" data-journal-remove aria-label="Hapus baris jurnal ${rowNumber}" title="Hapus baris">×</button>`;
  container.append(row);
}

function removeManualJournalLine(event) {
  const button = event.target.closest('[data-journal-remove]');
  if (!button) return;
  const container = document.getElementById('manual-journal-lines');
  if (container.children.length <= 2) {
    showToast('Jurnal harus memiliki minimal dua baris.', true);
    return;
  }
  button.closest('.manual-journal-line').remove();
  [...container.querySelectorAll('[data-journal-remove]')].forEach((removeButton, index) => {
    removeButton.setAttribute('aria-label', `Hapus baris jurnal ${index + 1}`);
  });
}

function buildFinanceEntries(startDate, endDate) {
  const entries = [];
  const accountByCode = (code) => state.finance.accounts.find((account) => account.code === code);
  const includeDate = (date) => (!startDate || date >= startDate) && (!endDate || date <= endDate);

  state.data.transactions.forEach((transaction) => {
    const entryDate = transaction.transaction_date || String(transaction.created_at || '').slice(0, 10);
    const { serviceRevenue } = transactionFinancials(transaction);
    const totalRevenue = serviceRevenue;
    const customer = state.data.customers.find((item) => item.id === transaction.customer_id);
    let receivable = totalRevenue;
    let advanceBalance = 0;
    const payments = transactionServicePayments(transaction, totalRevenue);
    const cancelled = transaction.order_status === 'Dibatalkan';
    const cancellationReviewRequired = transaction.cancellation_review_required !== false;
    const automaticCancellation = cancelled && !cancellationReviewRequired;
    const cancellationDate = String(transaction.cancelled_at || entryDate).slice(0, 10);
    const addPaymentEntry = (payment, index, paymentDate, amount, toReceivable, advance) => {
      if (!includeDate(paymentDate)) return;
      entries.push({
        date: paymentDate,
        reference: `TRX-${transaction.id} · Pembayaran ${index + 1}`,
        description: `Pembayaran jasa TRX-${transaction.id}${customer ? ` · ${customer.full_name}` : ''}`,
        source: 'Pembayaran',
        lines: [
          createJournalLine(accountByCode('1001'), amount, 0, 'Uang masuk ke kas'),
          createJournalLine(accountByCode('1101'), 0, toReceivable, 'Mengurangi piutang pelanggan'),
          createJournalLine(accountByCode('2201'), 0, advance, 'Uang pelanggan belum menjadi pendapatan')
        ].filter(Boolean)
      });
    };
    payments.forEach(({ payment, index, paymentDate, amount }) => {
      if (paymentDate >= entryDate) return;
      advanceBalance = roundMoney(advanceBalance + amount);
      addPaymentEntry(payment, index, paymentDate, amount, 0, amount);
    });
    if (totalRevenue > 0 && includeDate(entryDate)) {
      entries.push({
        date: entryDate,
        reference: `TRX-${transaction.id}`,
        description: `Tagihan jasa SHOPLY${customer ? ` · ${customer.full_name}` : ''}`,
        source: 'Transaksi',
        lines: [
          createJournalLine(accountByCode('1101'), totalRevenue, 0, 'Pelanggan belum membayar tagihan'),
          createJournalLine(accountByCode('2202'), 0, totalRevenue, 'Tagihan belum menjadi pendapatan')
        ].filter(Boolean)
      });
    }
    const appliedAdvance = roundMoney(Math.min(advanceBalance, receivable));
    advanceBalance = roundMoney(advanceBalance - appliedAdvance);
    receivable = roundMoney(Math.max(receivable - appliedAdvance, 0));
    if (appliedAdvance > 0 && includeDate(entryDate)) {
      entries.push({
        date: entryDate,
        reference: `TRX-${transaction.id}-ADVANCE`,
        description: `Penggunaan uang muka TRX-${transaction.id}${customer ? ` · ${customer.full_name}` : ''}`,
        source: 'Penyesuaian',
        lines: [
          createJournalLine(accountByCode('2201'), appliedAdvance, 0, 'Uang muka pelanggan digunakan'),
          createJournalLine(accountByCode('1101'), 0, appliedAdvance, 'Mengurangi tagihan pelanggan')
        ].filter(Boolean)
      });
    }
    payments.forEach(({ payment, index, paymentDate, amount }) => {
      if (paymentDate < entryDate) return;
      const toReceivable = roundMoney(Math.min(amount, receivable));
      const advance = roundMoney(amount - toReceivable);
      receivable = roundMoney(Math.max(receivable - toReceivable, 0));
      addPaymentEntry(payment, index, paymentDate, amount, toReceivable, advance);
    });
    if ((transaction.order_status === 'Selesai' ||
        (cancelled && cancellationReviewRequired && transaction.completed_at)) && totalRevenue > 0) {
      const recognitionDate = String(transaction.completed_at || entryDate).slice(0, 10);
      if (includeDate(recognitionDate)) {
        entries.push({
          date: recognitionDate,
          reference: `TRX-${transaction.id}-REVENUE`,
          description: `Pengakuan pendapatan TRX-${transaction.id}${customer ? ` · ${customer.full_name}` : ''}`,
          source: 'Penyelesaian pesanan',
          lines: [
            createJournalLine(accountByCode('2202'), totalRevenue, 0, 'Pesanan sudah dipenuhi'),
            createJournalLine(accountByCode('4001'), 0, serviceRevenue, 'Pendapatan jasa')
          ].filter(Boolean)
        });
      }
    }
    if (automaticCancellation && (totalRevenue > 0 || payments.length > 0) &&
        isValidDateInput(cancellationDate) && includeDate(cancellationDate)) {
      const cancellationLines = [
        createJournalLine(accountByCode('2202'), totalRevenue, 0, 'Membatalkan kewajiban pesanan'),
        createJournalLine(accountByCode('1101'), 0, totalRevenue, 'Membatalkan tagihan pelanggan'),
        createJournalLine(accountByCode('1101'), appliedAdvance, 0, 'Membalik penggunaan uang muka'),
        createJournalLine(accountByCode('2201'), 0, appliedAdvance, 'Mengembalikan uang muka ke saldo pelanggan')
      ].filter(Boolean);
      let receivableToRefund = roundMoney(Math.max(totalRevenue - appliedAdvance, 0));
      payments.forEach(({ paymentDate, amount }) => {
        if (paymentDate >= entryDate) return;
        cancellationLines.push(
          createJournalLine(accountByCode('2201'), amount, 0, 'Pengembalian uang muka pelanggan'),
          createJournalLine(accountByCode('1001'), 0, amount, 'Uang dikembalikan kepada pelanggan')
        );
      });
      payments.forEach(({ paymentDate, amount }) => {
        if (paymentDate < entryDate) return;
        const paidFromReceivable = roundMoney(Math.min(amount, receivableToRefund));
        const paidAsAdvance = roundMoney(amount - paidFromReceivable);
        receivableToRefund = roundMoney(Math.max(receivableToRefund - paidFromReceivable, 0));
        cancellationLines.push(
          createJournalLine(accountByCode('1101'), paidFromReceivable, 0, 'Membatalkan pembayaran tagihan'),
          createJournalLine(accountByCode('2201'), paidAsAdvance, 0, 'Membatalkan kelebihan pembayaran'),
          createJournalLine(accountByCode('1001'), 0, amount, 'Uang dikembalikan kepada pelanggan')
        );
      });
      entries.push({
        date: cancellationDate,
        reference: `TRX-${transaction.id}-CANCEL`,
        description: `Pembatalan dan pengembalian dana TRX-${transaction.id}${customer ? ` · ${customer.full_name}` : ''}`,
        source: 'Pembatalan pesanan',
        lines: cancellationLines.filter(Boolean)
      });
    }
  });

  const linesByEntry = new Map();
  state.finance.lines.forEach((line) => {
    if (!linesByEntry.has(line.journal_entry_id)) linesByEntry.set(line.journal_entry_id, []);
    const account = state.finance.accounts.find((item) => item.id === line.account_id);
    linesByEntry.get(line.journal_entry_id).push({
      account,
      debit: Number(line.debit || 0),
      credit: Number(line.credit || 0),
      description: line.description
    });
  });
  state.finance.entries.forEach((entry) => {
    if (!includeDate(entry.entry_date)) return;
    entries.push({
      date: entry.entry_date,
      reference: entry.reference,
      description: entry.description,
      source: 'Jurnal manual',
      lines: linesByEntry.get(entry.id) || []
    });
  });
  entries.forEach((entry, index) => { entry.sequence = index; });
  return entries.sort((a, b) =>
    b.date.localeCompare(a.date) || a.sequence - b.sequence || b.reference.localeCompare(a.reference)
  );
}

function renderFinanceTransactions(startDate, endDate) {
  const rows = state.data.transactions
    .filter((transaction) => {
      const { payments } = transaction;
      const dates = [
        transaction.transaction_date || String(transaction.created_at || '').slice(0, 10),
        transaction.completed_at,
        transaction.cancelled_at,
        ...(Array.isArray(payments) ? payments.map((payment) => payment.payment_date) : [])
      ].filter(Boolean);
      return dates.some((date) => (!startDate || date >= startDate) && (!endDate || date <= endDate));
    })
    .sort((a, b) => String(b.transaction_date || '').localeCompare(String(a.transaction_date || '')) || Number(b.id) - Number(a.id));
  const count = document.getElementById('finance-transaction-count');
  const body = document.getElementById('finance-transaction-rows');
  count.textContent = `${rows.length.toLocaleString('id-ID')} transaksi`;
  if (!rows.length) {
    body.innerHTML = '<tr><td class="empty-row" colspan="8">Belum ada transaksi pada rentang tanggal ini.</td></tr>';
    return;
  }
  body.innerHTML = rows.map((transaction) => {
    const breakdown = transactionFinancials(transaction);
    const serviceAmount = breakdown.serviceRevenue;
    const paid = servicePaymentsReceived(transaction, serviceAmount);
    const cancellationReviewRequired = transaction.cancellation_review_required !== false;
    const receivable = transaction.order_status === 'Dibatalkan' && !cancellationReviewRequired
      ? 0
      : Math.max(roundMoney(serviceAmount - paid), 0);
    const customer = state.data.customers.find((item) => String(item.id) === String(transaction.customer_id));
    const status = orderStatuses.includes(transaction.order_status) ? transaction.order_status : 'Pesanan dibuat';
    const storedPaymentTotal = Array.isArray(transaction.payments)
      ? roundMoney(transaction.payments.reduce((sum, payment) => sum + safeMoney(payment.amount), 0))
      : 0;
    const paymentMismatch = Array.isArray(transaction.payments) && transaction.payments.length > 0 &&
      Math.abs(storedPaymentTotal - safeMoney(transaction.amount_paid)) >= 0.01;
    const accountingStatus = breakdown.invalidDetails > 0
      ? '<span class="finance-warning">Periksa rincian transaksi</span>'
      : serviceAmount <= 0
        ? 'Tidak ada tagihan jasa SHOPLY'
        : status === 'Dibatalkan'
          ? cancellationReviewRequired
            ? '<span class="finance-warning">Batal setelah dikirim/selesai · perlu tinjau</span>'
            : paid > 0
              ? `Refund dicatat · ${formatDate(transaction.cancelled_at)}`
              : `Tagihan dibalik · ${formatDate(transaction.cancelled_at)}`
          : status === 'Selesai'
            ? `Diakui · ${formatDate(transaction.completed_at || transaction.transaction_date)}`
            : 'Menunggu pesanan selesai';
    const paymentNote = paymentMismatch
      ? ` <span class="finance-warning">Riwayat bayar berbeda dari total tersimpan</span>`
      : '';
    return `<tr>
      <td class="table-primary">TRX-${escapeHtml(transaction.id)}</td>
      <td>${formatDate(transaction.transaction_date || String(transaction.created_at || '').slice(0, 10))}</td>
      <td>${escapeHtml(customer?.full_name || 'Pelanggan tidak ditemukan')}</td>
      <td>${orderStatusBadge(status)}</td>
      <td class="money-cell">${currencyFormatter.format(serviceAmount)}</td>
      <td class="money-cell">${status === 'Dibatalkan' && !cancellationReviewRequired && paid > 0
        ? `Dikembalikan ${currencyFormatter.format(paid)}`
        : currencyFormatter.format(paid)}</td>
      <td class="money-cell">${currencyFormatter.format(receivable)}</td>
      <td>${accountingStatus}${paymentNote}</td>
    </tr>`;
  }).join('');
}

function createJournalLine(account, debit, credit, description) {
  const normalizedDebit = roundMoney(debit);
  const normalizedCredit = roundMoney(credit);
  if (!account || (normalizedDebit === 0 && normalizedCredit === 0)) return null;
  return { account, debit: normalizedDebit, credit: normalizedCredit, description };
}

function summarizeJournal(entries) {
  const totals = new Map();
  entries.flatMap((entry) => entry.lines).forEach((line) => {
    if (!line.account) return;
    const current = totals.get(line.account.id) || { ...line.account, debit: 0, credit: 0 };
    current.debit = roundMoney(current.debit + line.debit);
    current.credit = roundMoney(current.credit + line.credit);
    totals.set(line.account.id, current);
  });
  return [...totals.values()].sort((a, b) => a.code.localeCompare(b.code));
}

function buildFinanceReport(tab, startDate, endDate, periodEntries) {
  const titles = {
    journal: 'Jurnal umum',
    ledger: 'Buku besar',
    'trial-balance': 'Neraca saldo',
    'income-statement': 'Laporan laba rugi'
  };
  const report = {
    tab, title: titles[tab], startDate, endDate, generatedAt: new Date(),
    isBalancedReport: tab === 'journal' || tab === 'trial-balance',
    isBalanced: true, difference: 0, rows: [], csvHeaders: [], csvRows: []
  };
  if (tab === 'journal') {
    report.rows = periodEntries.flatMap((entry) => entry.lines.map((line) => ({ entry, line })));
    report.totalDebit = report.rows.reduce((sum, row) => sum + row.line.debit, 0);
    report.totalCredit = report.rows.reduce((sum, row) => sum + row.line.credit, 0);
    report.difference = Math.abs(report.totalDebit - report.totalCredit);
    report.isBalanced = report.difference < 0.01;
    report.csvHeaders = ['Tanggal', 'Referensi', 'Keterangan', 'Sumber', 'Kode akun', 'Nama akun', 'Jenis akun', 'Debit', 'Kredit'];
    report.csvRows = report.rows.map(({ entry, line }) => [
      entry.date, entry.reference, entry.description, entry.source,
      line.account?.code || '', line.account?.name || '', line.account?.account_type || '',
      line.debit, line.credit
    ]);
    return report;
  }
  if (tab === 'ledger') {
    report.account = state.finance.accounts.find((item) => String(item.id) === document.getElementById('ledger-account').value);
    report.rows = [];
    if (!report.account) return report;
    const entries = buildFinanceEntries('', endDate).sort((a, b) =>
      a.date.localeCompare(b.date) || a.sequence - b.sequence || a.reference.localeCompare(b.reference)
    );
    let balance = 0;
    let openingBalance = 0;
    entries.forEach((entry) => entry.lines.filter((line) => line.account?.id === report.account.id).forEach((line) => {
      if (startDate && entry.date < startDate) {
        openingBalance = roundMoney(openingBalance + line.debit - line.credit);
        balance = openingBalance;
        return;
      }
      balance = roundMoney(balance + line.debit - line.credit);
      report.rows.push({ date: entry.date, reference: entry.reference, description: entry.description, debit: line.debit, credit: line.credit, balance });
    }));
    if (openingBalance) report.rows.unshift({ date: startDate, reference: 'Saldo awal', description: 'Saldo sebelum periode', debit: 0, credit: 0, balance: openingBalance, opening: true });
    report.totalDebit = report.rows.reduce((sum, row) => sum + row.debit, 0);
    report.totalCredit = report.rows.reduce((sum, row) => sum + row.credit, 0);
    report.endingBalance = report.rows.length ? report.rows[report.rows.length - 1].balance : openingBalance;
    report.csvHeaders = ['Tanggal', 'Referensi', 'Keterangan', 'Kode akun', 'Nama akun', 'Debit', 'Kredit', 'Saldo bersih'];
    report.csvRows = report.rows.map((row) => [
      row.date || '', row.reference, row.description, report.account.code, report.account.name,
      row.debit, row.credit, row.balance
    ]);
    return report;
  }
  if (tab === 'trial-balance') {
    const journalTotals = summarizeJournal(buildFinanceEntries('', endDate));
    report.rows = state.finance.accounts.map((account) => {
      const total = journalTotals.find((item) => item.id === account.id) || { debit: 0, credit: 0 };
      const net = roundMoney(total.debit - total.credit);
      return { ...account, debit: total.debit, credit: total.credit, debitBalance: Math.max(net, 0), creditBalance: Math.max(-net, 0) };
    }).sort((a, b) => a.code.localeCompare(b.code));
    report.totalDebit = report.rows.reduce((sum, row) => sum + row.debit, 0);
    report.totalCredit = report.rows.reduce((sum, row) => sum + row.credit, 0);
    report.endingDebit = report.rows.reduce((sum, row) => sum + row.debitBalance, 0);
    report.endingCredit = report.rows.reduce((sum, row) => sum + row.creditBalance, 0);
    report.difference = Math.abs(report.endingDebit - report.endingCredit);
    report.isBalanced = report.difference < 0.01;
    report.csvHeaders = ['Kode akun', 'Nama akun', 'Jenis akun', 'Mutasi debit', 'Mutasi kredit', 'Saldo debit', 'Saldo kredit'];
    report.csvRows = report.rows.map((row) => [row.code, row.name, row.account_type, row.debit, row.credit, row.debitBalance, row.creditBalance]);
    return report;
  }
  const totals = summarizeJournal(periodEntries);
  report.revenues = totals.filter((account) => account.account_type === 'Pendapatan' && account.credit !== account.debit)
    .map((account) => ({ ...account, amount: roundMoney(account.credit - account.debit) }));
  report.expenses = totals.filter((account) => account.account_type === 'Beban' && account.debit !== account.credit)
    .map((account) => ({ ...account, amount: roundMoney(account.debit - account.credit) }));
  report.revenueTotal = report.revenues.reduce((sum, account) => sum + account.amount, 0);
  report.expenseTotal = report.expenses.reduce((sum, account) => sum + account.amount, 0);
  report.netIncome = roundMoney(report.revenueTotal - report.expenseTotal);
  report.csvHeaders = ['Kategori', 'Kode akun', 'Nama akun', 'Jenis akun', 'Nilai'];
  report.csvRows = [
    ...report.revenues.map((account) => ['Pendapatan', account.code, account.name, account.account_type, account.amount]),
    ['Total pendapatan', '', '', '', report.revenueTotal],
    ...report.expenses.map((account) => ['Beban', account.code, account.name, account.account_type, account.amount]),
    ['Total beban', '', '', '', report.expenseTotal],
    [report.netIncome >= 0 ? 'Laba bersih' : 'Rugi bersih', '', '', '', report.netIncome]
  ];
  return report;
}

function renderFinanceReportHeader(report) {
  const period = report.tab === 'trial-balance'
    ? `Kumulatif sampai ${formatDate(report.endDate)}`
    : `${report.startDate ? `${formatDate(report.startDate)} — ` : 'Semua histori — '}${formatDate(report.endDate)}`;
  return `<header class="report-print-header"><div class="report-brand"><span class="report-brand-mark">S</span><div><strong>SHOPLY</strong><small>PRIVATE CLIENT OFFICE · JAKARTA</small></div></div><div class="report-title-block"><p>LAPORAN KEUANGAN</p><h2>${escapeHtml(report.title)}</h2><span>Periode: ${period}</span><small>Tanggal cetak: ${dateFormatter.format(report.generatedAt)}</small></div></header>`;
}

function renderFinanceReport(report) {
  let body = '';
  if (report.tab === 'journal') {
    const rows = report.rows.map(({ entry, line }) => `<tr><td>${formatDate(entry.date)}</td><td class="table-primary">${escapeHtml(entry.reference)}</td><td>${escapeHtml(entry.description)}<small class="finance-cell-note">${escapeHtml(entry.source)}</small></td><td><span class="account-code">${escapeHtml(line.account?.code || '')}</span> ${escapeHtml(line.account?.name || 'Akun tidak ditemukan')}<small class="finance-cell-note">${escapeHtml(line.description)}</small></td><td class="money-cell">${line.debit ? currencyFormatter.format(line.debit) : '—'}</td><td class="money-cell">${line.credit ? currencyFormatter.format(line.credit) : '—'}</td></tr>`).join('');
    body = `<table><thead><tr><th>Tanggal</th><th>Referensi</th><th>Keterangan</th><th>Akun</th><th class="money-cell">Debit</th><th class="money-cell">Kredit</th></tr></thead><tbody>${rows || '<tr><td class="empty-row" colspan="6">Belum ada jurnal pada periode ini.</td></tr>'}</tbody><tfoot><tr><th colspan="4">Total jurnal</th><th class="money-cell">${currencyFormatter.format(report.totalDebit)}</th><th class="money-cell">${currencyFormatter.format(report.totalCredit)}</th></tr></tfoot></table>`;
  } else if (report.tab === 'ledger') {
    if (!report.account) return `${renderFinanceReportHeader(report)}<div class="finance-empty"><strong>Pilih akun</strong><span>Tambahkan bagan akun untuk melihat buku besar.</span></div>`;
    const rows = report.rows.map((row) => `<tr${row.opening ? ' class="opening-row"' : ''}><td>${formatDate(row.date)}</td><td class="table-primary">${escapeHtml(row.reference)}</td><td>${escapeHtml(row.description)}</td><td class="money-cell">${row.debit ? currencyFormatter.format(row.debit) : '—'}</td><td class="money-cell">${row.credit ? currencyFormatter.format(row.credit) : '—'}</td><td class="money-cell balance-cell">${formatSignedBalance(row.balance)}</td></tr>`).join('');
    body = `<p class="report-caption">Akun ${escapeHtml(report.account.code)} · ${escapeHtml(report.account.name)}. Saldo awal membawa posisi sebelum periode.</p><table><thead><tr><th>Tanggal</th><th>Referensi</th><th>Keterangan</th><th class="money-cell">Debit</th><th class="money-cell">Kredit</th><th class="money-cell">Saldo</th></tr></thead><tbody>${rows || '<tr><td class="empty-row" colspan="6">Belum ada mutasi untuk akun ini pada periode tersebut.</td></tr>'}</tbody><tfoot><tr><th colspan="3">Total mutasi / saldo akhir</th><th class="money-cell">${currencyFormatter.format(report.totalDebit)}</th><th class="money-cell">${currencyFormatter.format(report.totalCredit)}</th><th class="money-cell">${report.rows.length ? formatSignedBalance(report.endingBalance) : currencyFormatter.format(0)}</th></tr></tfoot></table>`;
  } else if (report.tab === 'trial-balance') {
    const rows = report.rows.map((account) => `<tr><td class="table-primary">${escapeHtml(account.code)}</td><td>${escapeHtml(account.name)}<small class="finance-cell-note">${escapeHtml(account.account_type)}</small></td><td class="money-cell">${currencyFormatter.format(account.debit)}</td><td class="money-cell">${currencyFormatter.format(account.credit)}</td><td class="money-cell">${account.debitBalance ? currencyFormatter.format(account.debitBalance) : '—'}</td><td class="money-cell">${account.creditBalance ? currencyFormatter.format(account.creditBalance) : '—'}</td></tr>`).join('');
    body = `<p class="report-caption">Neraca saldo kumulatif sampai ${formatDate(report.endDate)}; mencakup seluruh jurnal sejak awal pencatatan.</p><table><thead><tr><th>Kode</th><th>Nama akun</th><th class="money-cell">Mutasi debit</th><th class="money-cell">Mutasi kredit</th><th class="money-cell">Saldo debit</th><th class="money-cell">Saldo kredit</th></tr></thead><tbody>${rows || '<tr><td class="empty-row" colspan="6">Belum ada akun untuk ditampilkan.</td></tr>'}</tbody><tfoot><tr><th colspan="2">Total</th><th class="money-cell">${currencyFormatter.format(report.totalDebit)}</th><th class="money-cell">${currencyFormatter.format(report.totalCredit)}</th><th class="money-cell">${currencyFormatter.format(report.endingDebit)}</th><th class="money-cell">${currencyFormatter.format(report.endingCredit)}</th></tr></tfoot></table>`;
  } else {
    const accountRows = (accounts) => accounts.map((account) => `<tr><td>${escapeHtml(account.code)} · ${escapeHtml(account.name)}</td><td class="money-cell">${currencyFormatter.format(account.amount)}</td></tr>`).join('');
    body = `<div class="income-statement"><table><tbody><tr class="statement-section"><th colspan="2">PENDAPATAN</th></tr>${accountRows(report.revenues) || '<tr><td class="statement-empty" colspan="2">Belum ada pendapatan.</td></tr>'}<tr class="statement-subtotal"><th>Total Pendapatan</th><th class="money-cell">${currencyFormatter.format(report.revenueTotal)}</th></tr><tr class="statement-section"><th colspan="2">BEBAN</th></tr>${accountRows(report.expenses) || '<tr><td class="statement-empty" colspan="2">Belum ada beban yang dicatat.</td></tr>'}<tr class="statement-subtotal"><th>Total Beban</th><th class="money-cell">${currencyFormatter.format(report.expenseTotal)}</th></tr><tr class="statement-profit"><th>${report.netIncome >= 0 ? 'LABA BERSIH' : 'RUGI BERSIH'}</th><th class="money-cell">${currencyFormatter.format(report.netIncome)}</th></tr></tbody></table></div>`;
  }
  return `${renderFinanceReportHeader(report)}${body}`;
}

function csvValue(value) {
  if (typeof value === 'number') return Number.isFinite(value) ? String(value) : '';
  const text = String(value ?? '');
  const safeText = /^[=+\-@]/.test(text) ? `'${text}` : text;
  return `"${safeText.replace(/"/g, '""')}"`;
}

function exportFinanceCsv() {
  const report = state.finance.reportData;
  if (!report || !report.csvHeaders.length) {
    showToast('Tidak ada data laporan untuk diekspor. Periksa filter periode.', true);
    return;
  }
  const csv = [report.csvHeaders, ...report.csvRows].map((row) => row.map(csvValue).join(',')).join('\r\n');
  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `shoply-${report.tab}-${localDateString(new Date())}.csv`;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast('Laporan berhasil diekspor ke CSV.');
}

function printFinanceReport() {
  if (!state.finance.reportData) {
    showToast('Laporan belum siap dicetak.', true);
    return;
  }
  document.body.dataset.printTarget = 'finance';
  document.body.dataset.printReport = state.finance.activeTab;
  window.addEventListener('afterprint', () => {
    delete document.body.dataset.printTarget;
    delete document.body.dataset.printReport;
  }, { once: true });
  window.print();
}

function printInvoice() {
  document.body.dataset.printTarget = 'invoice';
  window.addEventListener('afterprint', () => {
    delete document.body.dataset.printTarget;
  }, { once: true });
  window.print();
}

function formatSignedBalance(balance) {
  if (Math.abs(balance) < 0.01) return currencyFormatter.format(0);
  return `${currencyFormatter.format(Math.abs(balance))} ${balance > 0 ? 'D' : 'K'}`;
}

function roundMoney(value) {
  return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
}

function safeMoney(value) {
  const amount = Number(value);
  return Number.isFinite(amount) && amount >= 0 ? roundMoney(amount) : 0;
}

function transactionPaid(transaction) {
  const payments = Array.isArray(transaction.payments) ? transaction.payments : [];
  const paymentTotal = payments.reduce((sum, payment) => sum + safeMoney(payment.amount), 0);
  return payments.length ? roundMoney(paymentTotal) : safeMoney(transaction.amount_paid);
}

function transactionPaymentMethod(transaction) {
  const payment = Array.isArray(transaction.payments)
    ? transaction.payments.find((item) => paymentMethods.includes(item.method))
    : null;
  if (payment) return payment.method;
  const match = String(transaction.notes || '').match(/^Metode pembayaran pilihan:\s*(.+)$/mi);
  return paymentMethods.includes(match?.[1].trim()) ? match[1].trim() : 'Belum dipilih';
}

function transactionNotes(transaction) {
  return String(transaction.notes || '').replace(/^Metode pembayaran pilihan:.*(?:\r?\n|$)/mi, '').trim();
}

function transactionServicePayments(transaction, serviceAmount = transactionFinancials(transaction).serviceRevenue) {
  const entryDate = transaction.transaction_date || String(transaction.created_at || '').slice(0, 10);
  const storedPayments = Array.isArray(transaction.payments) ? transaction.payments : [];
  const payments = storedPayments.length
    ? storedPayments
    : transactionPaid(transaction) > 0
      ? [{ id: `legacy-${transaction.id}`, payment_date: entryDate, amount: transactionPaid(transaction) }]
      : [];
  const cancelledAutomatically = transaction.order_status === 'Dibatalkan' &&
    transaction.cancellation_review_required === false;
  const cancellationDate = String(transaction.cancelled_at || entryDate).slice(0, 10);
  let remainingServiceAmount = safeMoney(serviceAmount);

  return payments
    .map((payment, index) => ({
      payment,
      index,
      paymentDate: String(payment.payment_date || entryDate).slice(0, 10),
      amount: safeMoney(payment.amount)
    }))
    .sort((a, b) => a.paymentDate.localeCompare(b.paymentDate) || a.index - b.index)
    .flatMap((payment) => {
      if (payment.amount <= 0 || !isValidDateInput(payment.paymentDate) ||
          (cancelledAutomatically && payment.paymentDate > cancellationDate) ||
          remainingServiceAmount <= 0) return [];
      const allocatedAmount = roundMoney(Math.min(payment.amount, remainingServiceAmount));
      remainingServiceAmount = roundMoney(remainingServiceAmount - allocatedAmount);
      return allocatedAmount > 0 ? [{ ...payment, amount: allocatedAmount }] : [];
    });
}

function servicePaymentsReceived(transaction, serviceAmount) {
  return roundMoney(transactionServicePayments(transaction, serviceAmount)
    .reduce((sum, payment) => sum + payment.amount, 0));
}

function transactionFinancials(transaction) {
  let serviceRevenue = safeMoney(transaction.service_fee);
  let productRevenue = 0;
  let invalidDetails = 0;
  const details = Array.isArray(transaction.details) ? transaction.details : [];
  details.forEach((detail) => {
    const quantity = Number(detail.quantity);
    const unitPrice = Number(detail.unit_price);
    if (!Number.isFinite(quantity) || quantity <= 0 ||
        !Number.isFinite(unitPrice) || unitPrice < 0) {
      invalidDetails += 1;
      return;
    }
    const lineTotal = roundMoney(quantity * unitPrice);
    const service = state.data.services.find((item) => String(item.id) === String(detail.service_id));
    if ((detail.category || service?.category) === 'Jasa') serviceRevenue += lineTotal;
    else productRevenue += lineTotal;
  });
  serviceRevenue = roundMoney(serviceRevenue);
  productRevenue = roundMoney(productRevenue);
  return {
    serviceRevenue,
    productRevenue,
    total: roundMoney(serviceRevenue + productRevenue),
    invalidDetails,
    detailCount: details.length
  };
}

function transactionTotal(transaction) {
  return transactionFinancials(transaction).total;
}

function localDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function isValidDateInput(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value || ''))) return false;
  const date = new Date(`${value}T00:00:00`);
  return !Number.isNaN(date.getTime()) && localDateString(date) === value;
}

async function saveExpense(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const amount = roundMoney(Number(formData.get('amount')));
  const entryDate = formData.get('entry_date');
  const description = String(formData.get('description') || '').trim();
  const expenseAccount = state.finance.accounts.find((account) => String(account.id) === formData.get('expense_account_id'));
  const paymentAccount = state.finance.accounts.find((account) => String(account.id) === formData.get('payment_account_id'));
  if (!isValidDateInput(entryDate) || !Number.isFinite(amount) || amount <= 0 || amount > 9999999999.99 ||
      !expenseAccount || !paymentAccount || !description || description.length > 160) {
    showToast('Isi tanggal dan keterangan yang valid, pilih akun, dan masukkan jumlah beban yang sah.', true);
    return;
  }

  const button = document.getElementById('expense-submit');
  button.disabled = true;
  try {
    const lines = [
      { account: expenseAccount, description: 'Pengakuan beban', debit: amount, credit: 0 },
      { account: paymentAccount, description: paymentAccount.code === '2101' ? 'Pembelian secara kredit' : 'Pembayaran beban', debit: 0, credit: amount }
    ].map(({ account, ...line }) => ({
      ...line,
      account_code: account.code,
      account_name: account.name,
      account_type: account.account_type
    }));
    const { error } = await supabaseClient.from('finance_records').insert({
      record_type: 'journal',
      entry_date: entryDate,
      reference: `BEB-${Date.now()}`,
      description,
      lines
    });
    if (error) throw error;

    form.reset();
    document.getElementById('expense-date').value = localDateString(new Date());
    document.querySelector('.expense-drawer').open = false;
    showToast('Beban berhasil dicatat dan masuk ke jurnal.');
    await refreshFinanceData();
  } catch (error) {
    showToast(`Gagal mencatat beban: ${error.message || 'periksa koneksi dan skema database.'}`, true);
  } finally {
    button.disabled = false;
  }
}

async function saveManualJournal(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const date = form.elements.entry_date.value;
  const reference = form.elements.reference.value.trim();
  const description = form.elements.description.value.trim();
  const rows = [...document.querySelectorAll('#manual-journal-lines .manual-journal-line')];
  const accounts = new Map(state.finance.accounts.map((account) => [String(account.code), account]));
  const lines = [];

  if (!isValidDateInput(date)) {
    showToast('Tanggal jurnal tidak valid.', true);
    return;
  }
  if (!reference || reference.length > 80 || !description || description.length > 160) {
    showToast('Referensi wajib diisi (maksimal 80 karakter) dan keterangan maksimal 160 karakter.', true);
    return;
  }
  if (rows.length < 2 || rows.length > 500) {
    showToast('Jurnal harus memiliki 2 sampai 500 baris.', true);
    return;
  }

  let debitTotal = 0;
  let creditTotal = 0;
  for (const row of rows) {
    const account = accounts.get(row.querySelector('[data-journal-account]').value);
    const debitInput = row.querySelector('[data-journal-debit]');
    const creditInput = row.querySelector('[data-journal-credit]');
    const debit = debitInput.value === '' ? 0 : Number(debitInput.value);
    const credit = creditInput.value === '' ? 0 : Number(creditInput.value);
    if (!account || !Number.isFinite(debit) || !Number.isFinite(credit) ||
        debit < 0 || credit < 0 || debit > 9999999999.99 || credit > 9999999999.99 ||
        (debit > 0 && credit > 0) || (debit === 0 && credit === 0)) {
      showToast('Setiap baris wajib memilih akun dan mengisi debit atau kredit (salah satu saja).', true);
      return;
    }
    debitTotal += debit;
    creditTotal += credit;
    lines.push({
      account_code: account.code,
      account_name: account.name,
      account_type: account.account_type,
      description: debit > 0 ? 'Debit jurnal umum' : 'Kredit jurnal umum',
      debit: roundMoney(debit),
      credit: roundMoney(credit)
    });
  }

  debitTotal = roundMoney(debitTotal);
  creditTotal = roundMoney(creditTotal);
  if (debitTotal <= 0 || Math.abs(debitTotal - creditTotal) >= 0.01) {
    showToast(`Jurnal belum seimbang. Debit ${currencyFormatter.format(debitTotal)} · Kredit ${currencyFormatter.format(creditTotal)}.`, true);
    return;
  }

  const button = document.getElementById('manual-journal-submit');
  button.disabled = true;
  button.textContent = 'Menyimpan jurnal...';
  try {
    const { error } = await supabaseClient.from('finance_records').insert({
      record_type: 'journal',
      entry_date: date,
      reference,
      description,
      lines
    });
    if (error) throw error;

    form.reset();
    document.getElementById('manual-journal-date').value = localDateString(new Date());
    document.getElementById('manual-journal-lines').replaceChildren();
    addManualJournalLine();
    addManualJournalLine();
    document.querySelector('.manual-journal-drawer').open = false;
    showToast('Jurnal umum berhasil dicatat.');
    await refreshFinanceData();
  } catch (error) {
    showToast(`Gagal mencatat jurnal: ${error.message || 'periksa referensi, akun, dan koneksi Supabase.'}`, true);
  } finally {
    button.disabled = false;
    button.textContent = 'Simpan jurnal';
  }
}

function renderEntity(key) {
  const definition = entityDefinitions[key];
  if (!definition) return;
  document.getElementById('entity-eyebrow').textContent = definition.eyebrow;
  document.getElementById('entity-title').textContent = definition.title;
  document.getElementById('table-title').textContent = `Daftar ${definition.title.toLowerCase()}`;
  document.getElementById('record-count').textContent = `${state.data[key].length} data`;
  configureTableControls(key, definition);
  renderFormFields(definition);
  renderTable(key, definition);
}

function configureTableControls(key, definition) {
  const filter = document.getElementById('entity-filter');
  const filterOptions = key === 'transactions'
    ? [['all', 'Semua status'], ...['Belum dibayar', 'Sebagian', 'Lunas'].map((value) => [`payment:${value}`, `Pembayaran · ${value}`]), ...orderStatuses.map((value) => [`order:${value}`, `Pesanan · ${value}`])]
    : key === 'services'
      ? [['all', 'Semua tipe'], ['Produk', 'Produk'], ['Jasa', 'Jasa']]
      : [['all', 'Semua data']];
  filter.innerHTML = filterOptions.map(([value, label]) =>
    `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`
  ).join('');
  if (!filterOptions.some(([value]) => value === state.table.filter)) state.table.filter = 'all';
  filter.value = state.table.filter;
  const sort = document.getElementById('entity-sort');
  const sortOptions = definition.columns.filter((column) => column.key !== 'id')
    .map((column) => [column.key, column.label]);
  sort.innerHTML = [['id', 'Terbaru ditambahkan'], ...sortOptions].map(([value, label]) =>
    `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`
  ).join('');
  if (!sortOptions.some(([value]) => value === state.table.sort) && state.table.sort !== 'id') state.table.sort = 'id';
  sort.value = state.table.sort;
  document.getElementById('entity-search').value = state.table.search;
  document.getElementById('entity-sort-direction').textContent = state.table.direction === 'asc' ? 'Terlama dulu' : 'Terbaru dulu';
}

function renderFormFields(definition) {
  const container = document.getElementById('form-fields');
  container.innerHTML = definition.fields.map((field) => {
    const required = field.required ? ' required' : '';
    const wide = field.wide ? ' field-wide' : '';
    const value = field.name === 'new_payment'
      ? field.defaultValue
      : state.editingId !== null
        ? currentRecord(definition.table, state.editingId)?.[field.name]
        : field.defaultValue;
    if (field.type === 'checkbox') {
      return `<div class="field${wide}"><label for="field-${field.name}">${escapeHtml(field.label)}</label><label class="checkbox-control"><input id="field-${field.name}" name="${field.name}" type="checkbox"${value ? ' checked' : ''}> Ya, aktif</label></div>`;
    }
    if (field.type === 'file') {
      const existingImage = state.editingId !== null ? safeImageUrl(currentRecord(definition.table, state.editingId)?.image_url) : '';
      return `<div class="field${wide} upload-field"><label for="field-${field.name}">${escapeHtml(field.label)}</label><input id="field-${field.name}" name="${field.name}" type="file" accept="image/jpeg,image/png,image/webp"><small>JPG, PNG, atau WebP · Maksimal 5 MB · Foto asli produk</small><img id="product-image-preview" class="product-image-preview" src="${escapeHtml(existingImage)}" alt="Foto produk saat ini"${existingImage ? '' : ' hidden'}></div>`;
    }
    if (field.type === 'computed') {
      return `<div class="field${wide}"><label for="field-${field.name}">${escapeHtml(field.label)}</label><input id="field-${field.name}" type="text" value="${escapeHtml(value || 'Belum dibayar')}" readonly aria-live="polite"><small>Status dihitung otomatis dari total tagihan dan pembayaran.</small></div>`;
    }
    if (field.type === 'computedCurrency') {
      return `<div class="field${wide}"><label for="field-${field.name}">${escapeHtml(field.label)}</label><input id="field-${field.name}" type="text" value="${escapeHtml(currencyFormatter.format(Number(value || 0)))}" readonly></div>`;
    }
    if (field.type === 'textarea') {
      return `<div class="field${wide}"><label for="field-${field.name}">${escapeHtml(field.label)}</label><textarea id="field-${field.name}" name="${field.name}"${required}>${escapeHtml(value || '')}</textarea></div>`;
    }
    if (field.type === 'select' || field.type === 'relation') {
      const options = field.type === 'select'
        ? field.options.map((option) => typeof option === 'string' ? { value: option, label: option } : option)
        : relationOptions(field.relation);
      const optionMarkup = options.map((option) => `<option value="${escapeHtml(option.value)}"${String(value ?? '') === String(option.value) ? ' selected' : ''}>${escapeHtml(option.label)}</option>`).join('');
      return `<div class="field${wide}"><label for="field-${field.name}">${escapeHtml(field.label)}</label><select id="field-${field.name}" name="${field.name}"${required}><option value="">Pilih ${escapeHtml(field.label.toLowerCase())}</option>${optionMarkup}</select></div>`;
    }
    const type = field.type || 'text';
    const min = field.min !== undefined ? ` min="${field.min}"` : '';
    const step = field.step ? ` step="${field.step}"` : '';
    const maxLength = field.maxLength !== undefined ? ` maxlength="${field.maxLength}"` : '';
    const placeholder = field.placeholder ? ` placeholder="${escapeHtml(field.placeholder)}"` : '';
    return `<div class="field${wide}"><label for="field-${field.name}">${escapeHtml(field.label)}</label><input id="field-${field.name}" name="${field.name}" type="${type}"${min}${step}${maxLength}${required}${placeholder}${value !== undefined && value !== null ? ` value="${escapeHtml(value)}"` : ''}></div>`;
  }).join('');
  document.getElementById('form-title').textContent = state.editingId === null ? 'Tambah data' : `Ubah data #${state.editingId}`;
  document.getElementById('submit-button').innerHTML = state.editingId === null ? '<span aria-hidden="true">＋</span> Simpan data' : 'Simpan perubahan';
  document.getElementById('cancel-edit').hidden = state.editingId === null;
}

function updatePaymentStatusPreview(event) {
  if (state.activeView !== 'transactions' || !event.target.matches('[name="service_fee"], [name="new_payment"]')) return;
  const form = document.getElementById('entity-form');
  const edited = state.editingId === null ? null : state.data.transactions.find((item) => item.id === state.editingId);
  const due = roundMoney(Number(form.elements.service_fee.value || 0) +
    (edited ? (Array.isArray(edited.details) ? edited.details : []).reduce((sum, detail) =>
      sum + Number(detail.quantity || 0) * Number(detail.unit_price || 0), 0) : 0));
  const paid = roundMoney(transactionPaid(edited || { amount_paid: 0 }) + Number(form.elements.new_payment.value || 0));
  const status = due <= 0 && paid > 0 ? 'Lunas' : due <= 0 || paid <= 0 ? 'Belum dibayar' : paid < due ? 'Sebagian' : 'Lunas';
  document.getElementById('field-payment_status').value = status;
}

function renderTable(key, definition) {
  const canSelect = Boolean(state.selectedRows[key]);
  const selected = canSelect ? state.selectedRows[key] : new Set();
  const search = state.table.search;
  const filterValue = state.table.filter;
  const sortKey = state.table.sort;
  const direction = state.table.direction === 'asc' ? 1 : -1;
  const rows = state.data[key].filter((record) => {
    if (filterValue !== 'all') {
      if (key === 'transactions') {
        const [filterType, ...filterValueParts] = filterValue.split(':');
        const expected = filterValueParts.join(':');
        if (record[filterType === 'order' ? 'order_status' : 'payment_status'] !== expected) return false;
      } else if (record.category !== filterValue) return false;
    }
    if (!search) return true;
    const customerName = key === 'transactions'
      ? state.data.customers.find((customer) => customer.id === record.customer_id)?.full_name || ''
      : '';
    return `${Object.values(record).join(' ')} ${customerName}`.toLocaleLowerCase().includes(search);
  }).sort((a, b) => {
    const left = a[sortKey];
    const right = b[sortKey];
    if (typeof left === 'number' && typeof right === 'number') return (left - right) * direction;
    return String(left ?? '').localeCompare(String(right ?? ''), 'id', { numeric: true }) * direction;
  });
  const editableRows = rows.filter((record) => record.user_id === currentUserId);
  const canSelectVisible = canSelect && editableRows.length > 0;
  document.getElementById('record-count').textContent = search || filterValue !== 'all'
    ? `${rows.length} dari ${state.data[key].length} data`
    : `${rows.length} data`;
  const allVisibleSelected = canSelectVisible && editableRows.every((record) => selected.has(record.id));
  document.getElementById('entity-table-head').innerHTML = `<tr>${canSelectVisible ? `<th class="selection-cell"><input type="checkbox" id="select-all-visible" aria-label="Pilih semua ${escapeHtml(definition.title.toLowerCase())} yang tampil"${allVisibleSelected ? ' checked' : ''}></th>` : ''}${definition.columns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join('')}<th>Aksi</th></tr>`;
  const body = document.getElementById('entity-table-body');
  if (!rows.length) {
    body.innerHTML = `<tr><td class="empty-row" colspan="${definition.columns.length + (canSelectVisible ? 2 : 1)}">${state.data[key].length ? 'Tidak ada data yang cocok dengan pencarian atau filter.' : 'Belum ada data untuk ditampilkan.'}</td></tr>`;
    updateBulkSelectionUi(key);
    return;
  }
  body.innerHTML = rows.map((record) => {
    const cells = definition.columns.map((column) => {
      const content = formatCell(column, record);
      return `<td${column.primary ? ' class="table-primary"' : ''}>${content}</td>`;
    }).join('');
    const isOwned = record.user_id === currentUserId;
    const selectionCell = canSelectVisible
      ? isOwned
        ? `<td class="selection-cell"><input type="checkbox" data-row-select="${record.id}" aria-label="Pilih ${escapeHtml(definition.title.toLowerCase())} ${escapeHtml(record.full_name || record.name || '')}"${selected.has(record.id) ? ' checked' : ''}></td>`
        : '<td class="selection-cell"></td>'
      : '';
    const actions = isOwned
      ? key === 'transactions'
        ? `<button class="action-button" data-order-detail="${record.id}">Detail / status</button><button class="action-button" data-order-invoice="${record.id}">Lihat Invoice</button><button class="action-button" data-action="edit" data-id="${record.id}">Ubah</button><button class="action-button delete" data-action="delete" data-id="${record.id}">Hapus</button>`
        : `<button class="action-button" data-action="edit" data-id="${record.id}">Ubah</button><button class="action-button delete" data-action="delete" data-id="${record.id}">Hapus</button>`
      : '<span class="shared-record-note">Katalog referensi</span>';
    return `<tr>${selectionCell}${cells}<td><div class="action-cell">${actions}</div></td></tr>`;
  }).join('');
  const selectAll = document.getElementById('select-all-visible');
  if (selectAll) selectAll.indeterminate = editableRows.some((record) => selected.has(record.id)) && !allVisibleSelected;
  updateBulkSelectionUi(key);
}

function updateBulkSelectionUi(key) {
  const toolbar = document.getElementById('bulk-actions');
  const selected = state.selectedRows[key];
  toolbar.hidden = !selected || selected.size === 0;
  if (!selected) return;
  document.getElementById('bulk-selection-count').textContent = `${selected.size} dipilih`;
  document.getElementById('bulk-delete-button').textContent = `Hapus ${selected.size} pilihan`;
}

function handleRowSelection(event) {
  const checkbox = event.target.closest('input[data-row-select]');
  const selected = state.selectedRows[state.activeView];
  if (!checkbox || !selected) return;
  const id = Number(checkbox.dataset.rowSelect);
  if (checkbox.checked) selected.add(id);
  else selected.delete(id);
  renderTable(state.activeView, entityDefinitions[state.activeView]);
}

function handleSelectAll(event) {
  const checkbox = event.target.closest('#select-all-visible');
  const selected = state.selectedRows[state.activeView];
  if (!checkbox || !selected) return;
  document.querySelectorAll('#entity-table-body input[data-row-select]').forEach((rowCheckbox) => {
    const id = Number(rowCheckbox.dataset.rowSelect);
    if (checkbox.checked) selected.add(id);
    else selected.delete(id);
  });
  renderTable(state.activeView, entityDefinitions[state.activeView]);
}

function clearSelectedRows() {
  const selected = state.selectedRows[state.activeView];
  if (!selected) return;
  selected.clear();
  renderTable(state.activeView, entityDefinitions[state.activeView]);
}

async function deleteSelectedRows() {
  const key = state.activeView;
  const selected = state.selectedRows[key];
  if (!selected || selected.size === 0) return;
  const records = state.data[key].filter((record) => selected.has(record.id));
  const ownedRecords = records.filter((record) => record.user_id === currentUserId);
  if (ownedRecords.length !== records.length) {
    selected.clear();
    renderTable(key, entityDefinitions[key]);
    showToast('Pilihan tidak lagi sesuai dengan workspace yang aktif. Muat ulang data sebelum menghapus.', true);
    return;
  }
  const blockedRecords = ownedRecords.filter((record) => {
    if (key === 'customers') return state.data.transactions.some((transaction) => Number(transaction.customer_id) === Number(record.id));
    if (key === 'services') return state.data.transaction_details.some((detail) => Number(detail.service_id) === Number(record.id));
    return false;
  });
  const blockedIds = new Set(blockedRecords.map((record) => record.id));
  const deletableRecords = ownedRecords.filter((record) => !blockedIds.has(record.id));
  if (!deletableRecords.length) {
    const message = key === 'customers'
      ? 'Pelanggan yang masih memiliki transaksi tidak dapat dihapus. Hapus transaksi terkait terlebih dahulu.'
      : key === 'services'
        ? 'Produk yang sudah dipakai transaksi tidak dapat dihapus. Ubah statusnya menjadi nonaktif agar histori tetap akurat.'
        : 'Tidak ada data terpilih yang bisa dihapus.';
    showToast(message, true);
    return;
  }
  const labels = deletableRecords.slice(0, 3).map((record) => record.full_name || record.name || `TRX-${record.id}`);
  const preview = labels.join(', ');
  const remainder = deletableRecords.length > labels.length ? ` dan ${deletableRecords.length - labels.length} lainnya` : '';
  const blockedNote = blockedRecords.length
    ? `\n${blockedRecords.length} data yang masih dipakai transaksi akan dilewati dan tetap terpilih.`
    : '';
  const transactionWarning = key === 'transactions'
    ? '\nTransaksi yang dihapus tidak dapat dipulihkan dan akan hilang dari ringkasan serta jurnal otomatis.'
    : '';
  if (!window.confirm(`Hapus ${deletableRecords.length} data terpilih${preview ? ` (${preview}${remainder})` : ''}? Tindakan ini tidak dapat dibatalkan.${transactionWarning}${blockedNote}`)) return;

  const button = document.getElementById('bulk-delete-button');
  button.disabled = true;
  try {
    const ids = deletableRecords.map((record) => record.id);
    const { error } = await supabaseClient.from(entityDefinitions[key].table).delete().in('id', ids);
    if (error) throw error;
    ids.forEach((id) => selected.delete(id));
    if (state.editingId !== null && ids.includes(state.editingId)) resetForm();
    const deletedLabel = key === 'transactions' ? 'transaksi' : 'data';
    showToast(`${ids.length} ${deletedLabel} berhasil dihapus.${blockedRecords.length ? ` ${blockedRecords.length} data tetap dipilih karena masih dipakai transaksi.` : ''}`);
    await Promise.all([refreshData(), refreshFinanceData()]);
  } catch (error) {
    showToast(`Gagal menghapus pilihan: ${error.message || 'sebagian data mungkin masih dipakai transaksi.'}`, true);
  } finally {
    const currentButton = document.getElementById('bulk-delete-button');
    if (currentButton) currentButton.disabled = false;
  }
}

function formatCell(column, record) {
  const value = record[column.key];
  switch (column.format) {
    case 'currency': return currencyFormatter.format(Number(value || 0));
    case 'date': return formatDate(value);
    case 'customer': return escapeHtml(state.data.customers.find((item) => item.id === value)?.full_name || 'Tidak ditemukan');
    case 'service': return escapeHtml(record.service_name || state.data.services.find((item) => item.id === value)?.name || 'Produk tidak ditemukan');
    case 'transaction': return `TRX-${escapeHtml(value)}`;
    case 'status': return statusBadge(value);
    case 'orderStatus': return orderStatusBadge(value);
    case 'active': return value ? 'Aktif' : 'Nonaktif';
    default: return escapeHtml(value ?? '—');
  }
}

function relationOptions(relation) {
  if (relation === 'customers') return state.data.customers.map((item) => ({ value: item.id, label: item.full_name }));
  if (relation === 'services') return state.data.services.map((item) => ({ value: item.id, label: `${item.name} · ${currencyFormatter.format(Number(item.price || 0))}` }));
  if (relation === 'transactions') return state.data.transactions.map((item) => ({ value: item.id, label: `TRX-${item.id} · ${state.data.customers.find((customer) => customer.id === item.customer_id)?.full_name || 'Pelanggan'} · ${formatDate(item.transaction_date)}` }));
  return [];
}

async function saveEntity(event) {
  event.preventDefault();
  const key = state.activeView;
  const definition = entityDefinitions[key];
  if (!definition) return;
  const formData = new FormData(event.currentTarget);
  const payload = {};
  definition.fields.forEach((field) => {
    if (field.type === 'file' || field.type === 'computed') return;
    const rawValue = field.type === 'checkbox' ? formData.has(field.name) : formData.get(field.name);
    if (rawValue === null || rawValue === '') {
      if (field.defaultValue !== undefined) payload[field.name] = field.defaultValue;
      else if (field.type !== 'checkbox') payload[field.name] = null;
      return;
    }
    payload[field.name] = field.type === 'number' || field.type === 'relation' ? Number(rawValue) : rawValue;
  });

  const button = document.getElementById('submit-button');
  button.disabled = true;
  button.textContent = 'Menyimpan...';
  let uploadedImagePath = '';
  try {
    validateEntityPayload(key, payload);
    if (key === 'transactions') {
      const additionalPayment = payload.new_payment;
      delete payload.new_payment;
      const transaction = state.editingId === null
        ? null
        : state.data.transactions.find((item) => item.id === state.editingId);
      if (state.editingId !== null && !transaction) throw new Error('Transaksi yang akan diubah tidak ditemukan.');
      if (transaction?.order_status === 'Dibatalkan') {
        throw new Error('Pesanan yang dibatalkan tidak dapat diubah atau menerima pembayaran baru.');
      }
      payload.order_status = transaction?.order_status || 'Pesanan dibuat';
      const payments = Array.isArray(transaction?.payments) ? [...transaction.payments] : [];
      if (additionalPayment > 0) {
        payments.push({
          id: `pay-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          payment_date: localDateString(new Date()),
          amount: additionalPayment
        });
      }
      payload.payments = payments;
    }
    if (key === 'transaction_details') {
      const transactionId = Number(payload.transaction_id);
      const serviceId = Number(payload.service_id);
      const transaction = state.data.transactions.find((item) => item.id === transactionId);
      if (!transaction) throw new Error('Pilih transaksi yang tersedia.');
      if (transaction.order_status === 'Dibatalkan') {
        throw new Error('Rincian pesanan yang dibatalkan tidak dapat diubah.');
      }
      const details = [...(Array.isArray(transaction.details) ? transaction.details : [])];
      const detailIndex = details.findIndex((detail) => detail.id === state.editingId);
      if (state.editingId !== null && detailIndex < 0) throw new Error('Rincian transaksi tidak ditemukan.');
      if (state.editingId !== null && state.data.transaction_details.find((detail) => detail.id === state.editingId)?.transaction_id !== transactionId) {
        throw new Error('Rincian tidak dapat dipindahkan ke transaksi lain.');
      }
      if (details.some((detail, index) => detail.service_id === serviceId && index !== detailIndex)) {
        throw new Error('Produk ini sudah tercatat di transaksi tersebut.');
      }
      const quantity = Number(payload.quantity);
      const unitPrice = roundMoney(Number(payload.unit_price));
      const service = state.data.services.find((item) => item.id === serviceId);
      if (!service) throw new Error('Pilih layanan atau produk yang tersedia.');
      const detail = {
        id: state.editingId ?? Math.trunc(Date.now() * 1000 + Math.random() * 1000),
        service_id: serviceId,
        service_name: service.name,
        product_code: service.product_code || '',
        brand: service.brand || '',
        category: service.category,
        quantity,
        unit_price: unitPrice,
        subtotal: roundMoney(quantity * unitPrice)
      };
      if (detailIndex >= 0) details[detailIndex] = detail;
      else details.push(detail);
      const { error } = await supabaseClient.from('transactions').update({ details }).eq('id', transactionId);
      if (error) throw error;
      showToast(state.editingId === null ? 'Data berhasil ditambahkan.' : 'Perubahan berhasil disimpan.');
      resetForm();
      await Promise.all([refreshData(), refreshFinanceData()]);
      return;
    }
    if (key === 'services') {
      const imageFile = formData.get('product_image');
      if (imageFile instanceof File && imageFile.size > 0) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(imageFile.type)) throw new Error('Pilih foto JPG, PNG, atau WebP.');
        if (imageFile.size > 5 * 1024 * 1024) throw new Error('Ukuran foto maksimal 5 MB.');
        const extension = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' }[imageFile.type];
        const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${extension}`;
        uploadedImagePath = `${currentUserId}/products/${uniqueName}`;
        const { error: uploadError } = await supabaseClient.storage.from('shoply-products').upload(uploadedImagePath, imageFile, {
          cacheControl: '3600',
          contentType: imageFile.type,
          upsert: false
        });
        if (uploadError) throw uploadError;
        payload.image_url = supabaseClient.storage.from('shoply-products').getPublicUrl(uploadedImagePath).data.publicUrl;
      }
    }
    let result = supabaseClient.from(definition.table);
    result = state.editingId === null ? await result.insert(payload) : await result.update(payload).eq('id', state.editingId);
    if (result.error) throw result.error;
    showToast(state.editingId === null ? 'Data berhasil ditambahkan.' : 'Perubahan berhasil disimpan.');
    resetForm();
    await Promise.all([refreshData(), refreshFinanceData()]);
  } catch (error) {
    if (uploadedImagePath) {
      try {
        const { error: cleanupError } = await supabaseClient.storage.from('shoply-products').remove([uploadedImagePath]);
        if (cleanupError) console.error('Gagal membersihkan foto yang tidak tersimpan:', cleanupError.message);
      } catch (cleanupError) {
        console.error('Gagal membersihkan foto yang tidak tersimpan:', cleanupError);
      }
    }
    showToast(`Gagal menyimpan data: ${error.message || 'periksa koneksi dan isian.'}`, true);
  } finally {
    button.disabled = false;
    button.innerHTML = state.editingId === null
      ? '<span aria-hidden="true">＋</span> Simpan data'
      : 'Simpan perubahan';
  }

  function validateEntityPayload(key, payload) {
    if (key === 'customers') {
      payload.full_name = String(payload.full_name || '').trim();
      payload.email = String(payload.email || '').trim().toLocaleLowerCase();
      payload.phone = String(payload.phone || '').trim();
      payload.address = String(payload.address || '').trim();
      if (!payload.full_name || payload.full_name.length > 160) throw new Error('Nama pelanggan wajib diisi (maksimal 160 karakter).');
      if (payload.phone && !/^[+\d().\-\s]{7,24}$/.test(payload.phone)) throw new Error('Format nomor telepon tidak valid.');
      if (payload.email && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) || payload.email.length > 254)) {
        throw new Error('Masukkan alamat email yang valid.');
      }
      if (payload.address.length > 1000) throw new Error('Alamat maksimal 1.000 karakter.');
      return;
    }
    if (key === 'services') {
      payload.name = String(payload.name || '').trim();
      payload.product_code = String(payload.product_code || '').trim();
      payload.brand = String(payload.brand || '').trim();
      payload.description = String(payload.description || '').trim();
      payload.image_url = String(payload.image_url || '').trim();
      if (!payload.name || payload.name.length > 160) throw new Error('Nama layanan atau produk wajib diisi (maksimal 160 karakter).');
      if (payload.product_code.length > 120) throw new Error('Kode produk maksimal 120 karakter.');
      if (!['Jasa', 'Produk'].includes(payload.category)) throw new Error('Pilih kategori layanan atau produk yang valid.');
      if (payload.brand.length > 120 || payload.description.length > 4000) throw new Error('Merek maksimal 120 dan deskripsi maksimal 4.000 karakter.');
      if (!Number.isFinite(payload.price) || payload.price < 0 || payload.price > 9999999999.99) {
        throw new Error('Harga harus berupa angka antara 0 dan 9.999.999.999,99.');
      }
      if (payload.image_url) {
        let imageUrl;
        try { imageUrl = new URL(payload.image_url); } catch { throw new Error('URL foto tidak valid.'); }
        if (imageUrl.protocol !== 'https:') throw new Error('URL foto harus menggunakan HTTPS.');
      }
      return;
    }
    if (key === 'transactions') {
      const date = String(payload.transaction_date || '');
      if (!state.data.customers.some((customer) => customer.id === payload.customer_id && customer.user_id === currentUserId)) {
        throw new Error('Pilih pelanggan dari workspace Anda.');
      }
      if (!isValidDateInput(date)) {
        throw new Error('Tanggal transaksi tidak valid.');
      }
      for (const field of ['service_fee', 'new_payment']) {
        if (!Number.isFinite(payload[field]) || payload[field] < 0 || payload[field] > 9999999999.99) {
          throw new Error('Biaya dan pembayaran baru harus berupa angka positif yang valid.');
        }
        payload[field] = roundMoney(payload[field]);
      }
      if (!['flexible', 'full_before_shipping'].includes(payload.payment_policy)) {
        throw new Error('Pilih ketentuan pembayaran yang valid.');
      }
      payload.notes = String(payload.notes || '').trim();
      if (payload.notes.length > 2000) throw new Error('Catatan transaksi maksimal 2.000 karakter.');
      return;
    }
    if (key === 'transaction_details') {
      if (!Number.isSafeInteger(payload.quantity) || payload.quantity < 1 || payload.quantity > 1000000) {
        throw new Error('Kuantitas harus bilangan bulat antara 1 dan 1.000.000.');
      }
      if (!Number.isFinite(payload.unit_price) || payload.unit_price < 0 || payload.unit_price > 9999999999.99) {
        throw new Error('Harga satuan tidak valid.');
      }
      payload.unit_price = roundMoney(payload.unit_price);
    }
  }
}

async function handleTableAction(event) {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const key = state.activeView;
  const definition = entityDefinitions[key];
  const id = Number(button.dataset.id);
  const record = currentRecord(definition.table, id);
  if (!record) return;

  if (button.dataset.action === 'edit') {
    state.editingId = id;
    renderEntity(key);
    document.getElementById('entity-form').scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  if (key === 'services' && state.data.transaction_details.some((detail) => Number(detail.service_id) === id)) {
    showToast('Produk ini sudah dipakai transaksi. Ubah statusnya menjadi nonaktif agar histori tetap akurat.', true);
    return;
  }
  if (key === 'customers' && state.data.transactions.some((transaction) => Number(transaction.customer_id) === id)) {
    showToast('Pelanggan yang masih memiliki transaksi tidak dapat dihapus. Hapus transaksi terkait terlebih dahulu.', true);
    return;
  }

  const label = key === 'transactions' ? `TRX-${id}` : `#${id}`;
  const transactionWarning = key === 'transactions'
    ? '\nTransaksi yang dihapus tidak dapat dipulihkan dan akan hilang dari ringkasan serta jurnal otomatis.'
    : '';
  if (!window.confirm(`Hapus data ${label}? Tindakan ini tidak dapat dibatalkan.${transactionWarning}`)) return;
  try {
    let error;
    if (key === 'transaction_details') {
      const detail = state.data.transaction_details.find((item) => item.id === id);
      const transaction = state.data.transactions.find((item) => item.id === detail?.transaction_id);
      if (!detail || !transaction) throw new Error('Rincian transaksi tidak ditemukan.');
      const details = transaction.details.filter((item) => item.id !== id);
      ({ error } = await supabaseClient.from('transactions').update({ details }).eq('id', transaction.id));
    } else {
      ({ error } = await supabaseClient.from(definition.table).delete().eq('id', id));
    }
    if (error) throw error;
    state.selectedRows[key]?.delete(id);
    if (state.editingId === id) resetForm();
    showToast(key === 'transactions' ? 'Transaksi berhasil dihapus.' : 'Data berhasil dihapus.');
    await Promise.all([refreshData(), refreshFinanceData()]);
  } catch (error) {
    showToast(`Gagal menghapus data: ${error.message || 'data mungkin masih digunakan.'}`, true);
  }
}

function handleOrderTableAction(event) {
  const detailsButton = event.target.closest('button[data-order-detail]');
  const invoiceButton = event.target.closest('button[data-order-invoice]');
  if (detailsButton) openOrderDetails(Number(detailsButton.dataset.orderDetail));
  if (invoiceButton) openInvoice(Number(invoiceButton.dataset.orderInvoice));
}

function orderStatusBadge(status) {
  const normalized = orderStatuses.includes(status) ? status : 'Pesanan dibuat';
  const className = normalized === 'Selesai' ? 'order-complete' : normalized === 'Dibatalkan' ? 'order-cancelled' : 'order-progress';
  return `<span class="status-pill order-status ${className}">${escapeHtml(normalized)}</span>`;
}

function renderOrderTimeline(status) {
  const currentStatus = orderStatuses.includes(status) ? status : orderStatuses[0];
  if (currentStatus === 'Dibatalkan') {
    return `<ol class="order-timeline cancelled-timeline"><li class="timeline-step reached"><span></span><strong>Pesanan dibuat</strong></li><li class="timeline-step cancelled-step reached"><span></span><strong>Dibatalkan</strong></li></ol>`;
  }
  const currentIndex = orderStatuses.indexOf(currentStatus);
  return `<ol class="order-timeline">${orderStatuses.slice(0, 5).map((step, index) => `<li class="timeline-step${index <= currentIndex ? ' reached' : ''}${index === currentIndex ? ' current' : ''}"><span></span><strong>${escapeHtml(step)}</strong></li>`).join('')}</ol>`;
}

function openOrderDetails(transactionId) {
  const transaction = state.data.transactions.find((item) => Number(item.id) === transactionId);
  if (!transaction) {
    showToast('Transaksi tidak ditemukan. Muat ulang data, lalu coba lagi.', true);
    return;
  }
  const customer = state.data.customers.find((item) => Number(item.id) === Number(transaction.customer_id));
  const dialog = document.getElementById('order-detail-dialog');
  dialog.dataset.transactionId = String(transactionId);
  const status = orderStatuses.includes(transaction.order_status) ? transaction.order_status : orderStatuses[0];
  const totalDue = transactionTotal(transaction);
  const isPaidBeforeShipping = transaction.payment_policy === 'full_before_shipping';
  const paid = transactionPaid(transaction);
  const isFullyPaid = paid >= totalDue;
  const paymentMethod = transactionPaymentMethod(transaction);
  document.getElementById('order-detail-title').textContent = `TRX-${transaction.id} · Detail pesanan`;
  document.getElementById('order-status-select').innerHTML = orderStatuses.map((value) =>
    `<option value="${escapeHtml(value)}"${value === status ? ' selected' : ''}${value === 'Dikirim / dalam penyelesaian' && isPaidBeforeShipping && !isFullyPaid ? ' disabled' : ''}>${escapeHtml(value)}</option>`
  ).join('');
  const lines = (Array.isArray(transaction.details) ? transaction.details : []).map((detail) => {
    const service = state.data.services.find((item) => Number(item.id) === Number(detail.service_id));
    const label = detail.service_name || service?.name || 'Produk tidak ditemukan';
    return `<li><span>${escapeHtml(label)} <small>× ${Number(detail.quantity || 0)}</small></span><strong>${currencyFormatter.format(Number(detail.subtotal ?? Number(detail.quantity || 0) * Number(detail.unit_price || 0)))}</strong></li>`;
  }).join('');
  document.getElementById('order-detail-content').innerHTML = `
    <div class="order-detail-summary"><span>Pelanggan<strong>${escapeHtml(customer?.full_name || 'Pelanggan tidak ditemukan')}</strong></span><span>Tanggal<strong>${formatDate(transaction.transaction_date)}</strong></span><span>Status pembayaran<strong>${escapeHtml(transaction.payment_status || 'Belum dibayar')}</strong></span><span>Metode pembayaran pilihan<strong>${escapeHtml(paymentMethod)}</strong></span><span>Ketentuan pembayaran<strong>${isPaidBeforeShipping ? 'Lunas sebelum dikirim' : 'Pembayaran fleksibel'}</strong></span><span>Total tagihan<strong>${currencyFormatter.format(totalDue)}</strong></span></div>
    ${renderOrderTimeline(status)}
    <h3>Rincian barang</h3><ul class="order-detail-lines">${lines || '<li><span>Belum ada rincian barang.</span></li>'}</ul>
    <p class="order-detail-note">Dibayar ${currencyFormatter.format(paid)} · Sisa ${currencyFormatter.format(Math.max(totalDue - paid, 0))}${isPaidBeforeShipping && !isFullyPaid ? ' · Pelunasan wajib sebelum status dikirim.' : ''}</p>`;
  dialog.showModal();
}

async function saveOrderStatus(event) {
  event.preventDefault();
  const dialog = document.getElementById('order-detail-dialog');
  const transactionId = Number(dialog.dataset.transactionId);
  const status = document.getElementById('order-status-select').value;
  if (!orderStatuses.includes(status)) {
    showToast('Pilih status pesanan yang valid.', true);
    return;
  }
  const transaction = state.data.transactions.find((item) => Number(item.id) === transactionId);
  if (!transaction) {
    showToast('Transaksi tidak ditemukan. Muat ulang data sebelum mengubah status.', true);
    return;
  }
  if (transaction.order_status === status) {
    showToast('Status pesanan sudah sesuai.');
    return;
  }
  if (transaction.order_status === 'Dibatalkan') {
    showToast('Pesanan yang sudah dibatalkan tidak dapat diaktifkan kembali.', true);
    return;
  }
  if (transaction.order_status === 'Selesai' && status !== 'Dibatalkan') {
    showToast('Pesanan yang sudah selesai tidak dapat dikembalikan ke status sebelumnya.', true);
    return;
  }
  if (status === 'Dibatalkan') {
    if (!Object.prototype.hasOwnProperty.call(transaction, 'cancelled_at') ||
        !Object.prototype.hasOwnProperty.call(transaction, 'cancellation_review_required')) {
      showToast('Pembaruan database untuk pencatatan pembatalan belum diterapkan. Jalankan backend/database.sql terbaru terlebih dahulu.', true);
      return;
    }
    const needsReview = ['Dikirim / dalam penyelesaian', 'Selesai'].includes(transaction.order_status);
    const paid = transactionPaid(transaction);
    const confirmation = needsReview
      ? `Pesanan TRX-${transactionId} sudah dikirim/selesai. Status pembatalan akan ditandai untuk pemeriksaan manual dan jurnal pendapatan tidak dibalik otomatis. Lanjutkan?`
      : `Batalkan TRX-${transactionId}? Tagihan akan dibalik otomatis. Pastikan pengembalian dana${paid > 0 ? ` sebesar ${currencyFormatter.format(paid)}` : ''} benar-benar dilakukan sekarang; aplikasi akan mencatat kas keluar pada tanggal pembatalan.`;
    if (!window.confirm(confirmation)) return;
  }
  if (status === 'Dikirim / dalam penyelesaian' &&
      transaction.payment_policy === 'full_before_shipping' &&
      transactionPaid(transaction) < transactionTotal(transaction)) {
    showToast('Pesanan harus lunas sebelum dapat dikirim.', true);
    return;
  }
  const button = document.getElementById('order-status-save');
  button.disabled = true;
  button.textContent = 'Menyimpan...';
  try {
    const { error } = await supabaseClient.from('transactions').update({ order_status: status }).eq('id', transactionId);
    if (error) throw error;
    dialog.close();
    await refreshData();
    if (state.data.transactions.find((item) => Number(item.id) === transactionId)?.order_status !== status) {
      throw new Error('Perubahan tersimpan tetapi belum dapat diverifikasi setelah pemuatan ulang data.');
    }
    showToast(`Status pesanan TRX-${transactionId} diperbarui.`);
    openOrderDetails(transactionId);
  } catch (error) {
    showToast(`Status pesanan gagal disimpan: ${error.message || 'pastikan migrasi status pesanan telah diterapkan.'}`, true);
  } finally {
    button.disabled = false;
    button.textContent = 'Simpan status';
  }
}

function openInvoice(transactionId) {
  const transaction = state.data.transactions.find((item) => Number(item.id) === transactionId);
  if (!transaction) {
    showToast('Transaksi tidak ditemukan. Muat ulang data, lalu coba lagi.', true);
    return;
  }
  state.invoiceTransactionId = transactionId;
  const customer = state.data.customers.find((item) => Number(item.id) === Number(transaction.customer_id));
  const invoiceNumber = `INV-${String(transaction.id).padStart(6, '0')}`;
  const details = Array.isArray(transaction.details) ? transaction.details : [];
  const itemRows = details.map((detail, index) => {
    const service = state.data.services.find((item) => Number(item.id) === Number(detail.service_id));
    const quantity = Number(detail.quantity || 0);
    const unitPrice = Number(detail.unit_price || 0);
    const subtotal = Number(detail.subtotal ?? quantity * unitPrice);
    const productCode = detail.product_code || service?.product_code;
    return `<tr><td>${index + 1}</td><td><strong>${escapeHtml(detail.service_name || service?.name || 'Produk tidak ditemukan')}</strong>${productCode ? `<small class="invoice-product-code">Kode: ${escapeHtml(productCode)}</small>` : ''}</td><td>${escapeHtml(detail.brand || service?.brand || '—')}</td><td class="invoice-number">${quantity.toLocaleString('id-ID')}</td><td class="invoice-number">${currencyFormatter.format(unitPrice)}</td><td class="invoice-number">${currencyFormatter.format(subtotal)}</td></tr>`;
  }).join('');
  const amountPaid = transactionPaid(transaction);
  const due = Math.max(roundMoney(transactionTotal(transaction) - amountPaid), 0);
  const paymentMethod = transactionPaymentMethod(transaction);
  const notes = transactionNotes(transaction);
  document.getElementById('invoice-content').innerHTML = `
    <header class="invoice-header"><div class="invoice-brand"><span class="invoice-brand-mark">S</span><div><strong>SHOPLY</strong><small>PRIVATE CLIENT OFFICE · JAKARTA</small></div></div><div class="invoice-heading"><p>TAGIHAN PERSONAL SHOPPER</p><h1 id="invoice-title">INVOICE</h1><strong>${invoiceNumber}</strong></div></header>
    <div class="invoice-meta"><span>Tanggal transaksi<strong>${formatDate(transaction.transaction_date)}</strong></span><span>Status pesanan<strong>${escapeHtml(transaction.order_status || 'Pesanan dibuat')}</strong></span><span>Status pembayaran<strong>${escapeHtml(transaction.payment_status || 'Belum dibayar')}</strong></span><span>Metode pembayaran pilihan<strong>${escapeHtml(paymentMethod)}</strong></span><span>Ketentuan pembayaran<strong>${transaction.payment_policy === 'full_before_shipping' ? 'Lunas sebelum dikirim' : 'Pembayaran fleksibel'}</strong></span><span>No. transaksi<strong>TRX-${transaction.id}</strong></span></div>
    <section class="invoice-customer"><p>DITAGIHKAN KEPADA</p><h2>${escapeHtml(customer?.full_name || 'Pelanggan tidak ditemukan')}</h2><span>${escapeHtml(customer?.email || '—')}</span><span>${escapeHtml(customer?.phone || '—')}</span><span>${escapeHtml(customer?.address || '')}</span></section>
    <div class="table-wrap invoice-table-wrap"><table class="invoice-table"><thead><tr><th>No.</th><th>Nama produk</th><th>Brand</th><th class="invoice-number">Qty</th><th class="invoice-number">Harga satuan</th><th class="invoice-number">Subtotal</th></tr></thead><tbody>${itemRows || '<tr><td colspan="6" class="empty-row">Tidak ada rincian produk pada transaksi ini.</td></tr>'}</tbody></table></div>
    <section class="invoice-totals"><div><span>Biaya jasa</span><strong>${currencyFormatter.format(Number(transaction.service_fee || 0))}</strong></div><div class="invoice-grand-total"><span>Total tagihan</span><strong>${currencyFormatter.format(transactionTotal(transaction))}</strong></div><div><span>Jumlah dibayar</span><strong>${currencyFormatter.format(amountPaid)}</strong></div><div class="invoice-due"><span>Sisa tagihan</span><strong>${currencyFormatter.format(due)}</strong></div><div><span>Status pembayaran</span><strong>${escapeHtml(transaction.payment_status || 'Belum dibayar')}</strong></div></section>
    <section class="invoice-notes"><strong>Catatan</strong><p>${escapeHtml(notes || 'Terima kasih telah mempercayakan kebutuhan personal shopping Anda kepada SHOPLY.')}</p><p>Invoice ini diterbitkan berdasarkan data transaksi yang tersimpan di sistem SHOPLY.</p></section>
    <footer class="invoice-footer"><strong>Terima kasih telah memilih SHOPLY.</strong><span>CURATED WITH CARE · SHOPLY PRIVATE CLIENT OFFICE</span></footer>`;
  showView('invoice');
}

function resetForm() {
  if (productPreviewUrl) {
    URL.revokeObjectURL(productPreviewUrl);
    productPreviewUrl = '';
  }
  state.editingId = null;
  document.getElementById('entity-form').reset();
  if (state.activeView !== 'dashboard') renderEntity(state.activeView);
}

function handleProductImageSelection(event) {
  const input = event.target.closest('#field-product_image');
  if (!input) return;
  const file = input.files?.[0];
  if (!file) return;
  const preview = document.getElementById('product-image-preview');
  if (productPreviewUrl) URL.revokeObjectURL(productPreviewUrl);
  productPreviewUrl = URL.createObjectURL(file);
  preview.src = productPreviewUrl;
  preview.hidden = false;
}

function currentRecord(table, id) {
  const key = Object.keys(entityDefinitions).find((item) => entityDefinitions[item].table === table);
  return state.data[key]?.find((record) => record.id === id);
}

function formatDate(value) {
  if (!value) return '—';
  const parsed = new Date(`${value}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? escapeHtml(value) : dateFormatter.format(parsed);
}

function statusBadge(value) {
  const className = value === 'Lunas' ? 'paid' : value === 'Sebagian' ? 'partial' : '';
  return `<span class="status-pill ${className}">${escapeHtml(value || '—')}</span>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

function setConnection(connected, label) {
  const dot = document.getElementById('connection-dot');
  dot.classList.toggle('connected', connected);
  dot.classList.toggle('disconnected', !connected);
  document.getElementById('connection-label').textContent = label;
}

function showPageError(message) {
  const error = document.getElementById('page-error');
  error.textContent = message;
  error.hidden = false;
}

function hidePageError() {
  document.getElementById('page-error').hidden = true;
}

function showToast(message, isError = false) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.toggle('error', isError);
  toast.classList.add('visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 3200);
}