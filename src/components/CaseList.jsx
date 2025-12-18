import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteCase, setStatus } from '../redux/caseSlice';

export default function CaseList() {
  const cases = useSelector((s) => s.cases.list);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = cases.filter(c => {
    const matchesStatus = filter === 'All' || c.status === filter;
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || c.caseNumber.toLowerCase().includes(q) || (c.assignedLawyer || '').toLowerCase().includes(q) || (c.caseType || '').toLowerCase().includes(q);
    return matchesStatus && matchesQuery;
  }).sort((a,b) => new Date(a.courtDate || 0) - new Date(b.courtDate || 0));

  return (
    <div>
      <div className="controls">
        <div>
          <label>Filter:
            <select value={filter} onChange={(e)=>setFilter(e.target.value)}>
              <option>All</option>
              <option>Open</option>
              <option>Ongoing</option>
              <option>Closed</option>
            </select>
          </label>
          <input placeholder="Search by case number, type or lawyer" value={query} onChange={(e)=>setQuery(e.target.value)} />
        </div>
      </div>

      <table className="case-table">
        <thead>
          <tr>
            <th>Case #</th>
            <th>Type</th>
            <th>Lawyer</th>
            <th>Status</th>
            <th>Court Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(c => (
            <tr key={c.id}>
              <td><Link to={`/case/${c.id}`}>{c.caseNumber}</Link></td>
              <td>{c.caseType}</td>
              <td>{c.assignedLawyer}</td>
              <td>{c.status}</td>
              <td>{c.courtDate ? new Date(c.courtDate).toLocaleDateString() : '-'}</td>
              <td className="actions">
                <button onClick={() => navigate(`/edit/${c.id}`)}>Edit</button>
                <button onClick={() => {
                  if (window.confirm('Delete this case?')) dispatch(deleteCase(c.id));
                }}>Delete</button>
                {c.status !== 'Closed' && <button onClick={() => dispatch(setStatus({ id: c.id, status: 'Closed' }))}>Mark Closed</button>}
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr><td colSpan="6" style={{textAlign:'center'}}>No cases found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
