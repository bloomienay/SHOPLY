const entityDefinitions = {
  customers: {
    table: 'customers', title: 'Pelanggan', eyebrow: 'DATA PELANGGAN', description: 'Kelola informasi klien jasa belanja Anda.',
    fields: [
      { name: 'full_name', label: 'Nama lengkap', required: true },
      { name: 'phone', label: 'Nomor telepon', type: 'tel' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'address', label: 'Alamat', type: 'textarea', wide: true }
    ],
    columns: [{ key: 'full_name', label: 'Nama pelanggan', primary: true }, { key: 'phone', label: 'Telepon' }, { key: 'email', label: 'Email' }, { key: 'address', label: 'Alamat' }]
  },
  services: {
    table: 'services', title: 'Layanan & produk', eyebrow: 'KATALOG', description: 'Atur jasa personal shopper dan produk fashion yang ditawarkan.',
    fields: [
      { name: 'name', label: 'Nama layanan / produk', required: true },
      { name: 'category', label: 'Kategori', type: 'select', options: ['Jasa', 'Produk'], required: true },
      { name: 'brand', label: 'Merek', type: 'select', options: ['GUCCI', 'PEDRO', 'HUSH PUPPIES', 'LACOSTE', 'LOUIS VUITTON', 'PRADA', 'CHANEL', 'DIOR', 'HERMÈS', 'FENDI', 'BURBERRY', 'VALENTINO', 'Lainnya'] },
      { name: 'product_type', label: 'Jenis katalog', type: 'select', options: ['Sepatu', 'Tas', 'Pakaian', 'Aksesori', 'Lainnya'] },
      { name: 'price', label: 'Harga (Rp)', type: 'number', min: 0, step: '0.01', required: true },
      { name: 'product_image', label: 'Upload foto produk', type: 'file', wide: true },
      { name: 'image_url', label: 'URL foto alternatif (opsional)', type: 'url', placeholder: 'https://...', wide: true },
      { name: 'description', label: 'Deskripsi', type: 'textarea', wide: true },
      { name: 'is_active', label: 'Aktif ditawarkan', type: 'checkbox', defaultValue: true }
    ],
    columns: [{ key: 'name', label: 'Nama', primary: true }, { key: 'brand', label: 'Merek' }, { key: 'product_type', label: 'Jenis katalog' }, { key: 'category', label: 'Tipe data' }, { key: 'price', label: 'Harga', format: 'currency' }, { key: 'description', label: 'Deskripsi' }, { key: 'is_active', label: 'Status', format: 'active' }]
  },
  transactions: {
    table: 'transactions', title: 'Transaksi', eyebrow: 'PENJUALAN', description: 'Catat pesanan pelanggan dan pembayaran yang diterima.',
    fields: [
      { name: 'customer_id', label: 'Pelanggan', type: 'relation', relation: 'customers', required: true },
      { name: 'transaction_date', label: 'Tanggal transaksi', type: 'date', required: true },
      { name: 'payment_status', label: 'Status pembayaran', type: 'select', options: ['Belum dibayar', 'Sebagian', 'Lunas'], required: true },
      { name: 'service_fee', label: 'Biaya jasa (Rp)', type: 'number', min: 0, step: '0.01', defaultValue: 0 },
      { name: 'amount_paid', label: 'Jumlah dibayar (Rp)', type: 'number', min: 0, step: '0.01', defaultValue: 0 },
      { name: 'notes', label: 'Catatan', type: 'textarea', wide: true }
    ],
    columns: [{ key: 'id', label: 'No. transaksi', primary: true, format: 'transaction' }, { key: 'customer_id', label: 'Pelanggan', format: 'customer' }, { key: 'transaction_date', label: 'Tanggal', format: 'date' }, { key: 'payment_status', label: 'Pembayaran', format: 'status' }, { key: 'service_fee', label: 'Biaya jasa', format: 'currency' }, { key: 'amount_paid', label: 'Dibayar', format: 'currency' }]
  },
  transaction_details: {
    table: 'transaction_details', title: 'Detail transaksi', eyebrow: 'RINCIAN PESANAN', description: 'Hubungkan layanan atau produk ke transaksi dan catat harga jualnya.',
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

const state = {
  activeView: 'dashboard',
  editingId: null,
  data: { customers: [], services: [], transactions: [], transaction_details: [] },
  selectedRows: { customers: new Set(), services: new Set() },
  finance: { activeTab: 'journal', accounts: [], entries: [], lines: [], ready: false, error: '' },
  catalog: { brand: '', category: 'Semua', search: '', cart: [] }
};
const currencyFormatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });
const dateFormatter = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
let supabaseClient = null;
let toastTimer = null;
let productPreviewUrl = '';

document.addEventListener('DOMContentLoaded', initialize);

async function initialize() {
  document.getElementById('today-label').textContent = dateFormatter.format(new Date());
  document.querySelectorAll('[data-view]').forEach((button) => button.addEventListener('click', () => showView(button.dataset.view)));
  document.querySelectorAll('[data-go]').forEach((button) => button.addEventListener('click', () => showView(button.dataset.go)));
  document.getElementById('entity-form').addEventListener('submit', saveEntity);
  document.getElementById('entity-form').addEventListener('change', handleProductImageSelection);
  document.getElementById('cancel-edit').addEventListener('click', resetForm);
  document.getElementById('entity-table-body').addEventListener('click', handleTableAction);
  document.getElementById('entity-table-body').addEventListener('change', handleRowSelection);
  document.getElementById('entity-table-head').addEventListener('change', handleSelectAll);
  document.getElementById('bulk-delete-button').addEventListener('click', deleteSelectedRows);
  document.getElementById('brand-wall').addEventListener('click', handleBrandClick);
  document.getElementById('catalog-products').addEventListener('error', handleCatalogImageError, true);
  document.getElementById('catalog-products').addEventListener('click', handleCatalogProductClick);
  document.getElementById('order-items').addEventListener('click', handleOrderItemClick);
  document.getElementById('order-customer').addEventListener('change', renderOrderDesk);
  document.getElementById('order-service-fee').addEventListener('input', renderOrderDesk);
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
  document.getElementById('expense-form').addEventListener('submit', saveExpense);

  const today = localDateString(new Date());
  const monthStart = `${today.slice(0, 7)}-01`;
  document.getElementById('finance-start').value = monthStart;
  document.getElementById('finance-end').value = today;
  document.getElementById('expense-date').value = today;
  renderBrandWall();

  if (typeof SUPABASE_URL === 'undefined' || typeof SUPABASE_ANON_KEY === 'undefined' ||
      !SUPABASE_URL || SUPABASE_URL.includes('xxxxxxxx') ||
      !SUPABASE_ANON_KEY || SUPABASE_ANON_KEY === 'isi-anon-key-di-sini') {
    setConnection(false, 'Konfigurasi belum diisi');
    showPageError('Konfigurasi Supabase belum diisi. Masukkan Project URL dan anon key pada backend/config.js, lalu muat ulang halaman.');
    return;
  }
  if (!window.supabase || typeof window.supabase.createClient !== 'function') {
    setConnection(false, 'CDN tidak tersedia');
    showPageError('Library Supabase gagal dimuat. Periksa koneksi internet, lalu muat ulang halaman.');
    return;
  }

  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  await Promise.all([refreshData(), refreshFinanceData()]);
}

async function refreshData() {
  try {
    const entityKeys = Object.keys(entityDefinitions).filter((key) => key !== 'transaction_details');
    const results = await Promise.all(entityKeys.map((key) =>
      supabaseClient.from(entityDefinitions[key].table).select('*').order('id', { ascending: false })
    ));
    const failed = results.find((result) => result.error);
    if (failed) throw failed.error;
    entityKeys.forEach((key, index) => {
      state.data[key] = results[index].data || [];
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
    setConnection(true, 'Terhubung ke Supabase');
    hidePageError();
    renderDashboard();
    if (state.activeView !== 'dashboard') renderEntity(state.activeView);
    if (state.activeView === 'finance') renderFinance();
  } catch (error) {
    setConnection(false, 'Koneksi bermasalah');
    showPageError(`Tidak dapat membaca data Supabase: ${error.message || 'periksa URL, anon key, koneksi, dan kebijakan akses tabel.'}`);
  }
}

async function refreshFinanceData() {
  if (!supabaseClient) return;
  try {
    const { data, error } = await supabaseClient.from('finance_records').select('*').order('id');
    if (error) throw error;
    const records = data || [];
    state.finance.accounts = records.filter((record) => record.record_type === 'account').map((record) => ({
      id: record.account_code,
      code: record.account_code,
      name: record.account_name,
      account_type: record.account_type
    })).sort((a, b) => a.code.localeCompare(b.code));
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
  if (view !== 'dashboard' && view !== 'finance' && !entityDefinitions[view]) return;
  state.activeView = view;
  document.querySelectorAll('[data-view]').forEach((button) => button.classList.toggle('active', button.dataset.view === view));
  document.getElementById('view-dashboard').hidden = view !== 'dashboard';
  document.getElementById('view-entity').hidden = view === 'dashboard' || view === 'finance';
  document.getElementById('view-finance').hidden = view !== 'finance';
  document.getElementById('breadcrumb-label').textContent = view === 'dashboard' ? 'Dashboard' : view === 'finance' ? 'Keuangan' : entityDefinitions[view].title;
  if (view === 'finance') renderFinance();
  else if (view !== 'dashboard') renderEntity(view);
}

function renderDashboard() {
  const received = state.data.transactions.reduce((sum, transaction) =>
    sum + (transaction.payment_status === 'Belum dibayar' ? 0 : Number(transaction.amount_paid || 0)), 0);
  document.getElementById('stat-revenue').textContent = currencyFormatter.format(received);
  document.getElementById('stat-transactions').textContent = state.data.transactions.length.toLocaleString('id-ID');
  document.getElementById('stat-customers').textContent = state.data.customers.length.toLocaleString('id-ID');

  const recent = [...state.data.transactions].sort((a, b) => String(b.transaction_date).localeCompare(String(a.transaction_date))).slice(0, 5);
  const body = document.getElementById('recent-transactions');
  if (!recent.length) {
    body.innerHTML = '<tr><td class="empty-row" colspan="5">Belum ada transaksi. Data baru akan muncul di sini.</td></tr>';
    return;
  }
  body.innerHTML = recent.map((transaction) => {
    const customer = state.data.customers.find((item) => item.id === transaction.customer_id);
    return `<tr><td class="table-primary">TRX-${escapeHtml(transaction.id)}</td><td>${escapeHtml(customer?.full_name || 'Pelanggan tidak ditemukan')}</td><td>${formatDate(transaction.transaction_date)}</td><td>${statusBadge(transaction.payment_status)}</td><td class="table-primary">${currencyFormatter.format(Number(transaction.amount_paid || 0))}</td></tr>`;
  }).join('');
}

function renderBrandWall() {
  const brandWall = document.getElementById('brand-wall');
  if (!brandWall) return;
  brandWall.innerHTML = curatedBrands.map((brand, index) => `<li class="brand-item"><button type="button" class="brand-label brand-${brand.slug}" data-brand="${escapeHtml(brand.name)}" aria-label="Buka katalog ${escapeHtml(brand.name)}">
    <span class="brand-number">${String(index + 1).padStart(2, '0')}</span><strong>${escapeHtml(brand.name)}</strong><small>${escapeHtml(brand.categories)}</small>
  </button></li>`).join('');
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
    const searchText = `${product.name} ${product.description || ''}`.toLocaleLowerCase();
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
      <div class="catalog-product-info"><span class="catalog-product-brand">${escapeHtml(product.brand || state.catalog.brand)} · HARGA ESTIMASI</span><h3>${escapeHtml(product.name)}</h3><p>${escapeHtml(product.description || 'Curated for your private edit.')}</p><strong>${currencyFormatter.format(Number(product.price || 0))}</strong><button type="button" class="catalog-product-add" data-add-order="${product.id}">${cartItem ? `＋ Tambah lagi · ${cartItem.quantity}` : '＋ Tambah pesanan'}</button></div>
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
  const image = event.target.closest('img.catalog-product-photo');
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
  if (cartItem) cartItem.quantity += 1;
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
  else if (button.dataset.orderAction === 'increase') cartItem.quantity += 1;
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
  document.getElementById('order-item-count').textContent = `${String(itemCount).padStart(2, '0')} ITEM`;
  document.getElementById('order-subtotal').textContent = currencyFormatter.format(subtotal);
  document.getElementById('order-fee-total').textContent = currencyFormatter.format(fee);
  document.getElementById('order-total').textContent = currencyFormatter.format(subtotal + fee);
  document.getElementById('order-submit').disabled = items.length === 0 || customers.length === 0;

  const orderItems = document.getElementById('order-items');
  if (!items.length) {
    orderItems.innerHTML = '<p class="order-empty">Pilih produk untuk mulai menyusun pesanan.</p>';
    return;
  }
  orderItems.innerHTML = items.map(({ product, quantity }) => `<article class="order-line">
    <div class="order-line-copy"><strong>${escapeHtml(product.name)}</strong><small>${escapeHtml(product.brand || 'Private edit')} · ${currencyFormatter.format(Number(product.price || 0))}</small></div>
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
  button.disabled = true;
  button.textContent = 'Menyimpan pesanan…';
  let transactionId = null;
  try {
    const brandNames = [...new Set(cart.map((item) => item.product.brand).filter(Boolean))];
    const { data, error } = await supabaseClient.from('transactions').insert({
      customer_id: customerId,
      transaction_date: localDateString(new Date()),
      payment_status: 'Belum dibayar',
      service_fee: serviceFee,
      amount_paid: 0,
      notes: `Pesanan katalog · ${brandNames.join(', ')}`,
      details: cart.map((item, index) => ({
        id: Date.now() + index,
        service_id: item.product.id,
        quantity: item.quantity,
        unit_price: Number(item.product.price || 0),
        subtotal: roundMoney(Number(item.product.price || 0) * item.quantity)
      }))
    }).select('id').single();
    if (error) throw error;
    transactionId = data.id;

    const total = roundMoney(cart.reduce((sum, item) => sum + Number(item.product.price || 0) * item.quantity, 0) + serviceFee);
    document.getElementById('order-feedback').textContent = `Pesanan TRX-${transactionId} untuk ${customer.full_name} berhasil dibuat · Total estimasi ${currencyFormatter.format(total)}.`;
    state.catalog.cart = [];
    document.getElementById('order-service-fee').value = '0';
    showToast(`Pesanan TRX-${transactionId} berhasil dibuat.`);
    await Promise.all([refreshData(), refreshFinanceData()]);
    renderCatalog();
  } catch (error) {
    if (transactionId !== null) await supabaseClient.from('transactions').delete().eq('id', transactionId);
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
    document.querySelector('.expense-drawer').hidden = true;
    document.getElementById('finance-content').innerHTML = `<div class="finance-empty"><strong>Data keuangan belum siap</strong><span>Jalankan ulang backend/database.sql di Supabase SQL Editor untuk membuat tabel akun dan jurnal.</span><small>${escapeHtml(state.finance.error)}</small></div>`;
    document.getElementById('balance-indicator').hidden = true;
    document.getElementById('finance-revenue').textContent = currencyFormatter.format(0);
    document.getElementById('finance-expenses').textContent = currencyFormatter.format(0);
    document.getElementById('finance-profit').textContent = currencyFormatter.format(0);
    return;
  }

  document.querySelector('.expense-drawer').hidden = false;
  document.getElementById('balance-indicator').hidden = false;
  populateFinanceSelects();
  const startDate = document.getElementById('finance-start').value;
  const endDate = document.getElementById('finance-end').value;
  const content = document.getElementById('finance-content');
  content.classList.remove('report-enter');
  void content.offsetWidth;
  content.classList.add('report-enter');
  if (startDate && endDate && startDate > endDate) {
    content.innerHTML = '<div class="finance-empty"><strong>Rentang tanggal tidak valid</strong><span>Tanggal awal harus sama dengan atau sebelum tanggal akhir.</span></div>';
    return;
  }

  const periodEntries = buildFinanceEntries(startDate, endDate);
  const totals = summarizeJournal(periodEntries);
  const revenue = totals.filter((item) => item.account_type === 'Pendapatan').reduce((sum, item) => sum + item.credit - item.debit, 0);
  const expenses = totals.filter((item) => item.account_type === 'Beban').reduce((sum, item) => sum + item.debit - item.credit, 0);
  document.getElementById('finance-revenue').textContent = currencyFormatter.format(revenue);
  document.getElementById('finance-expenses').textContent = currencyFormatter.format(expenses);
  document.getElementById('finance-profit').textContent = currencyFormatter.format(revenue - expenses);

  const debit = periodEntries.flatMap((entry) => entry.lines).reduce((sum, line) => sum + line.debit, 0);
  const credit = periodEntries.flatMap((entry) => entry.lines).reduce((sum, line) => sum + line.credit, 0);
  const isBalanced = Math.abs(debit - credit) < 0.01;
  const balanceIndicator = document.getElementById('balance-indicator');
  balanceIndicator.classList.toggle('unbalanced', !isBalanced);
  balanceIndicator.innerHTML = `<i></i>${isBalanced ? 'Seimbang' : `Selisih ${currencyFormatter.format(Math.abs(debit - credit))}`}`;

  if (tab === 'journal') content.innerHTML = renderJournalTable(periodEntries);
  else if (tab === 'ledger') content.innerHTML = renderLedgerTable(startDate, endDate);
  else if (tab === 'trial-balance') content.innerHTML = renderTrialBalance(endDate);
  else content.innerHTML = renderIncomeStatement(periodEntries);
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
  const defaultExpense = expenseAccounts.find((account) => account.code === '5101');
  if (defaultExpense && !expenseSelect.dataset.initialized) expenseSelect.value = String(defaultExpense.id);
  expenseSelect.dataset.initialized = 'true';
}

function buildFinanceEntries(startDate, endDate) {
  const entries = [];
  const accountByCode = (code) => state.finance.accounts.find((account) => account.code === code);
  const includeDate = (date) => (!startDate || date >= startDate) && (!endDate || date <= endDate);

  state.data.transactions.forEach((transaction) => {
    const entryDate = transaction.transaction_date || String(transaction.created_at || '').slice(0, 10);
    if (!includeDate(entryDate)) return;
    const details = state.data.transaction_details.filter((detail) => detail.transaction_id === transaction.id);
    let serviceRevenue = Number(transaction.service_fee || 0);
    let productRevenue = 0;
    details.forEach((detail) => {
      const service = state.data.services.find((item) => item.id === detail.service_id);
      if (service?.category === 'Jasa') serviceRevenue += Number(detail.subtotal || Number(detail.quantity) * Number(detail.unit_price));
      else productRevenue += Number(detail.subtotal || Number(detail.quantity) * Number(detail.unit_price));
    });
    serviceRevenue = roundMoney(serviceRevenue);
    productRevenue = roundMoney(productRevenue);
    const totalRevenue = roundMoney(serviceRevenue + productRevenue);
    const cashReceived = roundMoney(Number(transaction.amount_paid || 0));
    if (totalRevenue <= 0 && cashReceived <= 0) return;
    const outstanding = roundMoney(Math.max(totalRevenue - cashReceived, 0));
    const advance = roundMoney(Math.max(cashReceived - totalRevenue, 0));
    const lines = [
      createJournalLine(accountByCode('1001'), cashReceived, 0, 'Penerimaan kas'),
      createJournalLine(accountByCode('1101'), outstanding, 0, 'Piutang pelanggan'),
      createJournalLine(accountByCode('4001'), 0, serviceRevenue, 'Pendapatan jasa'),
      createJournalLine(accountByCode('4101'), 0, productRevenue, 'Penjualan produk'),
      createJournalLine(accountByCode('2201'), 0, advance, 'Uang muka pelanggan')
    ].filter(Boolean);
    const customer = state.data.customers.find((item) => item.id === transaction.customer_id);
    entries.push({
      date: entryDate,
      reference: `TRX-${transaction.id}`,
      description: `Penjualan${customer ? ` · ${customer.full_name}` : ''}`,
      source: 'Transaksi',
      lines
    });
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
  return entries.sort((a, b) => b.date.localeCompare(a.date) || b.reference.localeCompare(a.reference));
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

function renderJournalTable(entries) {
  const rows = entries.flatMap((entry) => entry.lines.map((line) => `<tr>
    <td>${formatDate(entry.date)}</td><td class="table-primary">${escapeHtml(entry.reference)}</td>
    <td>${escapeHtml(entry.description)}<small class="finance-cell-note">${escapeHtml(entry.source)}</small></td>
    <td><span class="account-code">${escapeHtml(line.account?.code || '')}</span> ${escapeHtml(line.account?.name || 'Akun tidak ditemukan')}<small class="finance-cell-note">${escapeHtml(line.description)}</small></td>
    <td class="money-cell">${line.debit ? currencyFormatter.format(line.debit) : '—'}</td><td class="money-cell">${line.credit ? currencyFormatter.format(line.credit) : '—'}</td>
  </tr>`)).join('');
  const totals = entries.flatMap((entry) => entry.lines).reduce((sum, line) => ({ debit: sum.debit + line.debit, credit: sum.credit + line.credit }), { debit: 0, credit: 0 });
  return `<table><thead><tr><th>Tanggal</th><th>Referensi</th><th>Keterangan</th><th>Akun</th><th class="money-cell">Debit</th><th class="money-cell">Kredit</th></tr></thead>
    <tbody>${rows || `<tr><td class="empty-row" colspan="6">Belum ada jurnal pada periode ini.</td></tr>`}</tbody>
    ${rows ? `<tfoot><tr><th colspan="4">Total jurnal</th><th class="money-cell">${currencyFormatter.format(totals.debit)}</th><th class="money-cell">${currencyFormatter.format(totals.credit)}</th></tr></tfoot>` : ''}</table>`;
}

function renderLedgerTable(startDate, endDate) {
  const account = state.finance.accounts.find((item) => String(item.id) === document.getElementById('ledger-account').value);
  if (!account) return '<div class="finance-empty"><strong>Pilih akun</strong><span>Tambahkan bagan akun untuk melihat buku besar.</span></div>';
  const entries = buildFinanceEntries('', endDate).sort((a, b) => a.date.localeCompare(b.date) || a.reference.localeCompare(b.reference));
  let balance = 0;
  const rows = [];
  entries.forEach((entry) => entry.lines.filter((line) => line.account?.id === account.id).forEach((line) => {
    if (startDate && entry.date < startDate) {
      balance += line.debit - line.credit;
      return;
    }
    balance = roundMoney(balance + line.debit - line.credit);
    rows.push(`<tr><td>${formatDate(entry.date)}</td><td class="table-primary">${escapeHtml(entry.reference)}</td><td>${escapeHtml(entry.description)}</td><td class="money-cell">${line.debit ? currencyFormatter.format(line.debit) : '—'}</td><td class="money-cell">${line.credit ? currencyFormatter.format(line.credit) : '—'}</td><td class="money-cell balance-cell">${formatSignedBalance(balance)}</td></tr>`);
  }));
  const openingBalance = entries.filter((entry) => startDate && entry.date < startDate)
    .flatMap((entry) => entry.lines).filter((line) => line.account?.id === account.id)
    .reduce((sum, line) => sum + line.debit - line.credit, 0);
  if (openingBalance) rows.unshift(`<tr class="opening-row"><td>${startDate ? formatDate(startDate) : '—'}</td><td>Saldo awal</td><td>Saldo sebelum periode</td><td>—</td><td>—</td><td class="money-cell balance-cell">${formatSignedBalance(openingBalance)}</td></tr>`);
  return `<table><thead><tr><th>Tanggal</th><th>Referensi</th><th>Keterangan</th><th class="money-cell">Debit</th><th class="money-cell">Kredit</th><th class="money-cell">Saldo</th></tr></thead>
    <tbody>${rows.join('') || '<tr><td class="empty-row" colspan="6">Belum ada mutasi untuk akun ini pada periode tersebut.</td></tr>'}</tbody></table>`;
}

function renderTrialBalance(endDate) {
  const totals = summarizeJournal(buildFinanceEntries('', endDate));
  const rows = totals.map((account) => {
    const net = roundMoney(account.debit - account.credit);
    const debitBalance = Math.max(net, 0);
    const creditBalance = Math.max(-net, 0);
    return `<tr><td class="table-primary">${escapeHtml(account.code)}</td><td>${escapeHtml(account.name)}<small class="finance-cell-note">${escapeHtml(account.account_type)}</small></td><td class="money-cell">${currencyFormatter.format(account.debit)}</td><td class="money-cell">${currencyFormatter.format(account.credit)}</td><td class="money-cell">${debitBalance ? currencyFormatter.format(debitBalance) : '—'}</td><td class="money-cell">${creditBalance ? currencyFormatter.format(creditBalance) : '—'}</td></tr>`;
  }).join('');
  const totalDebit = totals.reduce((sum, account) => sum + account.debit, 0);
  const totalCredit = totals.reduce((sum, account) => sum + account.credit, 0);
  const endingDebit = totals.reduce((sum, account) => sum + Math.max(account.debit - account.credit, 0), 0);
  const endingCredit = totals.reduce((sum, account) => sum + Math.max(account.credit - account.debit, 0), 0);
  return `<p class="report-caption">Neraca saldo kumulatif sampai ${formatDate(endDate)}; mencakup seluruh jurnal sejak awal pencatatan.</p>
    <table><thead><tr><th>Kode</th><th>Nama akun</th><th class="money-cell">Mutasi debit</th><th class="money-cell">Mutasi kredit</th><th class="money-cell">Saldo debit</th><th class="money-cell">Saldo kredit</th></tr></thead>
    <tbody>${rows || '<tr><td class="empty-row" colspan="6">Belum ada saldo untuk ditampilkan.</td></tr>'}</tbody>
    ${rows ? `<tfoot><tr><th colspan="2">Total</th><th class="money-cell">${currencyFormatter.format(totalDebit)}</th><th class="money-cell">${currencyFormatter.format(totalCredit)}</th><th class="money-cell">${currencyFormatter.format(endingDebit)}</th><th class="money-cell">${currencyFormatter.format(endingCredit)}</th></tr></tfoot>` : ''}</table>`;
}

function renderIncomeStatement(entries) {
  const totals = summarizeJournal(entries);
  const revenues = totals.filter((account) => account.account_type === 'Pendapatan' && account.credit !== account.debit);
  const expenses = totals.filter((account) => account.account_type === 'Beban' && account.debit !== account.credit);
  const revenueTotal = revenues.reduce((sum, account) => sum + account.credit - account.debit, 0);
  const expenseTotal = expenses.reduce((sum, account) => sum + account.debit - account.credit, 0);
  const accountRows = (accounts, type) => accounts.map((account) => {
    const amount = type === 'Pendapatan' ? account.credit - account.debit : account.debit - account.credit;
    return `<tr><td>${escapeHtml(account.code)} · ${escapeHtml(account.name)}</td><td class="money-cell">${currencyFormatter.format(amount)}</td></tr>`;
  }).join('');
  return `<div class="income-statement">
    <div class="statement-heading"><span>SHOPLY · LAPORAN LABA RUGI</span><strong>${formatDate(document.getElementById('finance-start').value)} — ${formatDate(document.getElementById('finance-end').value)}</strong></div>
    <table><tbody><tr class="statement-section"><th colspan="2">PENDAPATAN</th></tr>${accountRows(revenues, 'Pendapatan') || '<tr><td class="statement-empty" colspan="2">Belum ada pendapatan.</td></tr>'}
      <tr class="statement-subtotal"><th>Total Pendapatan</th><th class="money-cell">${currencyFormatter.format(revenueTotal)}</th></tr>
      <tr class="statement-section"><th colspan="2">BEBAN</th></tr>${accountRows(expenses, 'Beban') || '<tr><td class="statement-empty" colspan="2">Belum ada beban yang dicatat.</td></tr>'}
      <tr class="statement-subtotal"><th>Total Beban</th><th class="money-cell">${currencyFormatter.format(expenseTotal)}</th></tr>
      <tr class="statement-profit"><th>${revenueTotal - expenseTotal >= 0 ? 'LABA BERSIH' : 'RUGI BERSIH'}</th><th class="money-cell">${currencyFormatter.format(revenueTotal - expenseTotal)}</th></tr>
    </tbody></table>
  </div>`;
}

function formatSignedBalance(balance) {
  if (Math.abs(balance) < 0.01) return currencyFormatter.format(0);
  return `${currencyFormatter.format(Math.abs(balance))} ${balance > 0 ? 'D' : 'K'}`;
}

function roundMoney(value) {
  return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
}

function localDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

async function saveExpense(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const amount = roundMoney(Number(formData.get('amount')));
  const expenseAccount = state.finance.accounts.find((account) => String(account.id) === formData.get('expense_account_id'));
  const paymentAccount = state.finance.accounts.find((account) => String(account.id) === formData.get('payment_account_id'));
  if (!amount || amount <= 0 || !expenseAccount || !paymentAccount) {
    showToast('Pilih akun yang valid dan masukkan jumlah beban di atas nol.', true);
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
      entry_date: formData.get('entry_date'),
      reference: `BEB-${Date.now()}`,
      description: String(formData.get('description') || '').trim(),
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

function renderEntity(key) {
  const definition = entityDefinitions[key];
  if (!definition) return;
  document.getElementById('entity-eyebrow').textContent = definition.eyebrow;
  document.getElementById('entity-title').textContent = definition.title;
  document.getElementById('entity-description').textContent = definition.description;
  document.getElementById('table-title').textContent = `Daftar ${definition.title.toLowerCase()}`;
  document.getElementById('record-count').textContent = `${state.data[key].length} data`;
  renderFormFields(definition);
  renderTable(key, definition);
}

function renderFormFields(definition) {
  const container = document.getElementById('form-fields');
  container.innerHTML = definition.fields.map((field) => {
    const required = field.required ? ' required' : '';
    const wide = field.wide ? ' field-wide' : '';
    const value = state.editingId !== null ? currentRecord(definition.table, state.editingId)?.[field.name] : field.defaultValue;
    if (field.type === 'checkbox') {
      return `<div class="field${wide}"><label for="field-${field.name}">${escapeHtml(field.label)}</label><label class="checkbox-control"><input id="field-${field.name}" name="${field.name}" type="checkbox"${value ? ' checked' : ''}> Ya, aktif</label></div>`;
    }
    if (field.type === 'file') {
      const existingImage = state.editingId !== null ? safeImageUrl(currentRecord(definition.table, state.editingId)?.image_url) : '';
      return `<div class="field${wide} upload-field"><label for="field-${field.name}">${escapeHtml(field.label)}</label><input id="field-${field.name}" name="${field.name}" type="file" accept="image/jpeg,image/png,image/webp"><small>JPG, PNG, atau WebP · Maksimal 5 MB · Foto asli produk</small><img id="product-image-preview" class="product-image-preview" src="${escapeHtml(existingImage)}" alt="Foto produk saat ini"${existingImage ? '' : ' hidden'}></div>`;
    }
    if (field.type === 'textarea') {
      return `<div class="field${wide}"><label for="field-${field.name}">${escapeHtml(field.label)}</label><textarea id="field-${field.name}" name="${field.name}"${required}>${escapeHtml(value || '')}</textarea></div>`;
    }
    if (field.type === 'select' || field.type === 'relation') {
      const options = field.type === 'select'
        ? field.options.map((option) => ({ value: option, label: option }))
        : relationOptions(field.relation);
      const optionMarkup = options.map((option) => `<option value="${escapeHtml(option.value)}"${String(value ?? '') === String(option.value) ? ' selected' : ''}>${escapeHtml(option.label)}</option>`).join('');
      return `<div class="field${wide}"><label for="field-${field.name}">${escapeHtml(field.label)}</label><select id="field-${field.name}" name="${field.name}"${required}><option value="">Pilih ${escapeHtml(field.label.toLowerCase())}</option>${optionMarkup}</select></div>`;
    }
    const type = field.type || 'text';
    const min = field.min !== undefined ? ` min="${field.min}"` : '';
    const step = field.step ? ` step="${field.step}"` : '';
    const placeholder = field.placeholder ? ` placeholder="${escapeHtml(field.placeholder)}"` : '';
    return `<div class="field${wide}"><label for="field-${field.name}">${escapeHtml(field.label)}</label><input id="field-${field.name}" name="${field.name}" type="${type}"${min}${step}${required}${placeholder}${value !== undefined && value !== null ? ` value="${escapeHtml(value)}"` : ''}></div>`;
  }).join('');
  document.getElementById('form-title').textContent = state.editingId === null ? 'Tambah data' : `Ubah data #${state.editingId}`;
  document.getElementById('submit-button').innerHTML = state.editingId === null ? '<span aria-hidden="true">＋</span> Simpan data' : 'Simpan perubahan';
  document.getElementById('cancel-edit').hidden = state.editingId === null;
}

function renderTable(key, definition) {
  const canSelect = Boolean(state.selectedRows[key]);
  const selected = canSelect ? state.selectedRows[key] : new Set();
  document.getElementById('entity-table-head').innerHTML = `<tr>${canSelect ? `<th class="selection-cell"><input type="checkbox" id="select-all-visible" aria-label="Pilih semua ${escapeHtml(definition.title.toLowerCase())}"${state.data[key].length > 0 && selected.size === state.data[key].length ? ' checked' : ''}></th>` : ''}${definition.columns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join('')}<th>Aksi</th></tr>`;
  const rows = state.data[key];
  const body = document.getElementById('entity-table-body');
  if (!rows.length) {
    body.innerHTML = `<tr><td class="empty-row" colspan="${definition.columns.length + (canSelect ? 2 : 1)}">Belum ada data untuk ditampilkan.</td></tr>`;
    updateBulkSelectionUi(key);
    return;
  }
  body.innerHTML = rows.map((record) => {
    const cells = definition.columns.map((column) => {
      const content = formatCell(column, record);
      return `<td${column.primary ? ' class="table-primary"' : ''}>${content}</td>`;
    }).join('');
    const selectionCell = canSelect ? `<td class="selection-cell"><input type="checkbox" data-row-select="${record.id}" aria-label="Pilih ${escapeHtml(definition.title.toLowerCase())} ${escapeHtml(record.full_name || record.name || '')}"${selected.has(record.id) ? ' checked' : ''}></td>` : '';
    return `<tr>${selectionCell}${cells}<td><div class="action-cell"><button class="action-button" data-action="edit" data-id="${record.id}">Ubah</button><button class="action-button delete" data-action="delete" data-id="${record.id}">Hapus</button></div></td></tr>`;
  }).join('');
  const selectAll = document.getElementById('select-all-visible');
  if (selectAll) selectAll.indeterminate = selected.size > 0 && selected.size < rows.length;
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
  const rows = state.data[state.activeView];
  const selectAll = document.getElementById('select-all-visible');
  if (selectAll) {
    selectAll.checked = rows.length > 0 && selected.size === rows.length;
    selectAll.indeterminate = selected.size > 0 && selected.size < rows.length;
  }
  updateBulkSelectionUi(state.activeView);
}

function handleSelectAll(event) {
  const checkbox = event.target.closest('#select-all-visible');
  const selected = state.selectedRows[state.activeView];
  if (!checkbox || !selected) return;
  if (checkbox.checked) state.data[state.activeView].forEach((record) => selected.add(record.id));
  else selected.clear();
  renderTable(state.activeView, entityDefinitions[state.activeView]);
}

async function deleteSelectedRows() {
  const key = state.activeView;
  const selected = state.selectedRows[key];
  if (!selected || selected.size === 0) return;
  const ids = [...selected];
  const records = state.data[key].filter((record) => selected.has(record.id));
  const labels = records.slice(0, 3).map((record) => record.full_name || record.name);
  const preview = labels.join(', ');
  const remainder = records.length > labels.length ? ` dan ${records.length - labels.length} lainnya` : '';
  if (!window.confirm(`Hapus ${ids.length} data terpilih${preview ? ` (${preview}${remainder})` : ''}? Tindakan ini tidak dapat dibatalkan.`)) return;

  const button = document.getElementById('bulk-delete-button');
  button.disabled = true;
  try {
    const { error } = await supabaseClient.from(entityDefinitions[key].table).delete().in('id', ids);
    if (error) throw error;
    selected.clear();
    if (state.editingId !== null && ids.includes(state.editingId)) resetForm();
    showToast(`${ids.length} data berhasil dihapus.`);
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
    case 'service': return escapeHtml(state.data.services.find((item) => item.id === value)?.name || 'Tidak ditemukan');
    case 'transaction': return `TRX-${escapeHtml(value)}`;
    case 'status': return statusBadge(value);
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
    if (field.type === 'file') return;
    const rawValue = field.type === 'checkbox' ? formData.has(field.name) : formData.get(field.name);
    if (rawValue === null || rawValue === '') {
      if (field.defaultValue !== undefined) payload[field.name] = field.defaultValue;
      return;
    }
    payload[field.name] = field.type === 'number' || field.type === 'relation' ? Number(rawValue) : rawValue;
  });

  const button = document.getElementById('submit-button');
  button.disabled = true;
  let uploadedImagePath = '';
  try {
    if (key === 'transaction_details') {
      const transactionId = Number(payload.transaction_id);
      const serviceId = Number(payload.service_id);
      const transaction = state.data.transactions.find((item) => item.id === transactionId);
      if (!transaction) throw new Error('Pilih transaksi yang tersedia.');
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
      const detail = {
        id: state.editingId ?? Date.now(),
        service_id: serviceId,
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
        uploadedImagePath = `products/${uniqueName}`;
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
    if (uploadedImagePath) await supabaseClient.storage.from('shoply-products').remove([uploadedImagePath]);
    showToast(`Gagal menyimpan data: ${error.message || 'periksa koneksi dan isian.'}`, true);
  } finally {
    button.disabled = false;
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

  const label = key === 'transactions' ? `TRX-${id}` : `#${id}`;
  if (!window.confirm(`Hapus data ${label}? Tindakan ini tidak dapat dibatalkan.`)) return;
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
    showToast('Data berhasil dihapus.');
    await Promise.all([refreshData(), refreshFinanceData()]);
  } catch (error) {
    showToast(`Gagal menghapus data: ${error.message || 'data mungkin masih digunakan.'}`, true);
  }
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