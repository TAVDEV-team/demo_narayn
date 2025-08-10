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
  const res = await fetch(`${BASE}/funds/transactions`, {
    method: 'GET',
    signal,
    headers,
  });
  const data = await handleResponse(res);
  return Array.isArray(data) ? data : data.results || [];
}

async function postAddFunds({ amount, description }, signal) {
  const headers = {
    'Content-Type': 'application/json',
    ...(await getAuthHeaders()),
  };
  const res = await fetch(`${BASE}/funds/transactions`, {
    method: 'POST',
    signal,
    headers,
    body: JSON.stringify({ amount, description }),
  });
  return await handleResponse(res);
}

// --- UI Components ---
function ErrorBanner({ message, onRetry }) {
  if (!message) return null;
  return (
    <div className="text-red-600 mb-2 flex items-center gap-2">
      <div className="flex-1">{message}</div>
      {onRetry && (
        <button onClick={onRetry} className="underline text-sm">
          Retry
        </button>
      )}
    </div>
  );
}

function WalletOverview({ balance, onAddClick, loading }) {
  return (
    <div className="flex items-center justify-between p-4 pt-16 bg-white shadow rounded mb-4">
      <div className="flex items-center gap-4">
        {/* <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
          You
        </div> */}
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

  // Define conditional classes
  const amountColorClass = tx.type === 'EXPENSE' ? 'text-red-600' : 'text-green-600';

  return (
    <div className="flex items-center justify-between py-2 border-b gap-10">
      <div className="w-1/5 text-sm">{date || '-'}</div>
      {/* <div className="w-1/6 text-sm capitalize">{tx.type || 'INCOME'}</div> */}
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
  const [description, setDescription] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash'); // default method
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
    // if (!['INCOME', 'EXPENSE'].includes(type)) return 'Type must be INCOME or EXPENSE';
    if (!paymentMethod) return 'Select a payment method';
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setValidationError(err);
    if (err) return;
    const amount = parseAmount();
    // normalize type to backend-friendly: you could send 'credit'/'debit' or keep INCOME/EXPENSE depending on API
    onSubmit({
      amount,
      description,
      type: type === 'EXPENSE' ? 'debit' : 'credit',
      payment_method: paymentMethod,
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
          {/* Type selector */}
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

          {/* Amount */}
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

          {/* Reason / Description */}
          <div>
            <label className="block text-sm font-medium">Reason (optional)</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., donation, fee, refund"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Payment method */}
          <div>
            <label className="block text-sm font-medium">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="Cash">Cash</option>
              <option value="Bkash">Bkash</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Rocket">Rocket</option>
              {/* add more as needed */}
            </select>
          </div>

          {/* Validation / API error */}
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
  const [balance, setBalance] = useState(0); // confirmed balance from backend
  const [history, setHistory] = useState([]);
  const [loadingBalance, setLoadingBalance] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [errorBalance, setErrorBalance] = useState(null);
  const [errorHistory, setErrorHistory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pendingTxs, setPendingTxs] = useState([]);
  const [addingError, setAddingError] = useState(null);
  const [adding, setAdding] = useState(false);

  // fetchers
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

  // derived display balance: confirmed + pending credits - pending debits
  const displayBalance = useMemo(() => {
    let delta = 0;
    pendingTxs.forEach((t) => {
      if (t.type === 'EXPENSE') delta -= t.amount ?? 0;
      else delta += t.amount ?? 0;
    });
    return balance + delta;
  }, [balance, pendingTxs]);

  // merge pending + history deduped (if same id, history wins)
  const mergedTransactions = useMemo(() => {
    const map = new Map();
    pendingTxs.forEach((t) => {
      map.set(t.id, t);
    });
    history.forEach((t) => {
      map.set(t.id, t); // overwrites optimistic if same id
    });
    // sort: pending first (still in map but they have unique opt- ids), then rest by created_at desc
    const all = Array.from(map.values());
    all.sort((a, b) => {
      // pending (status pending) first
      if (a.status === 'pending' && b.status !== 'pending') return -1;
      if (b.status === 'pending' && a.status !== 'pending') return 1;
      const da = new Date(a.created_at || a.timestamp).getTime() || 0;
      const db = new Date(b.created_at || b.timestamp).getTime() || 0;
      return db - da; // newest first
    });
    return all;
  }, [pendingTxs, history]);

  const handleAddClick = () => {
    setAddingError(null);
    setShowModal(true);
  };

  const addFunds = async ({ amount, description }) => {
    setAdding(true);
    setAddingError(null);
    // create optimistic
    const optimistic = {
      id: `opt-${Date.now()}`,
      amount,
      // type: 'INCOME',
      description: 'Adding funds...',
      created_at: new Date().toISOString(),
      balance_after: displayBalance, // best guess
      // status: 'pending',
    };
    setPendingTxs((p) => [optimistic, ...p]);
    try {
      const controller = new AbortController();
      const realTx = await postAddFunds({ amount, description }, controller.signal);
      // reconcile: remove the optimistic entry (by filtering its opt- id), then prepend realTx if not already present
      setPendingTxs((p) => p.filter((t) => t.id !== optimistic.id));
      setHistory((prev) => {
        if (prev.some((t) => t.id === realTx.id)) return prev;
        return [realTx, ...prev];
      });
      // refresh confirmed balance if backend returns new or we want authoritative
      await loadBalance();
      setShowModal(false);
    } catch (e) {
      // rollback optimistic
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
          {/* <div className="w-1/6">Type</div> */}
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
