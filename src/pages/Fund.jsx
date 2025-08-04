// src/pages/Fund.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { getAuthHeaders } from '../services/api';

// --- Helpers / API ---
const BASE = 'https://narayanpur-high-school.onrender.com/api';

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
  const res = await fetch(`${BASE}/api_funds_balance_list/`, {
    method: 'GET',
    signal,
    headers,
  });
  const data = await handleResponse(res);
  // adapt depending on response shape: if array -> take first
  if (Array.isArray(data)) return data[0]?.balance ?? 0;
  return data.balance ?? 0;
}

async function fetchHistory(signal) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE}/api_funds_transactions_list`, {
    method: 'GET',
    signal,
    headers,
  });
  const data = await handleResponse(res);
  // assume array of transactions
  return Array.isArray(data) ? data : data.results || [];
}

async function postAddFunds({ amount, description }, signal) {
  const headers = {
    'Content-Type': 'application/json',
    ...(await getAuthHeaders()),
  };
  const res = await fetch(`${BASE}/api_funds_transactions_list`, {
    method: 'POST',
    signal,
    headers,
    body: JSON.stringify({ amount, description }),
  });
  return await handleResponse(res); // assume created transaction returned
}

// --- Components ---

function TransactionRow({ tx }) {
  const date = new Date(tx.created_at || tx.created_at || tx.timestamp || '').toLocaleString();
  const isPending = tx.status === 'pending';

  return (
    <div className="flex items-center justify-between py-2 border-b">
      <div className="w-1/5 text-sm">{date || '-'}</div>
      <div className="w-1/6 text-sm capitalize">{tx.type || 'credit'}</div>
      <div className="w-1/6 font-medium">
        {tx.type === 'debit' ? '-' : '+'}${(tx.amount ?? 0).toFixed(2)}
      </div>
      <div className="w-2/5 text-sm truncate">{tx.description || '-'}</div>
      <div className="w-1/6 text-sm">${(tx.balance_after ?? tx.balance_after)?.toFixed(2) || '-'}</div>
      <div className="w-1/12">
        {isPending && (
          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
            Pending
          </span>
        )}
      </div>
    </div>
  );
}

function AddFundsModal({ onClose, onAdded, currentBalance }) {
  const [amountInput, setAmountInput] = useState('');
  const [description, setDescription] = useState('');
  const [validationError, setValidationError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);

  const parseAmount = () => {
    const v = parseFloat(amountInput);
    if (isNaN(v)) return null;
    return v;
  };

  const validate = () => {
    const amt = parseAmount();
    if (amt === null) return 'Amount must be a number';
    if (amt <= 0) return 'Amount must be greater than zero';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    setValidationError(err);
    if (err) return;
    const amt = parseAmount();
    setSubmitting(true);
    setApiError(null);
    try {
      const controller = new AbortController();
      const created = await postAddFunds({ amount: amt, description }, controller.signal);
      onAdded(created, amt);
    } catch (e) {
      setApiError(e.message || 'Failed to add funds');
    } finally {
      setSubmitting(false);
    }
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
          Current balance: <strong>${currentBalance.toFixed(2)}</strong>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Amount</label>
            <input
              type="text"
              value={amountInput}
              onChange={(e) => {
                setAmountInput(e.target.value);
                setValidationError(null);
              }}
              placeholder="e.g., 100.00"
              className="w-full border rounded px-3 py-2"
              aria-invalid={!!validationError}
            />
            {validationError && (
              <div className="text-red-500 text-xs mt-1">{validationError}</div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Description (optional)</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., donation"
              className="w-full border rounded px-3 py-2"
            />
          </div>
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
              {submitting ? 'Adding...' : 'Add Funds'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function WalletOverview({ balance, onAddClick }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow rounded mb-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
          You
        </div>
        <div>
          <div className="text-sm text-gray-500">Current Balance</div>
          <div className="text-2xl font-semibold">${balance.toFixed(2)}</div>
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

  const loadBalance = useCallback(async () => {
    setLoadingBalance(true);
    setErrorBalance(null);
    const controller = new AbortController();
    try {
      const b = await fetchBalance(controller.signal);
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
    const controller = new AbortController();
    try {
      const h = await fetchHistory(controller.signal);
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

  const handleAddClick = () => setShowModal(true);

  const handleAdded = (createdTx, addedAmount) => {
    // optimistic already assumed; now reconcile
    // if backend returns new balance, refetch or infer
    loadBalance();
    // merge transaction (avoid dup)
    setHistory((prev) => {
      if (prev.some((t) => t.id === createdTx.id)) return prev;
      return [createdTx, ...prev];
    });
    setShowModal(false);
    setPendingTxs((p) => p.filter((t) => t.id !== createdTx.id));
  };

  const handleOptimistic = (amount) => {
    const optimistic = {
      id: `opt-${Date.now()}`,
      amount,
      type: 'credit',
      description: 'Adding funds...',
      created_at: new Date().toISOString(),
      balance_after: balance + amount,
      status: 'pending',
    };
    setPendingTxs((p) => [optimistic, ...p]);
    setBalance((b) => b + amount);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <WalletOverview
        balance={loadingBalance ? 0 : balance}
        onAddClick={handleAddClick}
      />
      {errorBalance && (
        <div className="text-red-600 mb-2">
          Failed to load balance: {errorBalance}{' '}
          <button className="underline" onClick={loadBalance}>
            Retry
          </button>
        </div>
      )}
      {showModal && (
        <AddFundsModal
          onClose={() => setShowModal(false)}
          onAdded={(tx, amt) => {
            handleOptimistic(amt); // show optimistic immediately
            handleAdded(tx, amt);
          }}
          currentBalance={balance}
        />
      )}

      <div className="bg-white shadow rounded p-4 mt-6">
        <h3 className="text-lg font-semibold mb-3">Transaction History</h3>
        <div className="flex font-medium border-b pb-2 text-xs uppercase">
          <div className="w-1/5">Date</div>
          <div className="w-1/6">Type</div>
          <div className="w-1/6">Amount</div>
          <div className="w-2/5">Description</div>
          <div className="w-1/6">Balance After</div>
          <div className="w-1/12">Status</div>
        </div>

        {pendingTxs.map((tx) => (
          <TransactionRow key={tx.id} tx={tx} />
        ))}
        {loadingHistory && (
          <div className="py-3 text-center text-sm text-gray-500">Loading history...</div>
        )}
        {errorHistory && (
          <div className="py-2 text-red-600 text-sm">
            {errorHistory}{' '}
            <button onClick={loadHistory} className="underline">
              Retry
            </button>
          </div>
        )}
        {!loadingHistory &&
          [...pendingTxs.map((t) => t.id), ...history.map((t) => t.id)]
            .filter((v, i, a) => a.indexOf(v) === i) // dedupe
            .map((id) => {
              const tx =
                pendingTxs.find((t) => t.id === id) ||
                history.find((t) => t.id === id);
              if (!tx) return null;
              return <TransactionRow key={id} tx={tx} />;
            })}
        {!loadingHistory && history.length === 0 && pendingTxs.length === 0 && (
          <div className="py-4 text-center text-gray-500">No transactions yet.</div>
        )}
      </div>
    </div>
  );
}
