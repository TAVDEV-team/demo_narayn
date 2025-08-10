// src/pages/Fund.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { getAuthHeaders } from '../services/api';

// --- Constants & Utils ---
const BASE = 'https://narayanpur-high-school.onrender.com/api';
const CURRENCY_SYMBOL = '৳';
function formatCurrency(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) return '-';
  return `${CURRENCY_SYMBOL}${amount.toFixed(2)}`;
}
function safeDateString(raw) {
  try {
    const d = new Date(raw);
    if (isNaN(d)) return '-';
    return d.toLocaleDateString();
  } catch {
    return '-';
  }
}

// --- API helpers ---
async function handleResponse(res) {
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { message: text };
  }
  if (!res.ok) {
    const message = data?.detail || data?.message || `HTTP ${res.status}`;
    const error = new Error(message);
    error.code = res.status;
    throw error;
  }
  return data;
}

async function fetchBalance(signal) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE}/funds/balance/`, {
    method: 'GET',
    signal,
    headers,
  });
  const data = await handleResponse(res);
  if (Array.isArray(data)) return data[0]?.balance ?? 0;
  return data.balance ?? 0;
}

async function fetchHistory(signal) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE}/funds/transactions/`, {
    method: 'GET',
    signal,
    headers,
  });
  const data = await handleResponse(res);
  return Array.isArray(data) ? data : data.results || [];
}

async function postAddFunds({ amount, reason, type, payment_method, date }, signal) {
  const headers = {
    'Content-Type': 'application/json',
    ...(await getAuthHeaders()),
  };

  // build your payload exactly as backend expects
  const body = JSON.stringify({
    type,           // "INCOME" or "EXPENSE"
    amount,
    reason,
    payment_method,
    date,           // format YYYY-MM-DD (you can default to today if you want)
  });

  const res = await fetch(`${BASE}/funds/transactions/`, {
    method: 'POST',
    signal,
    headers,
    body,
  });

  return await handleResponse(res);
}


function WalletOverview({ balance, onAddClick, loading }) {
  return (
    <div className="flex items-center justify-between p-4 pt-16 bg-white shadow rounded mb-4">
      <div className="flex items-center gap-4">
        <div>
          <div className="text-sm text-gray-500">Current Balance</div>
          <div className="text-2xl font-semibold">
            {loading ? '...' : formatCurrency(balance)}
          </div>
        </div>
      </div>
      <button
        onClick={onAddClick}
        className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
      >
        Add Funds
      </button>
    </div>
  );
}

function TransactionRow({ tx }) {
  const date = safeDateString(tx.date);
  const amount = tx.amount ?? 0;
  const balance_after = tx.after_transaction_balance;

  const amountColorClass = tx.type === 'EXPENSE' ? 'text-red-600' : 'text-green-600';

  return (
    <div className="flex items-center justify-between py-2 border-b gap-10">
      <div className="w-1/5 text-sm">{date || '-'}</div>
      <div className={`w-1/6 font-medium ${amountColorClass}`}>
        {tx.type === 'EXPENSE' ? '-' : '+'}
        {formatCurrency(amount)}
      </div>
      <div className="w-2/5 text-sm truncate">{tx.reason || '-'}</div>
      <div className="w-1/6 text-sm">
        {balance_after != null ? formatCurrency(balance_after) : '-'}
      </div>
    </div>
  );
}

function AddFundsModal({ onClose, onSubmit, currentBalance, submitting, apiError }) {
  const [type, setType] = useState('INCOME'); // INCOME or EXPENSE
  const [amountInput, setAmountInput] = useState('');
  const [reason, setDescription] = useState('');
  const [payment_method, setPaymentMethod] = useState('Cash'); // camelCase consistent
  const [validationError, setValidationError] = useState(null);

  const parseAmount = () => {
    const v = parseFloat(amountInput);
    if (isNaN(v)) return null;
    return v;
  };

  const validate = () => {
    const amt = parseAmount();
    if (amt === null) return 'Amount must be a number';
    if (amt <= 0) return 'Amount must be greater than zero';

    if (!payment_method) return 'Select a payment method';

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setValidationError(err);
    if (err) return;
    const amount = parseAmount();

    onSubmit({
  amount,
  reason,
  type,             // INCOME or EXPENSE
  payment_method,    // from select dropdown
});
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-2">Add Funds</h2>
        <div className="text-sm text-gray-600 mb-4">
          Current balance: <strong>{formatCurrency(currentBalance)}</strong>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="INCOME">INCOME</option>
              <option value="EXPENSE">EXPENSE</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Amount</label>
            <input
              type="text"
              value={amountInput}
              onChange={(e) => {
                setAmountInput(e.target.value);
                setValidationError(null);
              }}
              placeholder="e.g., 100.00 (৳)"
              className="w-full border rounded px-3 py-2"
              aria-invalid={!!validationError}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Reason (optional)</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., donation, fee, refund"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Payment Method</label>
            <select
              value={payment_method}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="Cash">Cash</option>
              <option value="Bkash">Bkash</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Rocket">Rocket</option>
            </select>
          </div>
          {validationError && (
            <div className="text-red-500 text-xs">{validationError}</div>
          )}
          {apiError && <div className="text-red-600 text-sm">{apiError}</div>}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!!validate() || submitting}
              className="px-5 py-2 bg-blue-600 text-white rounded disabled:opacity-50 flex items-center"
            >
              {submitting ? 'Saving...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- Main Page ---
export default function Fund() {
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState([]);
  const [loadingBalance, setLoadingBalance] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [errorBalance, setErrorBalance] = useState(null);
  const [errorHistory, setErrorHistory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pendingTxs, setPendingTxs] = useState([]);
  const [addingError, setAddingError] = useState(null);
  const [adding, setAdding] = useState(false);

  const loadBalance = useCallback(async () => {
    setLoadingBalance(true);
    setErrorBalance(null);
    const ctrl = new AbortController();
    try {
      const b = await fetchBalance(ctrl.signal);
      setBalance(b);
    } catch (e) {
      setErrorBalance(e.message);
    } finally {
      setLoadingBalance(false);
    }
  }, []);

  const loadHistory = useCallback(async () => {
    setLoadingHistory(true);
    setErrorHistory(null);
    const ctrl = new AbortController();
    try {
      const h = await fetchHistory(ctrl.signal);
      setHistory(h);
    } catch (e) {
      setErrorHistory(e.message);
    } finally {
      setLoadingHistory(false);
    }
  }, []);

  useEffect(() => {
    loadBalance();
    loadHistory();
  }, [loadBalance, loadHistory]);

  const displayBalance = useMemo(() => {
    let delta = 0;
    pendingTxs.forEach((t) => {
      if (t.type === 'EXPENSE') delta -= t.amount ?? 0;
      else delta += t.amount ?? 0;
    });
    return balance + delta;
  }, [balance, pendingTxs]);

  const mergedTransactions = useMemo(() => {
    const map = new Map();
    pendingTxs.forEach((t) => {
      map.set(t.id, t);
    });
    history.forEach((t) => {
      map.set(t.id, t);
    });
    const all = Array.from(map.values());
    all.sort((a, b) => {
      if (a.status === 'pending' && b.status !== 'pending') return -1;
      if (b.status === 'pending' && a.status !== 'pending') return 1;
      const da = new Date(a.created_at || a.timestamp).getTime() || 0;
      const db = new Date(b.created_at || b.timestamp).getTime() || 0;
      return db - da;
    });
    return all;
  }, [pendingTxs, history]);

  const handleAddClick = () => {
    setAddingError(null);
    setShowModal(true);
  };

  const addFunds = async ({ amount, reason, type, payment_method }) => {
  setAdding(true);
  setAddingError(null);

  // optimistic tx with same fields
  const optimistic = {
    id: `opt-${Date.now()}`,
    amount,
    description: reason || 'Adding funds...',
    created_at: new Date().toISOString(),
    balance_after: displayBalance,
    type,            // you want to keep the type in optimistic tx
    payment_method,
  };

  setPendingTxs((p) => [optimistic, ...p]);

  try {
    const controller = new AbortController();
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const realTx = await postAddFunds({ amount, reason, type, payment_method, date: today }, controller.signal);
    
    setPendingTxs((p) => p.filter((t) => t.id !== optimistic.id));
    setHistory((prev) => {
      if (prev.some((t) => t.id === realTx.id)) return prev;
      return [realTx, ...prev];
    });

    await loadBalance();
    setShowModal(false);
  } catch (e) {
    setPendingTxs((p) => p.filter((t) => t.id !== optimistic.id));
    setAddingError(e.message || 'Failed to add funds');
  } finally {
    setAdding(false);
  }
};


  return (
    <div className="max-w-4xl mx-auto p-4">
      <WalletOverview
        balance={displayBalance}
        loading={loadingBalance}
        onAddClick={handleAddClick}
      />
      {errorBalance && <ErrorBanner message={`Failed to load balance: ${errorBalance}`} onRetry={loadBalance} />}
      {showModal && (
        <AddFundsModal
          onClose={() => setShowModal(false)}
          currentBalance={displayBalance}
          onSubmit={addFunds}
          submitting={adding}
          apiError={addingError}
        />
      )}
      <div className="bg-white shadow rounded p-4 mt-6">
        <h3 className="text-lg font-semibold mb-3">Transaction History</h3>
        <div className="flex font-medium border-b pb-2 text-xs uppercase">
          <div className="w-1/5">Date</div>
          <div className="w-1/6">Amount</div>
          <div className="w-2/5">Description</div>
          <div className="w-1/6">Balance After</div>
        </div>

        {loadingHistory && (
          <div className="py-3 text-center text-sm text-gray-500">Loading history...</div>
        )}
        {errorHistory && <ErrorBanner message={errorHistory} onRetry={loadHistory} />}
        {!loadingHistory && mergedTransactions.length === 0 && (
          <div className="py-4 text-center text-gray-500">No transactions yet.</div>
        )}
        {!loadingHistory &&
          mergedTransactions.map((tx) => <TransactionRow key={tx.id} tx={tx} />)}
      </div>
    </div>
  );
}
